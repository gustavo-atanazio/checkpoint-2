import React, { useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

import { usePosts } from "../hooks/usePosts";
import { Post } from "../types/post";

export default function UserPostsScreen({ userId }: { userId?: number }) {
  const id =
    typeof userId === "number" && Number.isFinite(userId) ? userId : 1;
  const { data, isPending, isError, error, refetch } = usePosts({ userId: id });
  const [query, setQuery] = useState("");

  const posts: Post[] | undefined = useMemo(() => {
    if (!data) return undefined;
    return data;
  }, [data]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [] as Post[];
    const value = query.trim().toLowerCase();
    if (!value) return posts;
    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      return title.includes(value) || body.includes(value);
    });
  }, [posts, query]);

  const message = useMemo(() => {
    if (!error) return "Erro ao carregar posts do usuário";
    return error.message || "Erro ao carregar posts do usuário";
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UserPosts (User {id})</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por titulo ou conteudo"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.reloadButton}
          activeOpacity={0.7}
          onPress={() => void refetch()}
        >
          <Text style={styles.buttonText}>Recarregar</Text>
        </TouchableOpacity>
      </View>

      {isPending ? (
        <Loading />
      ) : isError ? (
        <View style={styles.section}>
          <ErrorMessage title="Falha ao carregar" message={message} />
        </View>
      ) : !posts || posts.length === 0 ? (
        <EmptyState title="Sem posts" description="Tente novamente." />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title="Nenhum post encontrado"
          description="Ajuste a busca ou recarregue."
        />
      ) : (
        <View style={styles.list}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  section: { flex: 1, justifyContent: "center" },
  list: { flex: 1 },
  reloadButton: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
  },
  buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
