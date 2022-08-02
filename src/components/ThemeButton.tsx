import { Flex, Icon } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "phosphor-react";

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  return (
    <Flex alignItems="center" justifyContent="center" h="70px">
      {theme == "dark" ? (
        <Flex
          key={1}
          alignItems="center"
          justifyContent="center"
          onClick={() => setTheme("light")}
          w="40px"
          h="40px"
          borderRadius="100%"
          backgroundColor="var(--black-search)"
          cursor="pointer"
          color="var(--font-color)"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
        >
          <Icon as={Sun} size={25} />
        </Flex>
      ) : (
        <Flex
          key={2}
          alignItems="center"
          justifyContent="center"
          color="var(--font-color)"
          onClick={() => setTheme("dark")}
          w="40px"
          h="40px"
          borderRadius="100%"
          backgroundColor="var(--black-search)"
          cursor="pointer"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
        >
          <Icon as={Moon} size={25} />
        </Flex>
      )}
    </Flex>
  );
}
