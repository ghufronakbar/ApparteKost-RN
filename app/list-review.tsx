import { ThemedText } from "@/components/ThemedText";
import ListReview from "@/components/ui/ListReview";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, View } from "react-native";

const ListReviewScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <View
        className="bg-gray-50 p-4"
        style={{
          shadowColor: "black",
          width: "100%",
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 3,
          backgroundColor: "white",
          overflow: "hidden",
          gap: 24,
          flex: 1,
        }}
      >
        <View className="space-y-4">
          <View className="flex flex-col">
            <View className="flex flex-row space-x-2 items-center">
              <ThemedText type="sectionTitle">Ulasan</ThemedText>
              <Ionicons name="star" size={24} color="#fa9006" />
              <ThemedText type="defaultSemiBold">4.9</ThemedText>
            </View>
            <ThemedText type="link">155 Ulasan</ThemedText>
          </View>
          <FlatList
            data={LIST_REVIEWS}
            renderItem={({ item }) => (
              <ListReview
                comment={item.comment}
                name={item.name}
                rating={item.rating}
                image={item.image}
                isFull
                isDeletable={item.isDeletable}
              />
            )}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 2 }}
          />
        </View>
      </View>
    </View>
  );
};

const LIST_REVIEWS = [
  {
    name: "Abi Pamungkas",
    rating: 4,
    comment:
      "Kos yang nyaman dan bersih. Fasilitasnya lengkap dan pemiliknya sangat ramah.",
    image: "https://via.placeholder.com/150",
    isDeletable: true,
  },
  {
    name: "Rina",
    rating: 4,
    comment:
      "Tempat yang tenang untuk belajar dan istirahat. Harga sesuai dengan fasilitas.",
  },
  {
    name: "Dika",
    rating: 4,
    comment: "Kamar luas dan bersih, namun sinyal WiFi terkadang lambat.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Maya",
    rating: 5,
    comment:
      "Sangat puas dengan kos ini! Lingkungan aman dan nyaman, serta dekat dengan kampus.",
  },
  {
    name: "Yudi",
    rating: 3,
    comment: "Kos lumayan, namun fasilitas dapurnya perlu diperbarui.",
  },
  {
    name: "Santi",
    rating: 4,
    comment:
      "Kebersihan terjaga dengan baik dan terdapat parkir motor yang luas.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Rico",
    rating: 4,
    comment:
      "Harga cukup terjangkau dengan fasilitas AC dan air panas di kamar mandi.",
  },
  {
    name: "Wulan",
    rating: 4,
    comment:
      "Pemilik kos ramah dan membantu. Kamar nyaman dengan kasur dan lemari yang bagus.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Hendra",
    rating: 4,
    comment:
      "Lokasi strategis dekat dengan minimarket, namun kadang berisik saat malam.",
  },
  {
    name: "Tina",
    rating: 4,
    comment:
      "Suka dengan suasananya yang tenang, tetapi kamar mandi perlu lebih sering dibersihkan.",
    image: "https://via.placeholder.com/150",
  },
];

export default ListReviewScreen;
