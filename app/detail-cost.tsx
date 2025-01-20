import { DEFAULT_COST, DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import ListReview from "@/components/ui/ListReview";
import { C } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
  Linking,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import {
  bookingBoarding,
  bookmarkBoarding,
  FormReviewBoarding,
  getBoardingDetail,
  initFormReviewBoarding,
  reviewBoarding,
} from "@/services/boarding";
import {
  initResboardingDetail,
  Panorama,
  ResBoardingDetail,
} from "@/models/ResBoarding";
import formatRupiah from "@/utils/formatRupiah";
import Toast from "react-native-toast-message";
import ModalShowImages from "@/components/ui/ModalShowImages";

const DetailCostScreen = () => {
  const [data, setData] = useState<ResBoardingDetail>(initResboardingDetail);
  const [form, setForm] = useState<FormReviewBoarding>(initFormReviewBoarding);
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { id } = useLocalSearchParams() as { id: string };

  const [isPanoramaOpen, setIsPanoramaOpen] = useState(false);

  const [isImageOpen, setIsImageOpen] = useState(false);

  const fetchData = async (cache = false) => {
    setFetching(true);
    const res = await getBoardingDetail(id, cache);
    if (res) {
      setData(res);
      setForm({ ...form, boardingHouseId: Number(id) });
    }
    setFetching(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const messageClick = async () => {
    try {
      const url = `whatsapp://send?phone=${data?.phone}`;
      await Linking.openURL(url);
      // const canOpen = await Linking.canOpenURL(url);
      // if (data.boardingHouseId !== 0) {
      //   const canOpen = await Linking.canOpenURL(url);
      //   if (canOpen) {
      //     await Linking.openURL(url);
      //   } else {
      //     console.log("Tidak dapat membuka WhatsApp");
      //     Alert.alert("Tidak dapat membuka WhatsApp");
      //   }
      // }
    } catch (error) {
      console.error("Failed to open URL", error);
      Alert.alert("Error", "Terjadi kesalahan saat mencoba membuka WhatsApp.");
    }
  };

  const saveClick = async () => {
    if (data.boardingHouseId !== 0 && data.isBookmarked === false) {
      bookmarkBoarding(id, loadingSave, setLoadingSave, () =>
        setData({ ...data, isBookmarked: true })
      );
    } else if (data.boardingHouseId !== 0 && data.isBookmarked === true) {
      bookmarkBoarding(id, loadingSave, setLoadingSave, () =>
        setData({ ...data, isBookmarked: false })
      );
    }
  };
  const mapClick = async () => {
    await Linking.openURL(data?.urlGoogleMap);
    if (data.boardingHouseId !== 0) {
      const canOpen = await Linking.canOpenURL(data?.urlGoogleMap);
      if (canOpen) {
        Linking.openURL(data?.urlGoogleMap);
      } else {
        Alert.alert("Tidak dapat membuka Google Maps");
      }
    }
  };
  const arViewClick = (panorama: string) => {
    if (data.boardingHouseId !== 0) {
      if (panorama) {
        router.push({
          pathname: "/ar-view",
          params: {
            panoramaPicture: panorama,
          },
        });
      } else {
        Alert.alert("Foto panorama tidak tersedia!");
      }
    }
  };

  const bookClick = () => {
    const onConfirm = async () =>
      await bookingBoarding(id, loadingBook, setLoadingBook, () =>
        setData({
          ...data,
          isBooked: true,
        })
      );

    if (data.boardingHouseId !== 0) {
      if (!data.isBooked) {
        const nextConfirm = () =>
          Alert.alert(
            "Konfirmasi",
            "Apakah anda yakin ingin melakukan booking?",
            [
              {
                text: "Tidak",
                style: "cancel",
              },
              { text: "Ya", onPress: onConfirm },
            ],
            { cancelable: true }
          );
        Alert.alert(
          "Peringatan",
          "Mohon menghubungi pemilik kos terlebih dahulu sebelum melakukan booking",
          [
            {
              text: "Tutup",
              style: "cancel",
            },
            { text: "Lanjut", onPress: nextConfirm },
          ]
        );
      } else {
        Alert.alert("Notifkasi", "Anda sudah melakukan booking");
      }
    }
  };

  const handleClickStar = (index: number) => {
    setForm({
      ...form,
      rating: index + 1,
    });
  };

  const afterSuccess = () => {
    setData({
      ...data,
      isReviewed: true,
    });
    fetchData(true);
  };

  const handleSeeReview = () => {
    router.push({
      pathname: "/list-review",
      params: {
        rating: data.averageRating,
        totalReview: data._count.reviews,
        reviews: JSON.stringify(data.reviews),
      },
    });
  };

  return (
    <View className="flex-1">
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {/* Gambar Background */}
        <View style={{ height: 300, position: "relative", zIndex: 1 }}>
          <Image
            width={Dimensions.get("window").width}
            height={400}
            source={
              data?.pictures[0]?.picture
                ? { uri: data?.pictures[0]?.picture }
                : DEFAULT_COST
            }
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              position: "absolute",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 32,
              right: 16,
              zIndex: 2,
            }}
            onPress={() => setIsImageOpen(true)}
          >
            <Ionicons name="image" color="white" size={24} />
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={
                data?.ownerPicture
                  ? {
                      uri: data?.ownerPicture,
                    }
                  : DEFAULT_PROFILE
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
            <ThemedText type="title" style={{ color: "white", marginTop: 8 }}>
              {data?.owner}
            </ThemedText>
            <ThemedText
              type="defaultSemiBold"
              className="font-bold"
              style={{ color: "white" }}
            >
              Owner
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                marginTop: 16,
                gap: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: C[1],
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={messageClick}
              >
                <Ionicons name="logo-whatsapp" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: C[1],
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={saveClick}
              >
                {loadingSave ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons
                    name={data?.isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color="white"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: C[1],
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={mapClick}
              >
                <Ionicons name="earth" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: C[1],
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setIsPanoramaOpen(true)}
              >
                <MaterialIcons name="360" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Konten Scrollable */}
        <View
          style={{
            marginTop: -20,
            zIndex: 2,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            elevation: 3,
            height: "auto",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <FlatList
            data={[{}]}
            contentContainerStyle={{ padding: 24 }}
            onRefresh={() => fetchData(true)}
            refreshing={fetching}
            renderItem={() => (
              <View>
                <View style={{ marginBottom: 24, gap: 8 }}>
                  <ThemedText type="sectionTitle">{data?.name}</ThemedText>
                  <ThemedText className="text-sm">
                    Tersedia: {data?.availableRoom} Kamar
                  </ThemedText>
                  <ThemedText>{data?.description}</ThemedText>
                </View>
                <View style={{ marginBottom: 24, gap: 8 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <ThemedText type="sectionTitle">Ulasan</ThemedText>
                      <Ionicons name="star" size={24} color="#fa9006" />
                      <ThemedText type="defaultSemiBold">
                        {data?.averageRating.toFixed(1)}
                      </ThemedText>
                      <ThemedText type="link">
                        ({data?._count.reviews})
                      </ThemedText>
                    </View>
                    {data?.reviews?.length === 0 ? (
                      <View>
                        <ThemedText type="link">Belum Ada Ulasan</ThemedText>
                      </View>
                    ) : (
                      <TouchableOpacity onPress={handleSeeReview}>
                        <ThemedText type="link">Lihat Semua</ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ paddingTop: 8 }}>
                    <FlatList
                      data={data?.reviews}
                      renderItem={({ item }) => (
                        <ListReview
                          comment={item.comment}
                          name={item?.user?.name}
                          rating={item.rating}
                          image={item?.user?.picture}
                          createdAt={item?.createdAt}
                        />
                      )}
                      keyExtractor={(item) => item.name}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 24, gap: 8 }}>
                  <ThemedText type="sectionTitle">Lokasi</ThemedText>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    }}
                    onPress={mapClick}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: "#e0e0e0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="location" size={24} color={C[1]} />
                    </View>
                    <View className="flex flex-col max-w-[80%]">
                      {data.boardingHouseId !== 0 && (
                        <ThemedText type="subtitle">
                          {data?.subdistrict}, {data?.district}
                        </ThemedText>
                      )}
                      <ThemedText type="default">{data?.location}</ThemedText>
                    </View>
                  </TouchableOpacity>
                </View>
                {!data?.isReviewed && data.boardingHouseId !== 0 && (
                  <View>
                    <ThemedText type="label">Beri Ulasan</ThemedText>
                    <View className="flex flex-row space-x-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Ionicons
                          key={index}
                          name="star"
                          size={24}
                          color={form.rating > index ? "#fa9006" : "#e0e0e0"}
                          onPress={() => handleClickStar(index)}
                        />
                      ))}
                    </View>
                    <CustomInputText
                      label=""
                      placeholder="Tulis ulasanmu disini"
                      multiline
                      numberOfLines={4}
                      onChangeText={(text) => {
                        setForm({ ...form, comment: text });
                      }}
                      value={form.comment || ""}
                    />
                    <TouchableOpacity
                      className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                      onPress={() =>
                        reviewBoarding(
                          form,
                          loadingReview,
                          setLoadingReview,
                          afterSuccess
                        )
                      }
                    >
                      {loadingReview ? (
                        <ActivityIndicator size="small" color={C[1]} />
                      ) : (
                        <Text className="text-sm text-custom-1 text-center">
                          Kirim
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                <View className="h-96" />
                <View className="h-20" />
              </View>
            )}
          />
        </View>

        {/* Footer */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            padding: 16,
            borderTopWidth: 1,
            borderColor: "#ddd",
            zIndex: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <ThemedText type="default">Harga</ThemedText>
            <ThemedText type="subtitle">{formatRupiah(data?.price)}</ThemedText>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: !data.isBooked ? C[1] : C[2],
              borderRadius: 8,
              paddingVertical: 12,
              width: "100%",
              alignItems: "center",
            }}
            onPress={bookClick}
          >
            <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
              {loadingBook ? (
                <ActivityIndicator color={"white"} />
              ) : !data.isBooked ? (
                "Booking Sekarang"
              ) : (
                "Anda Sudah Memesan"
              )}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <ModalShowImages
        title={data?.name}
        onClose={() => setIsImageOpen(false)}
        visible={isImageOpen}
        images={data?.pictures.map((item) => item.picture) || []}
      />
      <ModalPickPanorama
        visible={isPanoramaOpen}
        onClose={() => setIsPanoramaOpen(false)}
        panoramas={data?.panoramas}
        onItemClick={arViewClick}
      />
      <Toast />
    </View>
  );
};

interface ModalPickPanoramaProps {
  visible: boolean;
  onClose: () => void;
  panoramas: Panorama[];
  onItemClick?: (item: string) => void;
}

const ModalPickPanorama = ({
  visible,
  onClose,
  panoramas,
  onItemClick,
}: ModalPickPanoramaProps) => {
  if (panoramas.length === 0 || !visible) return null;
  return (
    <Pressable
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onPress={onClose}
    >
      <Pressable
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          width: "80%",
          maxHeight: "80%",
          paddingHorizontal: 16,
          paddingVertical: 24,
          alignSelf: "center",
        }}
        onPress={(e) => e.stopPropagation()}
      >
        <View className="flex flex-row justify-between">
          <ThemedText type="subtitle">Pilih Panorama</ThemedText>
          <TouchableOpacity style={{}} onPress={onClose} className="self-end">
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={panoramas}
          style={{ marginTop: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.panoramaId}
              onPress={() => onItemClick?.(item.panorama)}
            >
              <Image
                source={{ uri: item.panorama }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 8,
                  marginBottom: 16,
                  objectFit: "cover",
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.panoramaId.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </Pressable>
    </Pressable>
  );
};

export default DetailCostScreen;
