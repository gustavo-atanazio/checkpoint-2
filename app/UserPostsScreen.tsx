import React from "react";

import UserPostsScreen from "../src/screens/UserPostsScreen";

export default function UserPostsScreenRoute({
  userId,
}: {
  userId?: number;
}) {
  return <UserPostsScreen userId={userId} />;
}
