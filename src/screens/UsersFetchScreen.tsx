import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import UserCard from "../components/UserCard";

import { User } from "../types/user";

export default function UsersFetchScreen() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = (await res.json()) as User[];
      setUsers(json);
    } catch (e) {
      const message =
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message ?? "Erro de rede")
          : "Erro de rede";
      setError(message);
      setUsers(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UsersFetch</Text>

      {loading ? (
        <Loading />
      ) : error ? (
        <View style={styles.section}>
          <ErrorMessage title="Falha ao carregar" message={error} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => void load()}
          >
            <Text style={styles.buttonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      ) : users && users.length > 0 ? (
        <View style={styles.list}>
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </View>
      ) : (
        <EmptyState title="Sem usuários" description="Tente recarregar." />
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
});
