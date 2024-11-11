import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { DEFAULT_IMAGE } from "@/assets";
import { useState } from "react";

interface Props {
  message: string;
  time: string;
  image?: string | null;
  district: string;
  subdistrict: string;
}

const ListHistory = ({
  message,
  time,
  image,
  district,
  subdistrict,
}: Props) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  return (
    <TouchableOpacity
      style={{
        shadowColor: "black",
        width: "100%",
        borderRadius: 12,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: "white",
        overflow: "hidden",
        padding: 20,
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-between",
        marginBottom: 16,
      }}
      onPress={() => setIsExpand(!isExpand)}
    >
      <View className="flex flex-row space-x-2">
        <Image
          source={image ? { uri: image } : DEFAULT_IMAGE}
          className="w-16 h-16 aspect-square object-cover rounded-full"
        />
        <View className="w-2/3 flex flex-col">
          <ThemedText type="defaultSemiBold" numberOfLines={isExpand ? 2 : 100}>
            {message}
          </ThemedText>
          <ThemedText type="default" className="text-sm">
            {subdistrict} | {district}
          </ThemedText>
        </View>
      </View>
      <ThemedText type="default" className="text-sm">
        {time}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default ListHistory;
