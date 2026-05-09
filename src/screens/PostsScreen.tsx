import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

import { usePosts } from "../hooks/usePosts";
import { Post } from "../types/post";

export default function PostsScreen() {
  const limit = 20;
  const { data, isLoading, isError, error, refetch, isFetching } = usePosts({
    limit,
  });

  const posts = data ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>

      {isLoading && !isFetching ? (
        <Loading />
      ) : isError ? (
        <View style={styles.section}>
          <ErrorMessage
            title="Falha ao carregar"
            message={
              error instanceof Error ? error.message : "Erro desconhecido"
            }
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => void refetch()}
          >
            <Text style={styles.buttonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      ) : posts.length === 0 ? (
        <EmptyState title="Sem posts" description="Sem dados disponíveis." />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item: Post) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  section: { flex: 1, justifyContent: "center" },
  button: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    alignSelf: "center",
    width: "80%",
  },
  buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  listContent: { paddingBottom: 16 },
});
