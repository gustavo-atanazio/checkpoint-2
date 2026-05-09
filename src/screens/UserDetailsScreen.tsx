import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

import { useUserDetails } from "../hooks/useUserDetails";

export default function UserDetailsScreen({ userId }: { userId?: number }) {
  const router = useRouter();
  const id =
    typeof userId === "number" && Number.isFinite(userId) ? userId : 1;
  const { data, isPending, isError, error, refetch } = useUserDetails(id);

  const title = useMemo(() => `UserDetails #${id}`, [id]);
  const errorMessage = useMemo(() => {
    if (!error) return "Erro ao carregar usuário";
    return error.message || "Erro ao carregar usuário";
  }, [error]);
  const handleUserPosts = () => {
    router.push({
      pathname: "/Users/[userId]/UserPosts",
      params: { userId: id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {isPending ? (
        <Loading />
      ) : isError ? (
        <View style={styles.section}>
          <ErrorMessage title="Falha ao carregar" message={errorMessage} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => void refetch()}
          >
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : !data ? (
        <EmptyState
          title="Usuário não encontrado"
          description="Tente novamente."
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{data.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{data.email}</Text>

          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>{data.phone}</Text>

          <Text style={styles.label}>Website</Text>
          <Text style={styles.value}>{data.website}</Text>

          <Text style={styles.label}>Empresa</Text>
          <Text style={styles.value}>{data.company.name}</Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleUserPosts}
          >
            <Text style={styles.buttonText}>Ver posts</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  section: { flex: 1, justifyContent: "center" },
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  label: { fontWeight: "800", marginTop: 10, marginBottom: 6 },
  value: { color: "#444", lineHeight: 20 },
  button: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
