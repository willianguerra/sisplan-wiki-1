import {
  Flex,
  HStack,
  Icon,
  IconButton,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { List, SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

interface HeaderProps {
  onOpenModalSearch: () => void;
}

export function Header({ onOpenModalSearch }: HeaderProps) {
  const { onOpen } = useSidebarDrawer();
  const toast = useToast();
  const router = useRouter();
  const { logOut } = useContext(AuthContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handleLogOut() {
    await logOut();

    toast({
      title: "Usuário deslogado!",
      description: "Redirecionando...",
      status: "warning",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
    router.push("/login");
  }

  return (
    <Flex
      position={"fixed"}
      as="header"
      w="100%"
      h="20"
      mx="auto"
      px="6"
      align="center"
      bg={"var(--background-Color)"}
      zIndex={1}
    >
      {!isWideVersion && (
        <IconButton
          color={"var(--font-color)"}
          aria-label="Open navigation"
          icon={<Icon as={List} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Logo />

      <Flex align="center" ml="auto">
        <SearchBox onOpenModalSearch={onOpenModalSearch} />
        <NotificationNav />
        <Profile showProfileData={isWideVersion} />

        <HStack
          spacing={isWideVersion ? ["6", "8"] : ["2", "4"]}
          mx={isWideVersion ? ["6", "8"] : ["2", "4"]}
          pl={isWideVersion ? ["6", "8"] : ["2", "4"]}
          py="1"
          color="var(--font-color)"
          borderLeftWidth={1}
          borderColor="gray.700"
          onClick={handleLogOut}
          cursor={"pointer"}
        >
          <Icon as={SignOut} fontSize="20" />
        </HStack>
      </Flex>
    </Flex>
  );
}
