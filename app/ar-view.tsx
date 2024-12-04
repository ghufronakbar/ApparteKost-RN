import React from "react";
import { WebView } from "react-native-webview";
import { Dimensions, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { C } from "@/constants/Colors";

const PanoramaScreen = () => {
  const { panoramaPicture } = useLocalSearchParams() as {
    panoramaPicture: string;
  };
  const HTMLContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css" />
      <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        #panorama { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="panorama"></div>
      <iframe width="600" height="400" allowfullscreen style="border-style:none;" src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https%3A//www.pixart360.com/w/wp-content/uploads/2019/09/360degreeCamera.jpg"></iframe>
      <script>
        pannellum.viewer('panorama', {
          type: 'equirectangular',
          panorama: '${panoramaPicture}',
          autoLoad: true,
          autoRotate: -2,
          showControls: true,
          compass: true,
          pitch: 10,
          yaw: 180,
          hfov: 110,
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
        pointerEvents="box-none"
      >
        <MaterialIcons name="360" size={46} color={C[1]} />
      </View>
      <WebView
        style={{ flex: 1, zIndex: 0 }}
        originWhitelist={["*"]}
        source={{ html: HTMLContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};
export default PanoramaScreen;
