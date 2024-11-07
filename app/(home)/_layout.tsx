import { Tabs } from "expo-router";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { C } from "@/constants/Colors";

export default function LayoutHome() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: C[1],
          tabBarInactiveTintColor: "#687076",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Beranda",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarLabel: "Riwayat",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            tabBarLabel: "Tersimpan",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            tabBarLabel: "Pengaturan",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
