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
import UserCard from "../components/UserCard";

import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";

export default function UsersScreen() {
  // Mantém o arquivo compilando sem depender de tipagem específica de rota.
  // O expo-router funciona via require no runtime.
  const router: { push: (arg: unknown) => void } =
    require("expo-router").useRouter();

  const { data, isLoading, isError, error, refetch, isFetching } = useUsers();
  const users = data ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>

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
      ) : users.length === 0 ? (
        <View style={styles.section}>
          <EmptyState
            title="Nenhum usuário"
            description="Sem dados disponíveis."
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => void refetch()}
          >
            <Text style={styles.buttonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.list}>
          <FlatList
            data={users}
            keyExtractor={(item: User) => String(item.id)}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <UserCard
                user={item}
                onPress={() =>
                  router.push({
                    pathname: "/Users/[userId]",
                    params: { userId: item.id },
                  })
                }
              />
            )}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => void refetch()}
          >
            <Text style={styles.buttonText}>Recarregar</Text>
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
  list: { flex: 1 },
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
