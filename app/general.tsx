import { DEFAULT_COST } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { APP_NAME, APP_TEXT } from "@/data/app";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GeneralScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex px-4 space-y-2">
          <View className="w-full flex space-y-4">
            <ThemedText type="title">{APP_NAME}</ThemedText>
            <Image
              source={DEFAULT_COST}
              className="w-full h-40 rounded-lg object-cover"
            />
            {APP_TEXT.GENERAL.CONTENTS.map((item, index) => (
              <ThemedText key={index} type="default" className="text-gray-500">
                {item}
              </ThemedText>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneralScreen;
