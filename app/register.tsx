import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { APP_NAME } from "@/data/app";
import { FormRegister, initFormRegister, register } from "@/services/account";
import { router } from "expo-router";
import { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";

const RegisterScreen = () => {
  const [form, setForm] = useState<FormRegister>(initFormRegister);
  const [loading, setLoading] = useState(false);

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
              Ayo Cari Kos bersama
              <ThemedText className="text-custom-1" type="subtitle">
                {" "}
                {APP_NAME}!
              </ThemedText>
            </ThemedText>

            <View className="mt-8 space-y-4">
              <CustomInputText
                onChangeText={(text) => setForm({ ...form, name: text })}
                value={form.name}
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap"
              />
              <CustomInputText
                onChangeText={(text) => setForm({ ...form, email: text })}
                value={form.email}
                label="Email"
                placeholder="Masukkan Alamat Email"
                keyboardType="email-address"
              />
              <CustomInputText
                onChangeText={(text) => setForm({ ...form, phone: text })}
                value={form.phone}
                label="Nomor Telepon"
                placeholder="Masukkan Nomor Telepon"
                keyboardType="phone-pad"
              />
              <CustomInputText
                onChangeText={(text) => setForm({ ...form, password: text })}
                value={form.password}
                label="Password"
                placeholder="Masukkan Password"
                secureTextEntry
              />
              <View className="mt-4">
                <TouchableOpacity
                  className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                  onPress={() => register(form, loading, setLoading)}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <ThemedText className="text-sm text-white text-center">
                      Daftar
                    </ThemedText>
                  )}
                </TouchableOpacity>
                <View className="flex flex-row justify-between items-center my-6">
                  <View className="h-px w-[30%] bg-neutral-200" />
                  <ThemedText className="text-black">
                    Sudah punya akun?
                  </ThemedText>
                  <View className="h-px w-[30%] bg-neutral-200" />
                </View>
                <TouchableOpacity
                  className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                  onPress={() => router.replace("/login")}
                >
                  <ThemedText className="text-sm text-custom-1 text-center">
                    Masuk
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

export default RegisterScreen;
