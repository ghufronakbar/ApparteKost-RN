import { DEFAULT_COST, DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import ListReview from "@/components/ui/ListReview";
import { C } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

const DetailCostScreen = () => {
  const handleClick = () => {
    Alert.alert("Coming Soon");
  };
  return (
    <View className="flex-1 bg-white">
      {/* Gambar Background */}
      <View
        className="w-full h-80 absolute top-0 left-0 right-0"
        style={{ pointerEvents: "box-none" }}
      >
        <Image
          source={DEFAULT_COST}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            position: "absolute",
          }}
        />
        <View
          className="absolute bottom-0 left-0 right-0 bg-black/50 h-full"
          style={{ pointerEvents: "none" }}
        />
        <View className="flex justify-center items-center h-full">
          <Image
            source={DEFAULT_PROFILE}
            className="w-20 h-20 aspect-square object-cover rounded-full"
          />
          <ThemedText type="title" className="mt-4 text-white">
            Sarifuddin
          </ThemedText>
          <ThemedText type="defaultSemiBold" className="text-white">
            Pemilik
          </ThemedText>
          <View className="flex flex-row space-x-2 mt-4 z-10">
            <TouchableOpacity
              className="w-12 h-12 aspect-square rounded-full flex justify-center items-center bg-custom-3"
              onPress={handleClick}
              style={{ zIndex: 1 }}
            >
              <Ionicons name="chatbox-ellipses" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="w-12 h-12 aspect-square rounded-full flex justify-center items-center bg-custom-3">
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 aspect-square rounded-full flex justify-center items-center bg-custom-3">
              <Ionicons name="earth" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 aspect-square rounded-full flex justify-center items-center bg-custom-3">
              <MaterialIcons name="360" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Konten Scrollable */}
      <ScrollView contentContainerStyle={{ paddingTop: 300 }}>
        <View
          className="bg-white p-4"
          style={{
            shadowColor: "black",
            width: "100%",
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            elevation: 3,
            backgroundColor: "white",
            overflow: "hidden",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            gap: 24,
          }}
        >
          <View className="space-y-4">
            <ThemedText type="sectionTitle">Kos Indehoy</ThemedText>
            <ThemedText>
              Kos ini menawarkan keindahan alam dan keindahan hidupnya. Kos ini
              memiliki fasilitas yang lengkap dan cocok untuk para penghuni.
            </ThemedText>
          </View>
          <View className="space-y-4">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row space-x-2 items-center">
                <ThemedText type="sectionTitle">Ulasan</ThemedText>
                <Ionicons name="star" size={24} color="#fa9006" />
                <ThemedText type="defaultSemiBold">4.9</ThemedText>
                <ThemedText type="link">(155)</ThemedText>
              </View>
              <TouchableOpacity onPress={() => router.push("/list-review")}>
                <ThemedText type="link">Lihat Semua</ThemedText>
              </TouchableOpacity>
            </View>
            <View className="py-2">
              <FlatList
                data={LIST_REVIEWS}
                renderItem={({ item }) => (
                  <ListReview
                    comment={item.comment}
                    name={item.name}
                    rating={item.rating}
                    image={item.image}
                  />
                )}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
              />
            </View>
          </View>
          <View className="space-y-4">
            <View className="flex flex-row justify-between items-center">
              <ThemedText type="sectionTitle">Lokasi</ThemedText>
            </View>
            <TouchableOpacity className="flex flex-row space-x-4">
              <View className="flex justify-center items-center w-12 h-12 aspect-square rounded-full bg-gray-200">
                <Ionicons name="location" size={24} color={C[1]} />
              </View>
              <View>
                <ThemedText type="subtitle">Sleman, Yogyakarta</ThemedText>
                <ThemedText type="default">Jalan Abogoboga</ThemedText>
              </View>
            </TouchableOpacity>
          </View>
          <View className="">
            <View className="flex">
              <CustomInputText
                label="Beri Ulasan"
                placeholder="Tulis ulasanmu disini"
                multiline
                numberOfLines={4}
                onChangeText={() => {}}
                value=""
              />
            </View>
          </View>
          <View className="h-40" />
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: "#ddd",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View className="flex flex-row justify-between w-full items-center">
          <ThemedText type="default">Harga</ThemedText>
          <ThemedText type="subtitle">Rp. 1.000.000</ThemedText>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: C[1],
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 8,
            width: "100%",
            alignItems: "center",
          }}
        >
          <ThemedText type="defaultSemiBold" className="text-white">
            Booking Sekarang
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LIST_REVIEWS = [
  {
    name: "Asep",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Budi",
    rating: 4.0,
    comment: "Pellentesque habitant morbi tristique senectus et netus.",
  },
  {
    name: "Citra",
    image: "https://via.placeholder.com/150",
    rating: 3.8,
    comment: "Vivamus suscipit tortor eget felis porttitor volutpat.",
  },
  {
    name: "Dewi",
    rating: 4.2,
    comment:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
  },
];

export default DetailCostScreen;
