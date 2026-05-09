import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

import api from "../services/api";

type ErrorState = { message: string } | null;

export default function ErrorTestScreen() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorState>(null);
	const [dataOk, setDataOk] = useState(false);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		setDataOk(false);

		try {
			await api.get("/rota-inexistente");
			setDataOk(true);
		} catch (e) {
			const message =
				typeof e === "object" && e !== null && "message" in e
					? String((e as { message?: unknown }).message ?? "Erro HTTP")
					: "Erro HTTP";

			setError({ message: `Não foi possível carregar: ${message}` });
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void load();
	}, [load]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ErrorTest</Text>

			{loading ? (
				<Loading />
			) : dataOk ? (
				<EmptyState
					title="Erro não ocorreu"
					description="A rota deveria ser inexistente."
				/>
			) : error ? (
				<View style={styles.section}>
					<ErrorMessage title="Falha HTTP" message={error.message} />
					<TouchableOpacity
						style={styles.button}
						activeOpacity={0.7}
						onPress={() => void load()}
					>
						<Text style={styles.buttonText}>Retry</Text>
					</TouchableOpacity>
				</View>
			) : (
				<EmptyState title="Sem dados" description="Tente novamente." />
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
	},
	buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
