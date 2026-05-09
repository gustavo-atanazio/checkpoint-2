import { User } from "../types/user";
import api from "./api";
import { getCache, setCache } from "./cache";

const USERS_CACHE_KEY = "users";
const userCacheKey = (userId: number) => `users:${userId}`;

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>("/users");
    const data = response.data;
    await setCache(USERS_CACHE_KEY, data);
    return data;
  } catch (error) {
    const cached = await getCache<User[]>(USERS_CACHE_KEY);
    if (cached) return cached;
    throw error;
  }
}

export async function fetchUserById(userId: number): Promise<User> {
  const key = userCacheKey(userId);
  try {
    const response = await api.get<User>(`/users/${userId}`);
    const data = response.data;
    await setCache(key, data);
    return data;
  } catch (error) {
    const cached = await getCache<User>(key);
    if (cached) return cached;
    throw error;
  }
}
