import { useMutation } from "@tanstack/react-query";

import { createPost } from "../services/postService";
import { CreatePostInput, Post } from "../types/post";

export function useCreatePost() {
  return useMutation<Post, Error, CreatePostInput>({
    mutationFn: (input) => createPost(input),
  });
}
