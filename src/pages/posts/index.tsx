import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import { Main } from "../../components/Main";
import { PostCard } from "../../components/PostComponent";
import { Tipos, useGetPostsByTypeQuery } from "../../graphql/generated";

export default function Posts() {
  const router = useRouter();
  const type = router.query.type;

  const { data } = useGetPostsByTypeQuery({
    variables: {
      type: type as Tipos,
    },
  });
  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>Posts | Wiki</title>
      </Head>
      <Main>
        <div>
          {data
            ? data.post.map((post, i) => {
              return (
                <PostCard
                  description={post.description}
                  title={post.title}
                  hour={post.createdAt}
                  key={i}
                  id={post.slug}
                  type={post.type}
                />
              );
            })
            : ""}
        </div>
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
    props: {
    },
  };
};
