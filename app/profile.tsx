import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { C } from "@/constants/Colors";
import { initProfile, ResProfile } from "@/models/ResAccount";
import {
  deleteProfilePicture,
  getSavedProfile,
  updateProfile,
  uploadProfilePicture,
} from "@/services/account";
import { showPickerOptions } from "@/utils/pickImage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const [profile, setProfile] = useState<ResProfile>(initProfile);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
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
    <>
      <SafeAreaView>
        <ScrollView>
          <View className="flex px-4 space-y-2">
            {/* Best Rated Section */}
            <View className="w-full flex space-y-2">
              <TouchableOpacity
                className="w-20 h-20 rounded-full self-center mb-4 relative"
                onPress={() =>
                  showPickerOptions(
                    {
                      directlyCallback: (image) =>
                        uploadProfilePicture(
                          image,
                          pending,
                          setPending,
                          fetchProfile
                        ),
                    },
                    {
                      callbackDeleteImage: () => deleteProfilePicture(),
                      camera: true,
                      deleteImage: true,
                      gallery: true,
                    }
                  )
                }
              >
                {pending && (
                  <ActivityIndicator
                    size="small"
                    color={C[1]}
                    className="absolute top-0 left-0 right-0 bottom-0 z-10"
                  />
                )}

                <Image
                  source={
                    profile.picture ? { uri: profile.picture } : DEFAULT_PROFILE
                  }
                  className="w-20 h-20 rounded-full relative"
                />
              </TouchableOpacity>
              <CustomInputText
                label="Nama Lengkap"
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
              />
              <CustomInputText
                label="Email"
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
              />
              <CustomInputText
                label="No Telepon"
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
              />
              <TouchableOpacity
                className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                onPress={() => router.push("/change-password")}
              >
                <ThemedText className="text-sm text-custom-1 text-center">
                  Ganti Kata Sandi
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                onPress={() => updateProfile(profile, loading, setLoading)}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <ThemedText className="text-sm text-white text-center">
                    Edit Profile
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

export default ProfileScreen;
