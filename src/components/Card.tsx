import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Flex, Text } from "@chakra-ui/react";

interface CardProps {
  title: string;
  valor: number | any;
  icon: ReactJSXElement;
}

export function Card({ title, valor, icon }: CardProps) {
  return (
    <Flex
      alignItems={"center"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={"2"}
      backgroundColor={"var(--card-color)"}
      p={5}
      borderRadius={"2px"}
      w={"100%"}
      color="var(--font-color)"
    >
      <Box fontSize={"70px"} w={"70px"} h={"70px"} mt={"-1.2rem"}>
        {icon}
      </Box>
      <Flex pl={"1rem"} fontSize={"1.4rem"} flexDirection={"column"}>
        <Text fontSize={"1.4rem"}>{title}</Text>
        <Text>{valor ?? 0}</Text>
      </Flex>
    </Flex>
  );
}
