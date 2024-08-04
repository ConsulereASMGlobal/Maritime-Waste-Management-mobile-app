import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";

const MainWrapper = ({ children }: any) => {
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: REGULAR_PADDING_SIZE,
      }}
    >
      {children}
    </View>
  );
};

export default MainWrapper;

const styles = StyleSheet.create({});
