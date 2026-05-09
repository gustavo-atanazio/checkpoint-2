import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "../services/postService";
import { Post } from "../types/post";

export function usePosts(params: { userId?: number; limit?: number }) {
  const key: (string | number | undefined)[] = [
    "posts",
    params.userId ?? "all",
    params.limit ?? "none",
  ];

  return useQuery<Post[], Error>({
    queryKey: key,
    queryFn: () => fetchPosts({ userId: params.userId, limit: params.limit }),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
