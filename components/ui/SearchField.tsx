import React from "react";
import { View, TextInput, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "@/constants/Colors";

const isIOS = Platform.OS === "ios";

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onTextChange?: (text: string) => void;
  onSubmitEditing?: () => void;
}
const SearchField = ({
  placeholder,
  value,
  onTextChange,
  onSubmitEditing,
}: SearchFieldProps) => {
  return (
    <View
      className="flex-row items-center space-x-1 px-3 md:px-5 py-1 md:py-2 mb-2"
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Ionicons name="search-outline" size={24} color="gray" />
      <TextInput
        style={{
          flex: 1,
          marginTop: isIOS ? -4 : 0,
          color: "#000",
          fontFamily: "Outfit-Regular",
        }}
        className="text-base md:text-lg py-2 font-olight"
        placeholder={placeholder}
        placeholderTextColor={C[2]}
        value={value}
        onChangeText={onTextChange}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SearchField;
