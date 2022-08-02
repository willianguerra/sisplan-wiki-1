/* eslint-disable react/no-children-prop */
import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Lock, User } from "phosphor-react";

import { AuthContext } from "../../contexts/AuthContexts";
import { usePosts } from "../../hooks/usePosts";

export default function Login() {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const handleClick = () => setShow(!show);

  async function handleSignIn() {
    try {
      setLoading(true);

      if (!usuario || !senha) {
        toast({
          title: "Erro ao realizar login!",
          description: "Usuário ou senha não informados",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setLoading(false),
        });

        return;
      }

      const logado = await signIn({ usuario, senha });

      if (logado) {
        toast({
          title: "Logado com sucesso!",
          description: "Redirecionando...",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        router.push("/");
      } else {
        toast({
          title: "Erro ao realizar login!",
          description: "Usuário ou senha incorretos",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });

        setLoading(false);
      }
    } catch (error) {
      console.error("Erro Login: ", error);
    }
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleEnter(event) {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (form.elements[index + 1].id != 'show') {
        form.elements[index + 1].focus();
      } else {
        form.elements[index + 2].focus();
      }
      event.preventDefault();
    }
  }


  usePosts();

  return (
    <>
      <Head>
        <title>Login | Wiki</title>
      </Head>

      <Flex
        w="100%"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundImage={"./login.jpg"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"left"}
        backgroundSize={"cover"}
      >
        {isWideVersion ? (
          <Box
            w="100%"
            h="100vh"
            backgroundImage={"./login.jpg"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"left"}
            backgroundSize={"cover"}
          />
        ) : (
          <Box h="100vh" />
        )}
        <Flex
          w={isWideVersion ? "70%" : "90%"}
          h={isWideVersion ? "100%" : "50%"}
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F7FAFC"}
          borderRadius={isWideVersion ? 0 : 4}
        >
          <Flex
            w={isWideVersion ? "70%" : "90%"}
            h="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text fontSize="2xl" mb="20px" textAlign="center">
              Acessar Sisplan Wiki
            </Text>
            <FormControl as="form">
              <InputGroup size="lg" mb={1} onKeyDown={handleEnter} autoFocus>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.400" as={User} />}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                  fontSize={25}
                />
                <Input
                  onChange={(event) => {
                    event.target.value = event.target.value.toUpperCase();
                    setUsuario(event.target.value);
                  }}
                  type="text"
                  focusBorderColor="red.400"
                  errorBorderColor="red.400"
                  size="lg"
                  placeholder="Usuário"
                />
              </InputGroup>

              <InputGroup size="lg" mt={0.8} onKeyDown={handleEnter}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.400" as={Lock} />}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                  fontSize={25}
                />
                <Input
                  onChange={(event) => setSenha(event.target.value)}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  focusBorderColor="red.400"
                  errorBorderColor="red.400"
                  placeholder="Senha"
                />
                <InputRightElement width="4.5rem">
                  <Button id="show" h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Flex w="100%" alignItems="center" justifyContent="end" pt={3}>
                <Button
                  colorScheme="red"
                  borderRadius={4}
                  w={100}
                  onClick={handleSignIn}
                  isLoading={loading}
                >
                  Login
                </Button>
              </Flex>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
