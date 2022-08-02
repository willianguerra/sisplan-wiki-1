import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

import { AuthProvider } from "../contexts/AuthContexts";
import { PostsContextProvider } from "../contexts/PostsContexts";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { client } from "../services/apollo";

import "../styles/globals.scss";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <PostsContextProvider>
          <ChakraProvider>
            <ThemeProvider defaultTheme="ligth">
              <SidebarDrawerProvider>
                <Component {...pageProps} />
              </SidebarDrawerProvider>
            </ThemeProvider>
          </ChakraProvider>
        </PostsContextProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
