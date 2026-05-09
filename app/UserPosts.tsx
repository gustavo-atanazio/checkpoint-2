import { useLocalSearchParams } from "expo-router";
import React from "react";

import UserPostsScreen from "./UserPostsScreen";

export default function UserPostsRoute() {
  const params = useLocalSearchParams();
  const userIdRaw = params.userId;
  const userId = typeof userIdRaw === "string" ? Number(userIdRaw) : undefined;

  return <UserPostsScreen userId={userId} />;
}
