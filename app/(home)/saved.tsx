import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import ListDistrict from "@/components/ui/ListDistrict";
import SearchField from "@/components/ui/SearchField";
import { C } from "@/constants/Colors";
import { ResBoarding, ResBoardingDetail } from "@/models/ResBoarding";
import { bookmarkBoarding, getAllBoardings } from "@/services/boarding";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
  const [data, setData] = useState<ResBoardingDetail[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (cache = false) => {
    setLoading(true);
    const res = await getAllBoardings(cache);
    res && setData(res.bookmarked);
    res && setLoading(false);
  };

  const filteredData = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.subdistrict.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleUnBookmark = async (id: string) => {
    const afterClicked = () =>
      setData(data.filter((item) => item.boardingHouseId !== Number(id)));
    afterClicked();
    bookmarkBoarding(id, false, () => {}, afterClicked);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={[{}]}
        refreshing={loading}
        onRefresh={() => fetchData(true)}
        renderItem={() => (
          <View className="flex px-4 space-y-2">
            <ThemedText
              className="w-full mb-4 mt-8"
              type="title"
              numberOfLines={1}
            >
              Tersimpan
            </ThemedText>
            <SearchField
              placeholder="Cari kosan tersimpan disini..."
              value={search}
              onTextChange={setSearch}
            />           
            {!loading && filteredData?.length === 0 && search !== "" && (
              <View className="w-full h-40 flex items-center justify-center">
                <ThemedText
                  type="default"
                  className="text-gray-500 text-center"
                >
                  Kosan dengan kata kunci "{search}" tidak ditemukan
                </ThemedText>
              </View>
            )}
            {!loading && filteredData?.length === 0 && search === "" && (
              <View className="w-full h-40 flex items-center justify-center">
                <ThemedText
                  type="default"
                  className="text-gray-500 text-center"
                >
                  Tidak ada kosan tersimpan
                </ThemedText>
              </View>
            )}
            {/* Best Rated Section */}
            <View className="w-full flex space-y-2">
              <View className="w-full flex flex-row flex-wrap justify-between">
                {filteredData.map((item) => (
                  <CardCost
                    id={item.boardingHouseId.toString()}
                    key={item.boardingHouseId}
                    name={item.name}
                    image={item?.pictures[0]?.picture}
                    rating={item.averageRating}
                    isBookmarked
                    onPressBookmark={() =>
                      handleUnBookmark(item?.boardingHouseId?.toString())
                    }
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

export default SavedScreen;
