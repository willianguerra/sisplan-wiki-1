import { List, ListItem, Text } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Link from "next/link";
import styles from "./Header/style.module.scss";

interface SubHeaderProps {
  name: string;
  Icon?: ReactJSXElement;
  link: string;
}

export function SubHeader({ name, Icon, link }: SubHeaderProps) {
  return (
    <Link href={`/${link}`}>
      <List>
        <ListItem>
          <a href="">
            <i>{Icon} </i>
            <Text className={styles.links_name}>{name}</Text>
          </a>
        </ListItem>
      </List>
    </Link>
  );
}
