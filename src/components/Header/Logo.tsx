import { Text } from "@chakra-ui/react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <Text
        cursor={"pointer"}
        userSelect={"none"}
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        color="var(--font-color)"
        w="64"
      >
        wiki
        <Text as="span" color="red.500" ml="1">
          .
        </Text>
      </Text>
    </Link>
  );
}
