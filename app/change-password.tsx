import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import {
  changePassword,
  FormChangePassword,
  initFormChangePassword,
} from "@/services/account";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
  const [form, setForm] = useState<FormChangePassword>(initFormChangePassword);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View className="flex px-4 space-y-2">
            {/* Best Rated Section */}
            <View className="w-full flex space-y-2">
              <CustomInputText
                label="Password Lama"
                value={form.oldPassword}
                onChangeText={(text) => setForm({ ...form, oldPassword: text })}
                secureTextEntry
              />
              <CustomInputText
                label="Password Baru"
                value={form.newPassword}
                onChangeText={(text) => setForm({ ...form, newPassword: text })}
                secureTextEntry
              />
              <CustomInputText
                label="Konfirmasi Password Baru"
                value={form.confirmPassword}
                onChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
                secureTextEntry
              />
              <TouchableOpacity
                className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                onPress={() =>
                  changePassword(form, setForm, loading, setLoading)
                }
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <ThemedText className="text-sm text-white text-center">
                    Ganti Kata Sandi
                  </ThemedText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default ChangePasswordScreen;
