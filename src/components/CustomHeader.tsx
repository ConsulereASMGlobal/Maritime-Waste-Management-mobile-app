import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextBold, TextField } from "./TextField/TextField";
import { colors } from "@src/globals/colors";

const CustomHeader = ({ title }: any) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TextBold style={{ fontSize: 18, color: colors.dark }}>{title}</TextBold>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
