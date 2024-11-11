import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { APP_NAME } from "@/data/app";
import { router } from "expo-router";
import { TouchableOpacity, SafeAreaView, ScrollView, View } from "react-native";

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
              Ayo Cari Kos bersama
              <ThemedText className="text-custom-1 font-black" type="subtitle">
                {" "}
                {APP_NAME}!
              </ThemedText>
            </ThemedText>

            <View className="mt-8 space-y-4">
              <CustomInputText
                onChangeText={() => {}}
                value="Abi Pamungkas"
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap"
              />
              <CustomInputText
                onChangeText={() => {}}
                value={"abipamungkas@uty.ac.id"}
                label="Email"
                placeholder="Masukkan Alamat Email"
                keyboardType="email-address"
              />
              <CustomInputText
                onChangeText={() => {}}
                value="15151251125"
                label="Password"
                placeholder="Masukkan Password"
                secureTextEntry
              />
              <View className="mt-4">
                <TouchableOpacity className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2">
                  <ThemedText className="text-sm text-white text-center">
                    Daftar
                  </ThemedText>
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
