import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import ListDistrict from "@/components/ui/ListDistrict";
import ListHistory from "@/components/ui/ListHistory";
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

const HistoryScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header Section */}
        <View className="flex px-4 space-y-2">
          <ThemedText
            className="w-full mb-4 mt-8"
            type="title"
            numberOfLines={1}
          >
            Riwayat
          </ThemedText>
          {/* List of History */}
          <View className="w-full flex">
            {LIST_HISTORY.map((item, index) => (
              <ListHistory
                key={index}
                description={item.description}
                date={item.date}
                image={item.image}
                district={item.district}
                subdistrict={item.subdistrict}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LIST_HISTORY = [
  {
    description: "Anda melakukan booking untuk Kos di Damai Kos",
    date: new Date(),
    image:
      "https://pennyu.co.id/wp-content/uploads/2023/04/Kost-mahasiswa-jpg.webp",

    district: "Denpasar",
    subdistrict: "Denpasar Barat",
  },
  {
    description: "Anda melakukan booking untuk Kos di Pagaran Kos",
    date: new Date(),
    district: "Sleman",
    subdistrict: "Mlati",
    image:
      "https://www.99.co/id/panduan/wp-content/uploads/2022/11/peraturan-kos-kosan-1000x630.jpg",
  },
  {
    description:
      "Anda melakukan booking untuk Kos di Mami Kos",
    date: new Date(),
    district: "Magelang",
    subdistrict: "Mertoyudan",
    image:
      "https://www.simplyhomy.com/wp-content/uploads/2018/08/bisnis-kos-kosan-570x300.jpg",
  },
];

export default HistoryScreen;
