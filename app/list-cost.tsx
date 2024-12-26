import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import SearchField from "@/components/ui/SearchField";
import { C } from "@/constants/Colors";
import { ResBoarding, ResBoardingDetail } from "@/models/ResBoarding";
import { getAllBoardings } from "@/services/boarding";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListCostScreen = () => {
  const [search, setSearch] = useState<string>(
    (useLocalSearchParams().search as string) || ""
  );

  const [data, setData] = useState<ResBoardingDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filteredData = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.subdistrict.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async (cache = false) => {
    setLoading(true);
    const res = await getAllBoardings(cache);
    res && setData(res.all);
    res && setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  interface Filter {
    label: string;
    value: ResBoardingDetail[];
  }

  const [selectedFilterType, setSelectedFilterType] = useState("Semua");

  const getSortedData = useCallback(
    (type: string) => {
      const dataToFilter = search ? filteredData : data;
      const clonedData = [...dataToFilter];

      switch (type) {
        case "Terpopuler":
          return clonedData.sort(
            (a, b) => b._count.bookings - a._count.bookings
          );
        case "Rating Tertinggi":
          return clonedData.sort((a, b) => b.averageRating - a.averageRating);
        case "Harga Termurah":
          return clonedData.sort((a, b) => a.price - b.price);
        case "Harga Termahal":
          return clonedData.sort((a, b) => b.price - a.price);
        default:
          return clonedData;
      }
    },
    [data, filteredData, search]
  );

  const filters = [
    "Semua",
    "Terpopuler",
    "Rating Tertinggi",
    "Harga Termurah",
    "Harga Termahal",
  ];

  const displayedData = getSortedData(selectedFilterType);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <SafeAreaView>
      <FlatList
        data={[{}]}
        onRefresh={() => fetchData(true)}
        refreshing={loading}
        renderItem={() => (
          <View className="flex px-4 space-y-2 h-full">
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
            <View className="relative w-full z-50">
              <TouchableOpacity
                className="w-full flex flex-row items-center border border-gray-200 shadow-md shadow-gray-200 rounded-lg px-4 py-2 justify-between bg-white"
                onPress={() => setIsFilterOpen(!isFilterOpen)}
              >
                <ThemedText
                  className="text-custom-1"
                  type="defaultSemiBold"
                  numberOfLines={1}
                >
                  {selectedFilterType}
                </ThemedText>
                <Ionicons
                  name={
                    isFilterOpen ? "chevron-up-outline" : "chevron-down-outline"
                  }
                  size={24}
                  color={C[2]}
                />
              </TouchableOpacity>

              {isFilterOpen && (
                <View className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-lg shadow-lg">
                  <FlatList
                    data={filters}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="w-full flex flex-row items-center px-4 py-2 border-b border-gray-100"
                        onPress={() => {
                          setSearch("");
                          setSelectedFilterType(item);
                          setIsFilterOpen(false);
                        }}
                      >
                        <ThemedText
                          className="text-custom-1"
                          type="defaultSemiBold"
                          numberOfLines={1}
                        >
                          {item}
                        </ThemedText>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
            {/* Best Rated Section */}
            <View className="w-full flex space-y-2">
              <View className="w-full flex flex-row flex-wrap justify-between">
                {displayedData?.length === 0 && search !== "" && (
                  <View className="w-full h-40 flex items-center justify-center">
                    <ThemedText
                      type="default"
                      className="text-gray-500 text-center"
                    >
                      Kosan dengan kata kunci "{search}" tidak ditemukan
                    </ThemedText>
                  </View>
                )}
                {displayedData?.map((item) => (
                  <CardCost
                    key={item.boardingHouseId}
                    id={item.boardingHouseId.toString()}
                    name={item?.name}
                    image={item?.pictures[0]?.picture}
                    rating={item.averageRating}
                    price={item.price}
                  />
                ))}
                <View className="h-40 w-full" />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ListCostScreen;
