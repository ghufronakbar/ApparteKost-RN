import { DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import CardCost from "@/components/ui/CardCost";
import ListDistrict from "@/components/ui/ListDistrict";
import { C } from "@/constants/Colors";
import { initProfile, ResProfile } from "@/models/ResAccount";
import { ResBoarding } from "@/models/ResBoarding";
import { getSavedProfile } from "@/services/account";
import { getAllBoardings, getKeyLocation } from "@/services/boarding";
import formatDate from "@/utils/formatDate";
import { getCurrentPosition } from "@/utils/getCurrentLocation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [data, setData] = useState<ResBoarding>();
  const [keyLoc, setKeyLoc] = useState<string[]>([]);
  const [profile, setProfile] = useState<ResProfile>(initProfile);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const date = new Date();

  const fetchData = async (cache = false) => {
    const res = await getAllBoardings(cache);
    res && setData(res);
  };

  const fetchKeyLocs = async (cache = false) => {
    const res = await getKeyLocation(cache);
    res && setKeyLoc(res.district);
  };

  const fetchProfile = async () => {
    const res = await getSavedProfile();
    res && setProfile(res);
  };

  const fetchLocation = async () => {
    const res = await getCurrentPosition();
    res && setLocation(res.addressDetail.join(", "));
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
      fetchLocation();
      fetchData();
      fetchKeyLocs();
    }, [])
  );

  const handleRefresh = async () => {
    setLoading(true);
    await Promise.all([fetchData(true), fetchKeyLocs(true)]);
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={[{}]}
        onRefresh={handleRefresh}
        refreshing={loading}
        renderItem={() => (
          <View className="flex px-4 space-y-4">
            <View className="flex flex-row mt-4 justify-between items-center w-full">
              <ThemedText className="w-4/5" type="title" numberOfLines={1}>
                Hello {profile.name}
              </ThemedText>
              <TouchableOpacity className="w-12 aspect-square rounded-full object-cover">
                <Image
                  source={
                    profile.picture ? { uri: profile.picture } : DEFAULT_PROFILE
                  }
                  className="w-full h-full object-cover rounded-full"
                />
              </TouchableOpacity>
            </View>
            {/* Card Section */}
            <View className="flex flex-row mt-4 justify-between items-center w-full py-4">
              <TouchableOpacity
                style={{
                  shadowColor: "black",
                  width: "48%",
                  aspectRatio: 1,
                  borderRadius: 12,
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: C[1],
                  overflow: "hidden",
                  padding: 20,
                  justifyContent: "space-between",
                }}
                onPress={() => router.push("/list-cost")}
              >
                <View className="bg-white rounded-full p-2 aspect-square w-12 flex justify-center items-center">
                  <Ionicons name="search" size={30} color={C[1]} />
                </View>
                <View>
                  <ThemedText
                    className="text-custom-3 mt-4"
                    type="subtitle"
                    numberOfLines={1}
                  >
                    Cari Kosan
                  </ThemedText>
                  <ThemedText
                    className="text-custom-3"
                    type="default"
                    numberOfLines={2}
                  >
                    Cari Kos disini!
                  </ThemedText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  shadowColor: "black",
                  width: "48%",
                  aspectRatio: 1,
                  borderRadius: 12,
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  elevation: 3,
                  backgroundColor: "white",
                  overflow: "hidden",
                  padding: 20,
                  justifyContent: "space-between",
                }}
              >
                <View className="bg-gray-200 rounded-full p-2 aspect-square w-12 flex justify-center items-center">
                  <Ionicons name="calendar-outline" size={30} color={C[1]} />
                </View>
                <View>
                  <ThemedText
                    className="text-custom-1"
                    type="subtitle"
                    numberOfLines={1}
                  >
                    {formatDate(date.toISOString())}
                  </ThemedText>
                  <ThemedText
                    className="text-custom-1"
                    type="default"
                    numberOfLines={2}
                  >
                    {location}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            {/* Districs Section */}
            <View className="w-full">
              <ThemedText type="sectionTitle">Daerah</ThemedText>
              <FlatList
                data={keyLoc}
                renderItem={({ item }) => <ListDistrict name={item} />}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
              />
            </View>
            {/* Best Rated Section */}
            <View className="w-full flex space-y-2">
              <View className="flex flex-row justify-between items-center">
                <ThemedText type="sectionTitle">Terpopuler</ThemedText>
                {data && data?.all?.length > 5 ? (
                  <TouchableOpacity onPress={() => router.push("/list-cost")}>
                    <ThemedText type="default" className="text-custom-1">
                      Lihat Selengkapnya
                    </ThemedText>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View className="w-full flex flex-row flex-wrap justify-between">
                {data &&
                  data?.all
                    .slice(0, 5)
                    .map((item) => (
                      <CardCost
                        id={item?.boardingHouseId?.toString()}
                        name={item?.name}
                        image={item?.pictures?.[0]?.picture}
                        rating={item?.averageRating}
                        key={item?.boardingHouseId}
                        price={item?.price}
                      />
                    ))}
              </View>
              <View className="w-full h-20 " />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
