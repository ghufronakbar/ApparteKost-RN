import { DEFAULT_IMAGE } from "@/assets";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { router } from "expo-router";

interface Props {
  id: string;
  name: string;
  image?: string | null;
  rating: number;
  isBookmarked?: boolean;
  onPressBookmark?: () => void;
}

const CardCost = ({
  name,
  image,
  rating,
  id,
  isBookmarked,
  onPressBookmark,
}: Props) => {
  return (
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
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 16,
      }}
      onPress={() =>
        router.push({
          pathname: "/detail-cost",
          params: { id },
        })
      }
    >
      <Image
        source={image ? { uri: image } : DEFAULT_IMAGE}
        className="w-16 h-16 aspect-square object-cover rounded-full"
      />
      {isBookmarked ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onPress={(e) => {
            e.stopPropagation();
            onPressBookmark?.();
          }}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
      <ThemedText type="subtitle" numberOfLines={1}>
        {name}
      </ThemedText>
      <View className="flex flex-row items-center space-x-1">
        <Ionicons name="star" size={20} color={"#fa9006"} />
        <ThemedText type="default" numberOfLines={1}>
          {rating.toFixed(1)}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default CardCost;
