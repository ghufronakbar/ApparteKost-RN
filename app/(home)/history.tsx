import { ThemedText } from "@/components/ThemedText";
import ListHistory from "@/components/ui/ListHistory";
import { ResHistory } from "@/models/ResAccount";
import { getAllHistories } from "@/services/account";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryScreen = () => {
  const [data, setData] = useState<ResHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllHistories();
    res && setData(res);
    res && setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {/* Header Section */}
      <View className="flex px-4 space-y-2">
        <ThemedText className="w-full mb-4 mt-8" type="title" numberOfLines={1}>
          Riwayat
        </ThemedText>
        {/* List of History */}
        <View className="w-full flex">
          {data.length === 0 && (
            <View className="w-full h-40 flex items-center justify-center">
              <ThemedText type="default" className="text-gray-500 text-center">
                Tidak ada riwayat
              </ThemedText>
            </View>
          )}
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <>
                <ListHistory
                  key={item.type + item.boardingHouseId}
                  message={item.message}
                  time={item.timeRelative}
                  image={item.picture}
                  district={item.district}
                  subdistrict={item.subdistrict}
                />
                {index === data.length - 1 && <View className="h-60" />}
              </>
            )}
            keyExtractor={(item) => item.type + item.boardingHouseId}
            refreshing={loading}
            onRefresh={fetchData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
