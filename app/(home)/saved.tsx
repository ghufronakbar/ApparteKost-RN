import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import ListDistrict from "@/components/ui/ListDistrict";
import SearchField from "@/components/ui/SearchField";
import { C } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header Section */}
        <View className="flex px-4 space-y-2">
          <ThemedText className="w-full mb-4 mt-8" type="title" numberOfLines={1}>
            Tersimpan
          </ThemedText>
          <SearchField placeholder="Cari kosan disini..." />
          {/* Best Rated Section */}
          <View className="w-full flex space-y-2">
            <View className="w-full flex flex-row flex-wrap justify-between">
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;
