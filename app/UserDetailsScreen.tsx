import React from "react";

import UserDetailsScreen from "../src/screens/UserDetailsScreen";

export default function UserDetailsScreenRoute({
  userId,
}: {
  userId?: number;
}) {
  return <UserDetailsScreen userId={userId} />;
}
