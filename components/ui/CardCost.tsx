import { DEFAULT_IMAGE } from "@/assets";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { router } from "expo-router";
import { C } from "@/constants/Colors";

interface Props {
  name: string;
  image?: string | null;
  rating: number;
}

const CardCost = ({ name, image = DEFAULT_IMAGE, rating }: Props) => {
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
      onPress={() => router.push(`/detail-cost`)}
    >
      <Image
        source={image ? { uri: image } : DEFAULT_IMAGE}
        className="w-16 h-16 aspect-square object-cover rounded-full"
      />
      <ThemedText type="subtitle" numberOfLines={1}>
        {name}
      </ThemedText>
      <View className="flex flex-row items-center space-x-1">
        <Ionicons name="star" size={20} color={"#fa9006"} />
        <ThemedText type="default" numberOfLines={1}>
          {rating}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default CardCost;
