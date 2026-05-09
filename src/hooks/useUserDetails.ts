import { useQuery } from "@tanstack/react-query";

import { fetchUserById } from "../services/userService";
import { User } from "../types/user";

export function useUserDetails(userId: number) {
  return useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    enabled: Number.isFinite(userId),
  });
}
