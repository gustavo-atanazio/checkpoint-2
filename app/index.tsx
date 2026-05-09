import React from "react";
import { StyleSheet, Text, View } from "react-native";

import LinkButton from "./LinkButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <LinkButton title="UsersFetch" href="/UsersFetch" />
      <LinkButton title="Users" href="/Users" />
      <LinkButton title="Posts" href="/posts" />
      <LinkButton title="CreatePost" href="/CreatePost" />
      <LinkButton title="ErrorTest" href="/ErrorTest" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});
