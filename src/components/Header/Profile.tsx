import { Flex, Text, Box, Avatar } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    const userCookie = parseCookies(undefined, "usuario").usuario;

    if (userCookie != "") {
      const nome = userCookie.toLowerCase().split(".")[1];
      const sobrenome = userCookie.toLowerCase().split(".")[2];
      setUser(
        `${nome[0].toUpperCase() + nome.substr(1)} ${
          sobrenome[0].toUpperCase() + sobrenome.substr(1)
        } `
      );
    }
  }, []);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" ml="6" textAlign="right">
          <Text color="var(--font-color)">{user}</Text>
          <Text color="var(--font-color)" fontSize="small"></Text>
        </Box>
      )}

      <Avatar size="md" name={user} />
    </Flex>
  );
}
