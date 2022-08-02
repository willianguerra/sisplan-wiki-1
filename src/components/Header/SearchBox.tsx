import {
  Flex,
  Input,
  Icon,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";

interface SearchProps {
  onOpenModalSearch: () => void;
}

export function SearchBox({ onOpenModalSearch }: SearchProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      {!isWideVersion ? (
        <Flex
          onClick={onOpenModalSearch}
          cursor={"pointer"}
          color="var(--font-color)"
          align="center"
          ml="auto"
        >
          <HStack
            spacing={isWideVersion ? ["6", "8"] : ["2", "4"]}
            pr={isWideVersion ? ["6", "8"] : ["2", "4"]}
            py="1"
            color="var(--font-color)"
            borderRightWidth={1}
            borderColor="gray.700"
          >
            <Icon as={MagnifyingGlass} fontSize="20" />
          </HStack>
        </Flex>
      ) : (
        <Flex
          as="label"
          flex="1"
          py="4"
          px="8"
          ml="8"
          maxWidth={500}
          alignSelf="center"
          color="var(--font-color)"
          position="relative"
          bg="var(--gray-800)"
          borderRadius="4px"
          w={"100%"}
          onClick={onOpenModalSearch}
          cursor="pointer"
        >
          <Input
            color="gray.50"
            variant="unstyled"
            px="4"
            mr="4"
            placeholder="Buscar na plataforma"
            _placeholder={{
              color: "gray.400",
            }}
            cursor={"pointer"}
            disabled
          />

          <Icon as={MagnifyingGlass} fontSize="20" />
        </Flex>
      )}
    </>
  );
}
