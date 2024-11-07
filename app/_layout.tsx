import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter: require("@/assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="list-cost" options={{ headerShown: false }} />
        <Stack.Screen name="ar-view" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            title: "Pengaturan Profile",
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="change-password"
          options={{
            title: "Ubah Kata Sandi",
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "Tentang Kami",
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="general"
          options={{
            title: "Informasi Umum",
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="list-review"
          options={{
            title: "Ulasan",
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="detail-cost"
          options={{
            title: "",
            headerTintColor: "#FFFFFF",
            headerTransparent: true,
            headerStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack>
      <Toast />
    </>
  );
}
