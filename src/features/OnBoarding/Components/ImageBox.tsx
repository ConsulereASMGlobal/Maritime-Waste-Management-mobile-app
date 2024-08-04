import { StyleSheet, View } from "react-native";
import React from "react";
import { Spacer } from "@src/components/common/Spacer";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";

const ImageBox = ({ iconName }: any) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spacer spacing={20} />
      {CustomIcon(iconName)}
      <Spacer spacing={40} />
    </View>
  );
};

export default ImageBox;

const styles = StyleSheet.create({});
