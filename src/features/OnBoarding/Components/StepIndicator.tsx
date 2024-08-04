import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "@src/globals/colors";

interface stepProps {
  step?: string;
}
const StepIndicator = ({ step }: stepProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          height: 4,
          width: 20,
          borderRadius: 16,
          backgroundColor:
            step === "one" ? colors.primary : colors.primaryLight,
        }}
      />
      <View
        style={{
          height: 4,
          width: 20,
          borderRadius: 16,
          backgroundColor:
            step === "two" ? colors.primary : colors.primaryLight,
        }}
      />
      <View
        style={{
          height: 4,
          width: 20,
          borderRadius: 16,
          backgroundColor:
            step === "three" ? colors.primary : colors.primaryLight,
        }}
      />
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({});
