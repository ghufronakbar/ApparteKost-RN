import { ThemedText } from "@/components/ThemedText";
import ListReview from "@/components/ui/ListReview";
import { Review } from "@/models/ResBoarding";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";

const ListReviewScreen = () => {
  const { totalReview, rating, reviews } = useLocalSearchParams() as {
    totalReview: string;
    rating: string;
    reviews: string;
  };

  const jsonReviews: Review[] = JSON.parse(reviews);

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
              <ThemedText type="defaultSemiBold">{parseFloat(rating).toFixed(1)}</ThemedText>
            </View>
            <ThemedText type="link">{totalReview} Ulasan</ThemedText>
          </View>
          <FlatList
            data={jsonReviews}
            renderItem={({ item }) => (
              <ListReview
                comment={item.comment}
                name={item.user.name}
                rating={item.rating}
                image={item.user.picture}
                isFull
                key={item.reviewId}
                createdAt={item.createdAt}
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

export default ListReviewScreen;
