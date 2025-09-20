import { Stack, useRouter, useSegments } from "expo-router";
import "./globals.css";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

function RootNavigation() {
  const { authUser, loading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (authUser) {
      if (inAuthGroup || segments[0] === undefined) {
        router.replace("/(tabs)/Home");
      }
    } else {
      if (inTabsGroup) {
        router.replace("/");
      }
    }
  }, [authUser, loading, segments]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#010b13]">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <RootNavigation />
      <Toast />
    </AuthContextProvider>
  );
}