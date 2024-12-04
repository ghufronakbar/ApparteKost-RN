import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";

interface ModalShowImageProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

const ModalShowImages = ({
  visible,
  onClose,
  title,
  images,
}: ModalShowImageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setSelectedImage(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  if (images.length === 0) return null;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          <Pressable onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
          <AntDesign name="close" size={24} color="transparent" />
        </View>

        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, justifyContent: "center" }}>
              <Image
                source={{ uri: item }}
                style={{
                  width: "100%",
                  height: Dimensions.get("window").height * 0.6,
                  resizeMode: "contain",
                }}
              />
            </View>
          )}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: selectedImage === index ? "black" : "#ccc",
              }}
            />
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalShowImages;
