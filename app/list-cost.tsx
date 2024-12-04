import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import SearchField from "@/components/ui/SearchField";
import { C } from "@/constants/Colors";
import { ResBoarding } from "@/models/ResBoarding";
import { getAllBoardings } from "@/services/boarding";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
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

  const fetchData = async (cache = false) => {
    setLoading(true);
    const res = await getAllBoardings(cache);
    res && setData(res);
    res && setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView>
      <FlatList
        data={[{}]}
        onRefresh={() => fetchData(true)}
        refreshing={loading}
        renderItem={() => (
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
        )}
      />
    </SafeAreaView>
  );
};

export default ListCostScreen;
