import { useContext } from "react";

import { PostContext } from "../contexts/PostsContexts";

export const usePosts = () => useContext(PostContext);