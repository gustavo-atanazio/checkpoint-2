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

import { useCreatePost } from "../hooks/useCreatePost";
import { CreatePostInput } from "../types/post";

export default function CreatePostScreen() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [formError, setFormError] = useState<string | null>(null);
	const [createdId, setCreatedId] = useState<number | null>(null);

	const { mutateAsync, isPending, error, reset } = useCreatePost();

	const isValid = useMemo(() => {
		return title.trim().length > 0 && body.trim().length > 0;
	}, [title, body]);

	const errorMessage = useMemo(() => {
		if (formError) return formError;
		if (error) return error.message || "Erro ao criar post";
		return null;
	}, [error, formError]);

	const submit = async () => {
		setFormError(null);
		setCreatedId(null);
		reset();

		if (!isValid) {
			setFormError("Título e conteúdo são obrigatórios.");
			return;
		}

		const input: CreatePostInput = {
			title: title.trim(),
			body: body.trim(),
		};

		try {
			const post = await mutateAsync(input);
			setCreatedId(post.id);
		} catch {
			// Error state is handled by TanStack Query.
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>CreatePost</Text>

			{isPending ? (
				<Loading />
			) : errorMessage ? (
				<View style={styles.section}>
					<ErrorMessage title="Falha no POST" message={errorMessage} />
					<TouchableOpacity
						style={styles.button}
						activeOpacity={0.7}
						onPress={() => void submit()}
					>
						<Text style={styles.buttonText}>Tentar novamente</Text>
					</TouchableOpacity>
				</View>
			) : createdId ? (
				<View style={styles.section}>
					<EmptyState
						title={`Post criado! ID: ${createdId}`}
						description="Requisitado com Axios via interceptor."
					/>
					<TouchableOpacity
						style={styles.button}
						activeOpacity={0.7}
						onPress={() => {
							setCreatedId(null);
							setTitle("");
							setBody("");
							reset();
						}}
					>
						<Text style={styles.buttonText}>Criar outro</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.form}>
					<Text style={styles.label}>Título</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={setTitle}
						placeholder="Digite o título"
					/>

					<Text style={styles.label}>Conteúdo</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						value={body}
						onChangeText={setBody}
						placeholder="Digite o conteúdo"
						multiline
					/>

					<TouchableOpacity
						style={[styles.button, !isValid ? styles.buttonDisabled : null]}
						activeOpacity={0.7}
						onPress={() => void submit()}
					>
						<Text style={styles.buttonText}>Criar post</Text>
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
	form: { flex: 1 },
	label: { fontWeight: "800", marginTop: 8, marginBottom: 6 },
	input: {
		borderWidth: 1,
		borderColor: "#e5e7eb",
		borderRadius: 12,
		padding: 12,
		marginBottom: 10,
		backgroundColor: "#fff",
	},
	textArea: { height: 120, textAlignVertical: "top" },
	button: {
		backgroundColor: "#111827",
		borderRadius: 12,
		padding: 14,
		marginTop: 12,
	},
	buttonDisabled: { opacity: 0.6 },
	buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
