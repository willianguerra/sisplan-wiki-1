import { Flex, Icon, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ArrowElbowDownLeft, TextAlignLeft } from "phosphor-react";

import { PostSearchProps } from "../@types/PostsProps";

export function PostCard({
  title,
  hour,
  id,
  description,
  onCloseModal,
  type,
}: PostSearchProps) {
  const url = `/posts/${id}?type=${type}`;
  return (
    <Link href={url} key={id}>
      {!onCloseModal ? (
        <Flex
          key={id}
          cursor={"pointer"}
          userSelect={"none"}
          flexDirection={"column"}
          borderBottom={"1px solid #4A5568"}
          pb={"1rem"}
          pt={"1rem"}
        >
          <Text color={"#718096"} py={"0.4rem"}>
            {format(new Date(hour), "Pp", {
              locale: ptBR,
            })}
          </Text>
          <Text fontSize="2rem">{title}</Text>
          <Text fontSize="1rem">{description}</Text>
        </Flex>
      ) : (
        <Flex
          w={"100%"}
          cursor={"pointer"}
          userSelect={"none"}
          gridGap={"1rem"}
          p={"1rem"}
          mb="1rem"
          borderRadius={"10px"}
          _hover={{ filter: "brightness(0.75)", transition: "0.5s ease" }}
          bg={"var(--card-color)"}
          color={"var(--font-color)"}
          alignItems={"center"}
        >
          <Flex>
            <Icon as={TextAlignLeft} fontSize="20" />
          </Flex>
          <Flex>
            <Text>{title}</Text>
          </Flex>
          <Flex ml={"auto"}>
            <Icon as={ArrowElbowDownLeft} fontSize="20" />
          </Flex>
        </Flex>
      )}
    </Link>
  );
}
