import { CreatePostInput, Post } from "../types/post";
import api from "./api";
import { getCache, setCache } from "./cache";

const postsCacheKey = (params: { userId?: number; limit?: number }) =>
  `posts:${params.userId ?? "all"}:${params.limit ?? "none"}`;
const postCacheKey = (postId: number) => `post:${postId}`;

export async function fetchPosts(
  params: { userId?: number; limit?: number } = {},
): Promise<Post[]> {
  const key = postsCacheKey(params);
  const query: Record<string, string | number> = {};
  if (typeof params.userId === "number") query.userId = params.userId;

  try {
    const response = await api.get<Post[]>("/posts", { params: query });
    const posts = response.data;
    const result =
      typeof params.limit === "number" ? posts.slice(0, params.limit) : posts;
    await setCache(key, result);
    return result;
  } catch (error) {
    const cached = await getCache<Post[]>(key);
    if (cached) return cached;
    throw error;
  }
}

export async function fetchPostById(postId: number): Promise<Post> {
  const key = postCacheKey(postId);
  try {
    const response = await api.get<Post>(`/posts/${postId}`);
    const data = response.data;
    await setCache(key, data);
    return data;
  } catch (error) {
    const cached = await getCache<Post>(key);
    if (cached) return cached;
    throw error;
  }
}

export async function createPost(
  input: CreatePostInput & { userId?: number },
): Promise<Post> {
  const payload = {
    userId: input.userId ?? 1,
    title: input.title,
    body: input.body,
  };

  const response = await api.post<Post>("/posts", payload);
  return response.data;
}
