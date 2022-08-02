/* eslint-disable react/no-children-prop */
import { useState } from "react";

import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";

import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostComponent";

interface SearchProps {
  onCloseModal: () => void;
}

export function Search({ onCloseModal }: SearchProps) {
  const [results, setResults] = useState([]);
  const { posts } = usePosts();

  function handleTextChange(value) {
    if (value.length > 0) {
      const consult = posts.post.filter((teste) => {
        const valor = JSON.stringify(teste).toUpperCase();
        return valor.indexOf(value.toUpperCase()) > 0;
      });
      setResults(consult);
    }
  }
  return (
    <Flex alignItems={"center"} flexDirection={"column"}>
      <Flex alignItems={"center"} flexDirection={"row"} w={"100%"}>
        <InputGroup
          p={"0.8rem"}
          bg={"var(--background-Color)"}
          borderRadius={"0.4rem"}
        >
          <InputLeftElement
            pl={4}
            pointerEvents="none"
            display={"flex"}
            alignItems={"center"}
            h="100%"
            children={<MagnifyingGlass size={24} color="var(--font-color)" />}
          />
          <Input
            fontSize={"semi-bold"}
            focusBorderColor={"none"}
            border={"none"}
            color="var(--font-color)"
            size={"lg"}
            type="text"
            placeholder="Pesquisa"
            onChange={async (event) => {
              await handleTextChange(event.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      {results.length > 0 ? (
        <Box
          color={"var(--font-Color)"}
          w={"100%"}
          bg={"var(--background-Color)"}
          borderBottomRadius="0.4rem"
        >
          <Box mx={"1rem"} borderTop={"1px solid var(--border-color)"} py={2}>
            {results.length > 0
              ? results.map((result) => {
                return (
                  <PostCard
                    title={result.title}
                    // icon={result.icon}
                    description={result.description}
                    hour={result.hour}
                    key={result.key}
                    id={result.slug}
                    type={result.type}
                    onCloseModal={onCloseModal}
                  />
                );
              })
              : ""}
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Flex>
  );
}
