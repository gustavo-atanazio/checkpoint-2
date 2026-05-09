import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ErrorMessage({
  title,
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fee2e2",
    marginVertical: 8,
  },
  title: {
    fontWeight: "700",
    marginBottom: 6,
    color: "#991b1b",
    fontSize: 16,
  },
  message: {
    color: "#991b1b",
    fontSize: 14,
    lineHeight: 20,
  },
});
