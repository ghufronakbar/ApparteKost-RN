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
} from "react-native";

const DetailCostScreen = () => {
  const handleClick = () => {
    Alert.alert("Coming Soon");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Gambar Background */}
      <View style={{ height: 300, position: "relative", zIndex: 1 }}>
        <Image
          source={DEFAULT_COST}
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
            source={DEFAULT_PROFILE}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
          <ThemedText type="title" style={{ color: "white", marginTop: 8 }}>
            Sarifuddin
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
            Pemilik
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
                backgroundColor: C[3],
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleClick}
            >
              <Ionicons name="chatbox-ellipses" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: C[3],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: C[3],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="earth" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: C[3],
                justifyContent: "center",
                alignItems: "center",
              }}
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
            <ThemedText type="sectionTitle">Kos Indehoy</ThemedText>
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
    name: "Aldo",
    rating: 4.8,
    comment:
      "Kos yang nyaman dan bersih. Fasilitasnya lengkap dan pemiliknya sangat ramah.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Rina",
    rating: 4,
    comment:
      "Tempat yang tenang untuk belajar dan istirahat. Harga sesuai dengan fasilitas.",
  },
  {
    name: "Dika",
    rating: 4,
    comment: "Kamar luas dan bersih, namun sinyal WiFi terkadang lambat.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Maya",
    rating: 5,
    comment:
      "Sangat puas dengan kos ini! Lingkungan aman dan nyaman, serta dekat dengan kampus.",
  },
  {
    name: "Yudi",
    rating: 3,
    comment: "Kos lumayan, namun fasilitas dapurnya perlu diperbarui.",
  },
  {
    name: "Santi",
    rating: 4,
    comment:
      "Kebersihan terjaga dengan baik dan terdapat parkir motor yang luas.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Rico",
    rating: 4,
    comment:
      "Harga cukup terjangkau dengan fasilitas AC dan air panas di kamar mandi.",
  },
  {
    name: "Wulan",
    rating: 4,
    comment:
      "Pemilik kos ramah dan membantu. Kamar nyaman dengan kasur dan lemari yang bagus.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Hendra",
    rating: 4,
    comment:
      "Lokasi strategis dekat dengan minimarket, namun kadang berisik saat malam.",
  },
  {
    name: "Tina",
    rating: 4,
    comment:
      "Suka dengan suasananya yang tenang, tetapi kamar mandi perlu lebih sering dibersihkan.",
    image: "https://via.placeholder.com/150",
  },
];

export default DetailCostScreen;
