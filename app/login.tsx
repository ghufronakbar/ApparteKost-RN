import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { APP_NAME, APP_TEXT } from "@/data/app";
import { FormLogin, initFormLogin, login } from "@/services/account";
import { router } from "expo-router";
import { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormLogin>(initFormLogin);

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-4 flex bg-neutral-50"
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-full rounded-lg">
            <ThemedText type="title" className="text-custom-1">
              {APP_NAME}
            </ThemedText>
            <ThemedText type="subtitle">{APP_TEXT.SLOGAN}</ThemedText>

            <View className="mt-8 space-y-4">
              <CustomInputText
                label="Email"
                placeholder="Masukkan Alamat Email"
                onChangeText={(value) => setForm({ ...form, email: value })}
                value={form.email}
                keyboardType="email-address"
              />
              <CustomInputText
                label="Password"
                placeholder="Masukkan Password"
                onChangeText={(value) => setForm({ ...form, password: value })}
                value={form.password}
                secureTextEntry
              />
              <View className="mt-4">
                <TouchableOpacity
                  className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                  onPress={() => login(form, loading, setLoading)}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <ThemedText className="text-sm text-white text-center">
                      Masuk
                    </ThemedText>
                  )}
                </TouchableOpacity>
                <View className="flex flex-row justify-between items-center my-6">
                  <View className="h-px w-[30%] bg-neutral-200" />
                  <ThemedText className="text-black">
                    Belum memiliki akun?
                  </ThemedText>
                  <View className="h-px w-[30%] bg-neutral-200" />
                </View>
                <TouchableOpacity
                  className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                  onPress={() => router.replace("/register")}
                >
                  <ThemedText className="text-sm text-custom-1 text-center">
                    Buat Akun
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
