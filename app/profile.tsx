import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import { CustomInputText } from "@/components/ui/CustomInputText";
import ListDistrict from "@/components/ui/ListDistrict";
import SearchField from "@/components/ui/SearchField";
import { C } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex px-4 space-y-2">
          {/* Best Rated Section */}
          <View className="w-full flex space-y-2">
            <Image
              source={DEFAULT_PROFILE}
              className="w-20 h-20 rounded-full self-center mb-4"
            />
            <CustomInputText
              label="Nama Lengkap"
              value="Abi Pamungkas"
              onChangeText={() => {}}
            />
            <CustomInputText
              label="Email"
              value="abipamungkas@uty.ac.id"
              onChangeText={() => {}}
            />
            <CustomInputText
              label="No Telepon"
              value="62325231512"
              onChangeText={() => {}}
            />
            <TouchableOpacity
              className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
              onPress={() => router.push("/change-password")}
            >
              <ThemedText className="text-sm text-custom-1 text-center">
                Ganti Kata Sandi
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2">
              <ThemedText className="text-sm text-white text-center">
                Edit Profile
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
