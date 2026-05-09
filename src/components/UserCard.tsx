import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { User } from "../types/user";

export default function UserCard({
  user,
  onPress,
}: {
  user: User;
  onPress?: () => void;
}) {
  const content = (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
});
