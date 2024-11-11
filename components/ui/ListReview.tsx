import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ScrollView, View } from "react-native";

interface Props {
  name: string;
  image?: string;
  rating: number;
  comment: string | null;
  isFull?: boolean;
  isDeletable?: boolean;
}

const ListReview = ({
  name,
  image,
  rating,
  comment,
  isFull = false,
  isDeletable,
}: Props) => {
  return (
    <View
      style={{
        shadowColor: "black",
        width: isFull ? "95%" : "auto",
        height: isFull ? "auto" : 130,
        alignSelf: isFull ? "center" : "flex-start",
        aspectRatio: 21 / 9,
        borderRadius: 12,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: "white",
        overflow: "hidden",
        padding: 20,
        flexDirection: "column",
        gap: 8,
        marginBottom: 8,
        marginHorizontal: 8,
      }}
    >
      <View className="flex flex-row justify-between">
        <View className="flex flex-row">
          <Image
            source={image ? { uri: image } : DEFAULT_PROFILE}
            className="w-12 h-12 aspect-square object-cover rounded-full"
          />
          <View className="flex flex-col ml-4">
            <ThemedText type="subtitle" numberOfLines={1}>
              {name}
            </ThemedText>
            <ThemedText
              type="defaultSemiBold"
              numberOfLines={1}
              className="text-gray-500"
            >
              {Math.floor(Math.random() * 10) + 1} hari lalu
            </ThemedText>
          </View>
        </View>
        <View className="flex flex-col items-end space-y-1">
          <View className="flex flex-row space-x-1 justify-end">
            <Ionicons name="star" size={16} color="#fa9006" />
            <ThemedText type="defaultSemiBold">{rating.toFixed(1)}</ThemedText>
          </View>
          {false && (
            <Ionicons name="backspace-sharp" size={16} color="red" />
          )}
        </View>
      </View>
      <ThemedText type="default" numberOfLines={isFull ? 0 : 2}>
        {comment}
      </ThemedText>
    </View>
  );
};

export default ListReview;
