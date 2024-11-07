import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import ListDistrict from "@/components/ui/ListDistrict";
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

const HomeScreen = () => {
  const districs = [
    "Bandung",
    "Jakarta",
    "Bandung",
    "Bandung",
    "Surabaya",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Denpasar",
    "Yogyakarta",
    "Malang",
    "Bogor",
    "Bekasi",
  ];
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header Section */}
        <View className="flex px-4 space-y-4">
          <View className="flex flex-row mt-4 justify-between items-center w-full">
            <ThemedText className="w-4/5" type="title" numberOfLines={1}>
              Hello Abi Pamungkas
            </ThemedText>
            <TouchableOpacity className="w-12 aspect-square rounded-full object-cover">
              <Image
                source={DEFAULT_PROFILE}
                className="w-full h-full object-cover rounded-full"
              />
            </TouchableOpacity>
          </View>
          {/* Card Section */}
          <View className="flex flex-row mt-4 justify-between items-center w-full py-4">
            <TouchableOpacity
              style={{
                shadowColor: "black",
                width: "48%",
                aspectRatio: 1,
                borderRadius: 12,
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 10,
                elevation: 3,
                backgroundColor: C[1],
                overflow: "hidden",
                padding: 20,
                justifyContent: "space-between",
              }}
              onPress={()=>router.push("/list-cost")}
            >
              <View className="bg-white rounded-full p-2 aspect-square w-12 flex justify-center items-center">
                <Ionicons name="search" size={30} color={C[1]} />
              </View>
              <View>
                <ThemedText
                  className="text-custom-3 mt-4"
                  type="subtitle"
                  numberOfLines={1}
                >
                  Cari Kosan
                </ThemedText>
                <ThemedText
                  className="text-custom-3"
                  type="default"
                  numberOfLines={2}
                >
                  Cari Kos disini!
                </ThemedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                shadowColor: "black",
                width: "48%",
                aspectRatio: 1,
                borderRadius: 12,
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 10,
                elevation: 3,
                backgroundColor: "white",
                overflow: "hidden",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View className="bg-gray-200 rounded-full p-2 aspect-square w-12 flex justify-center items-center">
                <Ionicons name="calendar-outline" size={30} color={C[1]} />
              </View>
              <View>
                <ThemedText
                  className="text-custom-1"
                  type="subtitle"
                  numberOfLines={1}
                >
                  Sabtu, 15 Oktober
                </ThemedText>
                <ThemedText
                  className="text-custom-1"
                  type="default"
                  numberOfLines={2}
                >
                  Yogyakarta, Indonesia
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
          {/* Districs Section */}
          <View className="w-full">
            <ThemedText type="sectionTitle">Daerah</ThemedText>
            <FlatList
              data={districs}
              renderItem={({ item }) => <ListDistrict name={item} />}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            />
          </View>
          {/* Best Rated Section */}
          <View className="w-full flex space-y-2">
            <ThemedText type="sectionTitle">Terpopuler</ThemedText>
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

export default HomeScreen;
