import { useLocalSearchParams } from "expo-router";
import React from "react";

import UserDetailsScreen from "../UserDetailsScreen";

export default function UserDetailsRoute() {
  const params = useLocalSearchParams();
  const userIdRaw = params.userId;
  const userId = typeof userIdRaw === "string" ? Number(userIdRaw) : undefined;

  return <UserDetailsScreen userId={userId} />;
}
