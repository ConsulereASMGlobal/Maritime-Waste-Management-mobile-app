import { StyleSheet, View } from "react-native";
import React from "react";
import { Spacer } from "@src/components/common/Spacer";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";

interface props {
  title?: string;
  desc?: string;
  titleSize?: any;
}

export default function TitleLogoView({
  title = "Login",
  desc = `Let's sign in and continue the journey to a greener tomorrow!`,
  titleSize = 32,
}: props) {
  return (
    <View
      style={{
        alignItems: "flex-start",
        marginHorizontal: REGULAR_PADDING_SIZE + REGULAR_PADDING_SIZE / 2,
      }}
    >
      <Spacer spacing={15} />
      <TextBold style={[styles.title, { fontSize: titleSize }]}>
        {title}
      </TextBold>
      <Spacer spacing={5} />

      <TextField style={styles.subtitle}>{desc}</TextField>
      <Spacer spacing={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.white,
  },
  subtitle: {
    color: colors.white,
    // textAlign: "center",
  },
});
