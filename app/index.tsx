import { APP_NAME } from "@/data/app";
import { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { checkAuth } from "@/services/account";

const IndexScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      checkAuth();
    });
  }, [fadeAnim]);

  return (
    <View className="w-full h-full bg-custom-1 flex items-center justify-center">
      <Animated.Text
        style={[
          { opacity: fadeAnim },
          {
            fontSize: 40,
            color: "white",
            fontFamily: "Outfit-Bold",
          },
        ]}
      >
        {APP_NAME}
      </Animated.Text>
    </View>
  );
};

export default IndexScreen;
