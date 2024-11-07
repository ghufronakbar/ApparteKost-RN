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
  const districts = [
    "Bantul",
    "Sleman",
    "Kulon Progo",
    "Gunung Kidul",
    "Yogyakarta",
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
              onPress={() => router.push("/list-cost")}
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
              data={districts}
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
              {LIST_COST.map((item) => (
                <CardCost
                  name={item.name}
                  image={item.image}
                  rating={item.rating}
                  key={item.name}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LIST_COST = [
  {
    name: "Kos Damai",
    image:
      "https://cdn1-production-images-kly.akamaized.net/0q-sddESXGDpLdVz4IXelsZAW24=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/861628/original/073424800_1429960385-3.JPG",
    rating: 4.5,
  },
  {
    name: "Kos Harmoni",
    image:
      "https://kontainerindonesia.co.id/blog/wp-content/uploads/2024/06/Kos-Kosan-dari-Kontainer.jpg",
    rating: 4.7,
  },
  {
    name: "Kos Mewah",
    image:
      "https://d3p0bla3numw14.cloudfront.net/news-content/img/2021/06/14120054/Bisnis-Kos-kosan.png",
    rating: 4.8,
  },
  {
    name: "Kos Nyaman",
    image: "https://ykpbni.or.id/uploads/publikasi/3737-Bisnis_Kost.jpg",
    rating: 4.3,
  },
  {
    name: "Kos Sejahtera",
    image:
      "https://storage.googleapis.com/storage-ajaib-prd-platform-wp-artifact/2020/10/Kos-kosan.jpg",
    rating: 4.6,
  },
  {
    name: "Kos Aman",
    image:
      "https://homesyariah.com/wp-content/uploads/2020/12/www.homesyariah.com-rumah-kos-Grand_Royal_Radar_Baru-004.jpg",
    rating: 4.4,
  },
  {
    name: "Kos Ceria",
    image:
      "https://www.simplyhomy.com/wp-content/uploads/2018/08/bisnis-kos-kosan-570x300.jpg",
    rating: 4.2,
  },
  {
    name: "Kos Sentosa",
    image:
      "https://www.99.co/id/panduan/wp-content/uploads/2022/11/peraturan-kos-kosan-1000x630.jpg",
    rating: 4.9,
  },
  { name: "Kos Indah", image: null, rating: 4.1 },
  {
    name: "Kos Bahagia",
    image:
      "https://pennyu.co.id/wp-content/uploads/2023/04/Kost-mahasiswa-jpg.webp",
    rating: 4.5,
  },
];

export default HomeScreen;
