import { DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { initProfile, ResProfile } from "@/models/ResAccount";
import { getSavedProfile, logout } from "@/services/account";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const SettingScreen = () => {
  const [profile, setProfile] = useState<ResProfile>(initProfile);
  const fetchProfile = async () => {
    const res = await getSavedProfile();
    res && setProfile(res);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View className="flex px-4 space-y-4">
            {/* Header Section */}

            <ThemedText
              className="w-4/5 mb-4 mt-8"
              type="title"
              numberOfLines={1}
            >
              Pengaturan
            </ThemedText>

            {/* Profile Section */}
            <View className="flex flex-row my-4 justify-between items-center w-full px-4">
              <Image
                source={
                  profile.picture ? { uri: profile.picture } : DEFAULT_PROFILE
                }
                className="w-12 aspect-square rounded-full object-cover"
              />
              <View className="w-4/5 flex flex-col">
                <ThemedText type="title" numberOfLines={1} className="text-2xl">
                  {profile.name}
                </ThemedText>
                <ThemedText
                  type="subtitle"
                  numberOfLines={1}
                  className="text-gray-500"
                >
                  Profile
                </ThemedText>
              </View>
            </View>
            <View className="h-px w-full bg-gray-300" />
            {/* Menu Section */}
            <View className="px-4">
              {LIST_MENU.map((item, i) => (
                <ListMenu
                  key={i}
                  icon={item.icon}
                  name={item.name}
                  color={item.color}
                  href={item.href}
                />
              ))}
            </View>
            <View className="h-px w-full bg-gray-300" />
            <View className="px-4">
              <ListMenu
                icon={
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={"#f44336"}
                  />
                }
                name="Keluar"
                color="#ffcdd2"
                href="/login"
                onPress={logout}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Toast />
    </View>
  );
};

const LIST_MENU: ListMenuProps[] = [
  {
    icon: <Ionicons name="person-outline" size={24} color={"#078fe7"} />,
    name: "Profil",
    color: "#aae1ff",
    href: "/profile",
  },
  {
    icon: <Ionicons name="lock-closed-outline" size={24} color={"#404fb1"} />,
    name: "Privasi",
    color: "#c4caec",
    href: "/change-password",
  },
  {
    icon: <Ionicons name="settings-outline" size={24} color={"#07b142"} />,
    name: "Umum",
    color: "#c0e8c6",
    href: "/general",
  },
  {
    icon: (
      <Ionicons name="information-circle-outline" size={24} color={"#fa9006"} />
    ),
    name: "Tentang Kami",
    color: "#fde0b1",
    href: "/about",
  },
];

interface ListMenuProps {
  icon: React.ReactNode;
  name: string;
  color: string;
  href: string;
  onPress?: () => void;
}

const ListMenu = ({ icon, name, color, href, onPress }: ListMenuProps) => {
  return (
    <TouchableOpacity
      className="flex flex-row my-4 justify-between items-center w-full"
      onPress={() => (onPress ? onPress() : router.push(href))}
    >
      <View
        className="w-12 h-12 aspect-square rounded-full flex justify-center items-center"
        style={{ backgroundColor: color }}
      >
        {icon}
      </View>
      <View className="w-4/5 flex flex-row justify-between">
        <ThemedText type="title" numberOfLines={1} className="text-2xl">
          {name}
        </ThemedText>
        <Ionicons name="chevron-forward" size={24} color={"black"} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingScreen;
