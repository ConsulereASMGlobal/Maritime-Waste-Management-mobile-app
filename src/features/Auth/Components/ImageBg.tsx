import { StyleSheet, View } from "react-native";
import React from "react";
import { FastImage } from "@src/components/image";
import { screenHeight, screenWidth } from "@src/globals/themes";

const ImageBg = () => {
  return (
    <View>
      <FastImage
        source={require("../../../assets/authIcons/backgroundimage.png")}
        style={{
          width: screenWidth,
          height: screenHeight,
          position: "absolute",
        }}
      />
    </View>
  );
};

export default ImageBg;

const styles = StyleSheet.create({});
