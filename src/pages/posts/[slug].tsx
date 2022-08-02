import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Head from "next/head";
import { useRouter } from "next/router";


import { Main } from "../../components/Main";
import { useGetPostsByIdQuery } from "../../graphql/generated";
import styles from "./post.module.scss";

export default function Posts() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetPostsByIdQuery({
    variables: { uid: String(slug) },
  });
  if (!data) {
    return (<div></div>);
  }

  return (
    <>
      <Head>
        <title>Posts | Wiki</title>
      </Head>
      <Main>
        <main className={styles.post}>
          <article className={styles.post}>
            <h1>{data.posts.title}</h1>
            <time>{format(new Date(data.posts.createdAt), "Pp", {
              locale: ptBR,
            })}</time>
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: data.posts.content.html }}
            />
          </article>
        </main>
      </Main>
    </>
  );
}