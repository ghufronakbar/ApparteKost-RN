import { DEFAULT_COST, DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import ListReview from "@/components/ui/ListReview";
import { C } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
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
} from "react-native";
import { StaticCollage } from "@qeepsake/react-native-images-collage";
import { useEffect, useState } from "react";
import {
  bookingBoarding,
  bookmarkBoarding,
  FormReviewBoarding,
  getBoardingDetail,
  initFormReviewBoarding,
  reviewBoarding,
} from "@/services/boarding";
import { initResboardingDetail, ResBoardingDetail } from "@/models/ResBoarding";
import formatRupiah from "@/utils/formatRupiah";
import Toast from "react-native-toast-message";

const DetailCostScreen = () => {
  const [data, setData] = useState<ResBoardingDetail>(initResboardingDetail);
  const [pictures, setPictures] = useState<string[]>([]);
  const [form, setForm] = useState<FormReviewBoarding>(initFormReviewBoarding);
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);

  const { id } = useLocalSearchParams() as { id: string };

  const fetchData = async () => {
    const res = await getBoardingDetail(id);
    if (res) {
      setData(res);
      setForm({ ...form, boardingHouseId: Number(id) });
      for (const picture of res.pictures) {
        setPictures([picture.picture]);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const messageClick = async () => {
    if (data.boardingHouseId !== 0) {
      const canOpen = await Linking.canOpenURL(data.urlWhatsapp);
      if (canOpen) {
        Linking.openURL(`https://wa.me/${data?.phone}`);
      } else {
        Alert.alert("Tidak dapat membuka WhatsApp");
      }
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
    if (data.boardingHouseId !== 0) {
      const canOpen = await Linking.canOpenURL(data?.urlGoogleMap);
      if (canOpen) {
        Linking.openURL(data?.urlGoogleMap);
      } else {
        Alert.alert("Tidak dapat membuka Google Maps");
      }
    }
  };
  const arViewClick = () => {
    if (data.boardingHouseId !== 0) {
      if (data.panoramaPicture !== null) {
        router.push({
          pathname: "/ar-view",
          params: {
            panoramaPicture: data.panoramaPicture,
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

  const matrix = (): number[] => {
    const length = pictures.length;
    const isOdd = length % 2 !== 0;

    if (isOdd && length > 5) {
      const resultLength = Math.ceil(length / 2);
      const result = Array.from({ length: resultLength }, () => 2);
      const middleIndex = Math.floor(resultLength / 2);
      result[middleIndex] = 1;
      return result;
    } else if (!isOdd && length > 5) {
      const resultLength = length / 2;
      const result = Array.from({ length: resultLength }, () => 2);
      return result;
    } else {
      return Array.from({ length: length }, () => 1);
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
    fetchData();
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
    <>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {/* Gambar Background */}
        <View style={{ height: 300, position: "relative", zIndex: 1 }}>
          <StaticCollage
            width={Dimensions.get("window").width}
            height={400}
            images={pictures}
            matrix={matrix()}
            spacing={0}
            panningLeftPadding={0}
            panningRightPadding={0}
            panningTopPadding={0}
            panningBottomPadding={0}
            separatorStyle={{
              width: 0,
              height: 0,
              margin: 0,
              padding: 0,
              border: 0,
            }}
            containerStyle={{
              width: "100%",
              height: "100%",
              margin: 0,
              padding: 0,
              border: 0,
            }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              position: "absolute",
            }}
          />
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
                <Ionicons name="chatbox-ellipses" size={24} color="white" />
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
                onPress={arViewClick}
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
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={{ marginBottom: 24, gap: 8 }}>
              <ThemedText type="sectionTitle">{data?.name}</ThemedText>
              <ThemedText className="text-sm">Tersedia: 2 Kamar</ThemedText>
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
                    {data?.averageRating}
                  </ThemedText>
                  <ThemedText type="link">({data?._count.reviews})</ThemedText>
                </View>
                <TouchableOpacity onPress={() => handleSeeReview()}>
                  <ThemedText type="link">Lihat Semua</ThemedText>
                </TouchableOpacity>
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
                <View>
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
                    setForm({ ...form, review: text });
                  }}
                  value={form.review || ""}
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
          </ScrollView>
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
              backgroundColor: data.booking === null ? C[1] : C[2],
              borderRadius: 8,
              paddingVertical: 12,
              width: "100%",
              alignItems: "center",
            }}
            onPress={bookClick}
          >
            <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
              {!data.isBooked ? "Booking Sekarang" : "Anda Sudah Memesan"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </>
  );
};

export default DetailCostScreen;
