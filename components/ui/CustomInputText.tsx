import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

export interface CustomInputTextProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const CustomInputText: React.FC<CustomInputTextProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
}) => {
  return (
    <View className="flex flex-col space-y-2 mb-4">
      <ThemedText type="label">{label}</ThemedText>
      <TextInput
        className={`w-full bg-white border border-neutral-200 rounded-lg px-4 py-2 ${
          multiline ? "h-40" : "h-12"
        } `}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor={"#a3a3a3"}
        secureTextEntry={secureTextEntry}
        style={{
          fontFamily: "Outfit-Regular",
        }}
      />
    </View>
  );
};
