import React, { useEffect, useState } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { ClipLoader } from "react-spinners";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Input,
  ModalFooter,
  Button,
  ModalHeader,
  ModalCloseButton,
  Text,
  useToast,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { Folder, FolderOpen, Users } from "phosphor-react";

import { ClienteProps } from "../../@types/ClientsProps";
import { Card } from "../../components/Card";
import { ClientsTable } from "../../components/ClientsTable";
import { Main } from "../../components/Main";
import { useClients } from "../../hooks/useClients";
import { listaUsuariosLiberados } from "../../lib/users";
import styles from "./style.module.scss";

export default function Clientes() {
  const clientes = useClients();
  const [clientsFilter, setClientsFilter] = useState(clientes);
  const toast = useToast();
  const [isModalFilter, setIsModalFilter] = useState(false);
  const [codcli, setCodcli] = useState("");
  const [name, setName] = useState("");
  const [pesquisou, setPesquisou] = useState(false);

  useEffect(() => {
    setClientsFilter(clientes);
  }, [clientes]);

  function handleOpenModalSearch() {
    setIsModalFilter(true);
  }

  function handleCloseModalhandleOpenModalSearch() {
    setIsModalFilter(false);
  }

  async function handleFilterTable() {
    try {
      let dados: ClienteProps[];
      setClientsFilter(clientes);
      if (codcli) {
        dados = clientes.filter((client) => {
          const codCli = client.CODCLI ?? "";
          return codCli.includes(codcli);
        });
      } else {
        dados = clientes;
      }

      if (name) {
        dados = dados.filter((client) => {
          const nome = JSON.stringify(client).toUpperCase();
          return nome.indexOf(name.toUpperCase()) > 0;
        });
      } else {
        dados.length == 0 && clientes;
      }

      toast({
        title: "Consultado Com Sucesso.",
        description: "Os dados foram retornados",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      setClientsFilter(dados);
      setPesquisou(true);
      setIsModalFilter(false);
      setName("");
      setCodcli("");
    } catch (error) {
      console.error("Erro Consulta", error);
    }
  }
  if ((!clientes) || (clientes.length == 0)) {
    return (
      <>
        <Head>
          <title>Clientes | Wiki</title>
        </Head>
        <Flex w={'100vw'} h={'100vh'} alignItems={'center'} justifyContent='center'>
          <LoadingOverlayWrapper
            active={true}
            spinner={<ClipLoader color="red" />}
          />
        </Flex>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Clientes | Wiki</title>
      </Head>
      <Main>
        <div className={styles.containerCliente}>
          <div className={styles.cards}>
            <Card
              icon={<Icon as={Users} />}
              title="Empresas Usando"
              valor={pesquisou ? clientsFilter.length : clientes.length}
            />
            <Card
              icon={<Icon as={Folder} />}
              title="Versão Mais Atual"
              valor={
                pesquisou
                  ? clientsFilter.reduce(
                    (max, current) => {
                      const versaoString = current["versao"].substring(0, 5);
                      const versaoNumero = Number(
                        versaoString.replaceAll(".", "")
                      );
                      return (max = {
                        versaoNumero:
                          versaoNumero > max.versaoNumero
                            ? versaoNumero
                            : max.versaoNumero,
                        versaoString:
                          versaoNumero > max.versaoNumero
                            ? versaoString
                            : max.versaoString,
                      });
                    },
                    { versaoNumero: 0, versaoString: "" }
                  ).versaoString
                  : clientes.reduce(
                    (max, current) => {
                      const versaoString = current["versao"].substring(0, 5);
                      const versaoNumero = Number(
                        versaoString.replaceAll(".", "")
                      );
                      return (max = {
                        versaoNumero:
                          versaoNumero > max.versaoNumero
                            ? versaoNumero
                            : max.versaoNumero,
                        versaoString:
                          versaoNumero > max.versaoNumero
                            ? versaoString
                            : max.versaoString,
                      });
                    },
                    { versaoNumero: 0, versaoString: "" }
                  ).versaoString
              }
            />
            <Card
              icon={<Icon as={FolderOpen} />}
              title="Versão Mais Antiga"
              valor={
                pesquisou
                  ? clientsFilter.reduce(
                    (min, current) => {
                      const versaoString = current["versao"].substring(0, 5);
                      const versaoNumero = Number(
                        versaoString.replaceAll(".", "")
                      );
                      if (min.versaoNumero == 0) {
                        min.versaoNumero = versaoNumero;
                        min.versaoString = versaoString;
                      }
                      return (min = {
                        versaoNumero:
                          versaoNumero < min.versaoNumero
                            ? versaoNumero
                            : min.versaoNumero,
                        versaoString:
                          versaoNumero < min.versaoNumero
                            ? versaoString
                            : min.versaoString,
                      });
                    },
                    { versaoNumero: 0, versaoString: "" }
                  ).versaoString
                  : clientes.reduce(
                    (min, current) => {
                      const versaoString = current["versao"].substring(0, 5);
                      const versaoNumero = Number(
                        versaoString.replaceAll(".", "")
                      );
                      if (min.versaoNumero == 0) {
                        min.versaoNumero = versaoNumero;
                        min.versaoString = versaoString;
                      }
                      return (min = {
                        versaoNumero:
                          versaoNumero < min.versaoNumero
                            ? versaoNumero
                            : min.versaoNumero,
                        versaoString:
                          versaoNumero < min.versaoNumero
                            ? versaoString
                            : min.versaoString,
                      });
                    },
                    { versaoNumero: 0, versaoString: "" }
                  ).versaoString
              }
            />
          </div>

          <div className={styles.rowButton}>
            <h1>Clientes</h1>
            <Button
              colorScheme="red"
              borderRadius={4}
              w={100}
              h={45}
              mr={-6}
              onClick={handleOpenModalSearch}
            >
              Filtrar
            </Button>
          </div>
          <ClientsTable clientes={pesquisou ? clientsFilter : clientes} />
        </div>
      </Main>
      <Modal
        isOpen={isModalFilter}
        onClose={handleCloseModalhandleOpenModalSearch}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent
          padding={5}
          color="var(--font-color)"
          bg="var(--background-Color)"
        >
          <ModalHeader>Filtrar Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={0}>
            <>
              <Text mb="8px">Código do Cliente: </Text>
              <Input
                // value={}
                // onChange={}
                bg="var(--gray-800)"
                focusBorderColor="red.700"
                placeholder="Código do Cliente"
                borderRadius={2}
                borderColor={"transparent"}
                size="md"
                onChange={(event) => setCodcli(event.target.value)}
              />
              <Text mb="8px">Nome Cliente: </Text>
              <Input
                // value={}
                // onChange={}
                focusBorderColor="red.700"
                placeholder="Nome Cliente"
                borderRadius={2}
                borderColor={"transparent"}
                bg="var(--gray-800)"
                size="md"
                onChange={(event) => setName(event.target.value)}
              />
            </>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              borderRadius={4}
              w={100}
              mr={-6}
              onClick={handleFilterTable}
            >
              Consultar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = parseCookies(ctx);

  if (cookie.logado != "TRUE") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (!listaUsuariosLiberados.includes(cookie.usuario.toUpperCase())) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
