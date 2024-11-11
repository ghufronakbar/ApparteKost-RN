import { DEFAULT_COST, DEFAULT_IMAGE, DEFAULT_PROFILE } from "@/assets";
import { ThemedText } from "@/components/ThemedText";
import { CustomInputText } from "@/components/ui/CustomInputText";
import ListReview from "@/components/ui/ListReview";
import { C } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { StaticCollage } from "@qeepsake/react-native-images-collage";

const DetailCostScreen = () => {
  const messageClick = () => {
    Alert.alert("Coming Soon");
  };
  const saveClick = () => {
    Alert.alert("Coming Soon");
  };
  const mapClick = () => {
    Alert.alert("Coming Soon");
  };
  const arViewClick = () => {
    router.push("/ar-view");
  };

  const pictures = [
    "https://pennyu.co.id/wp-content/uploads/2023/04/Kost-mahasiswa-jpg.webp",
    "https://www.99.co/id/panduan/wp-content/uploads/2022/11/peraturan-kos-kosan-1000x630.jpg",
    "https://storage.googleapis.com/storage-ajaib-prd-platform-wp-artifact/2020/10/Kos-kosan.jpg",
    "https://homesyariah.com/wp-content/uploads/2020/12/www.homesyariah.com-rumah-kos-Grand_Royal_Radar_Baru-004.jpg",
    "https://cdn1-production-images-kly.akamaized.net/0q-sddESXGDpLdVz4IXelsZAW24=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/861628/original/073424800_1429960385-3.JPG",
    "https://kontainerindonesia.co.id/blog/wp-content/uploads/2024/06/Kos-Kosan-dari-Kontainer.jpg",
  ];
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
      console.log({ length, result });
      return result;
    } else {
      return Array.from({ length: length }, () => 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Gambar Background */}
      <View style={{ height: 300, position: "relative", zIndex: 1 }}>
        {/* <Image
          source={DEFAULT_COST}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            position: "absolute",
          }}
        /> */}
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
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/640px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
          <ThemedText type="title" style={{ color: "white", marginTop: 8 }}>
            Sarifuddin
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
              <Ionicons name="bookmark-outline" size={24} color="white" />
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
            <ThemedText type="sectionTitle">Kos Damai</ThemedText>
            <ThemedText className="text-sm">Tersedia: 2 Kamar</ThemedText>
            <ThemedText>
              Kos ini menawarkan keindahan alam dan keindahan hidupnya. Kos ini
              memiliki fasilitas yang lengkap dan cocok untuk para penghuni.
            </ThemedText>
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
                <ThemedText type="defaultSemiBold">4.9</ThemedText>
                <ThemedText type="link">(155)</ThemedText>
              </View>
              <TouchableOpacity onPress={() => router.push("/list-review")}>
                <ThemedText type="link">Lihat Semua</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 8 }}>
              <FlatList
                data={LIST_REVIEWS}
                renderItem={({ item }) => (
                  <ListReview
                    comment={item.comment}
                    name={item.name}
                    rating={item.rating}
                    image={item.image}
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
                <ThemedText type="subtitle">Sleman, Yogyakarta</ThemedText>
                <ThemedText type="default">Jalan Abogoboga</ThemedText>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <CustomInputText
              label="Beri Ulasan"
              placeholder="Tulis ulasanmu disini"
              multiline
              numberOfLines={4}
              onChangeText={() => {}}
              value=""
            />
            <TouchableOpacity className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2">
              <Text className="text-sm text-custom-1 text-center">Kirim</Text>
            </TouchableOpacity>
          </View>
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
          <ThemedText type="subtitle">Rp. 1.000.000</ThemedText>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: C[1],
            borderRadius: 8,
            paddingVertical: 12,
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => Alert.alert("Booking Sekarang")}
        >
          <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
            Booking Sekarang
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LIST_REVIEWS = [
  {
    name: "Abi Pamungkas",
    rating: 4,
    comment:
      "Kos yang nyaman dan bersih. Fasilitasnya lengkap dan pemiliknya sangat ramah.",
    isDeletable: true,
  },
  {
    name: "Aldo",
    rating: 4.8,
    comment:
      "Kos yang nyaman dan bersih. Fasilitasnya lengkap dan pemiliknya sangat ramah.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg",
  },
  {
    name: "Bekti",
    rating: 4,
    comment:
      "Tempat yang tenang untuk belajar dan istirahat. Harga sesuai dengan fasilitas.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg",
  },
  {
    name: "Maharani",
    rating: 4,
    comment: "Kamar luas dan bersih, namun sinyal WiFi terkadang lambat.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/640px-Kamala_Harris_Vice_Presidential_Portrait.jpg",
  },
  {
    name: "Martin",
    rating: 5,
    comment:
      "Sangat puas dengan kos ini! Lingkungan aman dan nyaman, serta dekat dengan kampus.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/640px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
  },
];

export default DetailCostScreen;
