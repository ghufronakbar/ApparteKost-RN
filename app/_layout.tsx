import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontsError] = useFonts({
    "Outfit-Thin": require("@/assets/fonts/Outfit-Thin.ttf"),
    "Outfit-ExtraLight": require("@/assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("@/assets/fonts/Outfit-Light.ttf"),
    "Outfit-Regular": require("@/assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "Outfit-SemiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("@/assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-Black": require("@/assets/fonts/Outfit-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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
            headerTitleStyle: {
              fontFamily: "Outfit-SemiBold",
            },
          }}
        />
        <Stack.Screen
          name="change-password"
          options={{
            title: "Ubah Kata Sandi",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontFamily: "Outfit-SemiBold",
            },
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "Tentang Kami",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontFamily: "Outfit-SemiBold",
            },
          }}
        />
        <Stack.Screen
          name="general"
          options={{
            title: "Informasi Umum",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontFamily: "Outfit-SemiBold",
            },
          }}
        />
        <Stack.Screen
          name="list-review"
          options={{
            title: "Ulasan",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontFamily: "Outfit-SemiBold",
            },
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
