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
    isDeletable: true,
  },
  {
    name: "Aldo",
    rating: 4.8,
    comment:
      "Kos yang nyaman dan bersih. Fasilitasnya lengkap dan pemiliknya sangat ramah.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg",
  },
  {
    name: "Bekti",
    rating: 4,
    comment:
      "Tempat yang tenang untuk belajar dan istirahat. Harga sesuai dengan fasilitas.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg",
  },
  {
    name: "Maharani",
    rating: 4,
    comment: "Kamar luas dan bersih, namun sinyal WiFi terkadang lambat.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/640px-Kamala_Harris_Vice_Presidential_Portrait.jpg",
  },
  {
    name: "Martin",
    rating: 5,
    comment:
      "Sangat puas dengan kos ini! Lingkungan aman dan nyaman, serta dekat dengan kampus.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/640px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
  },
];

export default ListReviewScreen;
