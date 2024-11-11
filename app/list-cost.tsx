import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import SearchField from "@/components/ui/SearchField";
import { C } from "@/constants/Colors";
import { ResBoarding } from "@/models/ResBoarding";
import { getAllBoardings } from "@/services/boarding";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListCostScreen = () => {
  const [search, setSearch] = useState<string>(
    (useLocalSearchParams().search as string) || ""
  );

  const [data, setData] = useState<ResBoarding>();
  const [loading, setLoading] = useState<boolean>(true);

  const filteredData = data?.all.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.subdistrict.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    const res = await getAllBoardings();
    res && setData(res);
    res && setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              {loading && (
                <View className="w-full h-40 flex items-center justify-center">
                  <ActivityIndicator size="large" color={C[1]} />
                </View>
              )}
              {filteredData?.length === 0 && search !== "" && (
                <View className="w-full h-40 flex items-center justify-center">
                  <ThemedText
                    type="default"
                    className="text-gray-500 text-center"
                  >
                    Kosan dengan kata kunci "{search}" tidak ditemukan
                  </ThemedText>
                </View>
              )}
              {filteredData?.map((item) => (
                <CardCost
                  key={item.boardingHouseId}
                  id={item.boardingHouseId.toString()}
                  name={item?.name}
                  image={item?.pictures[0]?.picture}
                  rating={item.averageRating}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListCostScreen;
