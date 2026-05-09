import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "../services/userService";
import { User } from "../types/user";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
