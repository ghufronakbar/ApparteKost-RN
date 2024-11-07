import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { Inter } from "@/constants/Fonts";
import { APP_NAME } from "@/data/app";
import { router } from "expo-router";
import { TouchableOpacity, SafeAreaView, ScrollView, Text, View } from "react-native";

const RegisterScreen = () => {
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-4 flex bg-neutral-50"
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-full rounded-lg">
            <ThemedText type="title" className="text-custom-1">
              Daftar Akun
            </ThemedText>
            <ThemedText type="subtitle">
              Ayo Cari Kos bersama {APP_NAME}
            </ThemedText>

            <View className="mt-8 space-y-4">
              <CustomInputText
                onChangeText={() => {}}
                value=""
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap"
              />
              <CustomInputText
                onChangeText={() => {}}
                value=""
                label="Email"
                placeholder="Masukkan Alamat Email"
                keyboardType="email-address"
              />
              <CustomInputText
                onChangeText={() => {}}
                value=""
                label="Password"
                placeholder="Masukkan Password"
                secureTextEntry
              />
              <View className="mt-4">
                <TouchableOpacity className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2">
                  <Text
                    className="text-sm text-white text-center"
                    style={Inter}
                  >
                    Daftar
                  </Text>
                </TouchableOpacity>
                <View className="flex flex-row justify-between items-center my-6">
                  <View className="h-px w-[30%] bg-neutral-200" />
                  <Text className="text-black" style={Inter}>
                    Sudah punya akun?
                  </Text>
                  <View className="h-px w-[30%] bg-neutral-200" />
                </View>
                <TouchableOpacity
                  className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                  onPress={() => router.replace("/login")}
                >
                  <Text
                    className="text-sm text-custom-1 text-center"
                    style={Inter}
                  >
                    Masuk
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
