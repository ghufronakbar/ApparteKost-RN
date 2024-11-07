import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import ListReview from "@/components/ui/ListReview";
import { C } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  FlatList,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

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
              />
            )}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="h-40" />
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

export default ListReviewScreen;
