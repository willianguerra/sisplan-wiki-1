import { Icon, HStack, Flex, useBreakpointValue } from "@chakra-ui/react";

import { useTheme } from "next-themes";
import { Moon, Sun } from "phosphor-react";

export function NotificationNav() {
  const { theme, setTheme } = useTheme();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  function handle(prop) {
    setTheme(prop)
  }
  return (
    <HStack
      spacing={isDrawerSidebar ? ["2", "4"] :["6", "8"]}
      mx={isDrawerSidebar ? ["2", "4"] :["6", "8"]}
      pr={isDrawerSidebar ? ["2", "4"] :["6", "8"]}
      py="1"
      color="var(--font-color)"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      {theme == "dark" ? (
        <Flex alignItems={"center"} onClick={() => handle('ligth')} cursor="pointer">
          <Icon as={Moon} fontSize="20" />
        </Flex>
      ) : (
        <Flex onClick={() => handle('dark')} cursor="pointer">
          <Icon as={Sun} fontSize="20" />
        </Flex>
      )}
    </HStack>
  );
}
