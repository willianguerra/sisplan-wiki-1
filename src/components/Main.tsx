import { ReactNode, useState } from "react";


import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import { Sidebar } from "../components/Sidebar";
import { usePosts } from "../hooks/usePosts";
import { Header } from "./Header/index";
import { ModalSearch } from "./ModalSearch";
interface ContainerProps {
  children: ReactNode;
}

export function Main({ children }: ContainerProps) {
  const [isModalSearch, setIsModalisModalSearch] = useState(false);

  function handleOpenModalSearch() {
    setIsModalisModalSearch(true);
  }

  function handleCloseModalhandleOpenModalSearch() {
    setIsModalisModalSearch(false);
  }

  usePosts();

  return (
    <Flex direction="column" h="100vh">
      <Header onOpenModalSearch={handleOpenModalSearch} />

      <Flex w="100%" my="6" mt={"20"} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box color="var(--font-color)" w="100%">
            <ModalSearch
              isOpen={isModalSearch}
              onRequestClose={handleCloseModalhandleOpenModalSearch}
            />
            {children}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
