import { createContext, ReactNode } from "react";

import { GetAllPostsQuery, useGetAllPostsQuery } from "../graphql/generated";

interface PostContextData {
  posts: GetAllPostsQuery;
}

type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContext = createContext<PostContextData>(
  {} as PostContextData
);

export function PostsContextProvider(props: PostContextProviderProps) {

  const { data } = useGetAllPostsQuery();
  const posts = data;
  return (
    <PostContext.Provider value={{ posts }}>
      {props.children}
    </PostContext.Provider>
  );
}
