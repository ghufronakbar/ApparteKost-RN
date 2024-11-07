import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import SearchField from "@/components/ui/SearchField";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListCostScreen = () => {
  const [search, setSearch] = useState<string>(
    (useLocalSearchParams().search as string) || ""
  );
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header Section */}
        <View className="flex px-4 space-y-2">
          <ThemedText
            className="w-full mb-4 mt-8"
            type="title"
            numberOfLines={1}
          >
            Cari Kos-kosan!
          </ThemedText>
          <SearchField
            placeholder="Cari kosan disini..."
            value={search}
            onTextChange={setSearch}
          />
          {/* Best Rated Section */}
          <View className="w-full flex space-y-2">
            <View className="w-full flex flex-row flex-wrap justify-between">
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
              <CardCost
                name="Kos Indehoy"
                image={"https://via.placeholder.com/150"}
                rating={4.5}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListCostScreen;
