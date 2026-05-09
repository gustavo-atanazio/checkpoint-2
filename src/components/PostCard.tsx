import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Post } from "../types/post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.meta}>Post #{post.id}</Text>
    </View>
  );
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
  title: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 10,
  },
  meta: {
    fontSize: 12,
    color: "#777",
  },
});
