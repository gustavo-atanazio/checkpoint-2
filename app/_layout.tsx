import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import QueryProvider from "./QueryProvider";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="UsersFetch" options={{ title: "UsersFetch" }} />
          <Stack.Screen name="Users" options={{ title: "Users" }} />
          <Stack.Screen
            name="Users/[userId]"
            options={{ title: "UserDetails" }}
          />
          <Stack.Screen
            name="Users/[userId]/UserPosts"
            options={{ title: "UserPosts" }}
          />
          <Stack.Screen name="posts" options={{ title: "Posts" }} />
          <Stack.Screen name="CreatePost" options={{ title: "CreatePost" }} />
          <Stack.Screen name="ErrorTest" options={{ title: "ErrorTest" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryProvider>
  );
}
