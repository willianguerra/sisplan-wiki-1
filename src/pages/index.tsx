import React from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { ClipLoader } from "react-spinners";

import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";

import { Main } from "../components/Main";
import { PostCard } from "../components/PostComponent";
import { usePosts } from "../hooks/usePosts";


export default function Home() {
  const { posts } = usePosts();

  if (!posts) {
    return (
      <>
        <Head>
          <title>Home | Wiki</title>
        </Head>
        <Flex w={'100vw'} h={'100vh'} alignItems={'center'} justifyContent='center'>
          <LoadingOverlayWrapper
            active={true}
            spinner={<ClipLoader color="red" />}
          />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Home | Wiki</title>
      </Head>

      {/* <ModalSearch /> */}
      <Main>
        <Box fontWeight={600} fontSize="2rem">
          <p>Atualizações</p>
        </Box>

        <Box w="100%" p="1rem">
          {posts
            ? posts.post.map((post) => {
              return (
                <PostCard
                  title={post.title}
                  description={post.description}
                  hour={post.createdAt}
                  key={post.slug}
                  id={post.slug}
                  type={post.type}
                />
              );
            })
            : ""}
        </Box>
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["logado"]: validado } = parseCookies(ctx);

  if (validado != "TRUE") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
