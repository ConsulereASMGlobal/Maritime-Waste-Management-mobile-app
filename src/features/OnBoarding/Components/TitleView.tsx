import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Spacer } from "@src/components/common/Spacer";
import { colors } from "@src/globals/colors";
import { TextBold, TextField } from "@src/components/TextField/TextField";
interface titleProps {
  heading?: string;
  subHeading?: string;
}
const TitleView = ({ heading, subHeading }: titleProps) => {
  return (
    <View>
      <Spacer spacing={20} />
      {heading && (
        <>
          <TextBold
            style={{
              fontSize: 24,
              lineHeight: 36,
              color: colors.blue,
            }}
          >
            {heading}
          </TextBold>
          <Spacer spacing={5} />
        </>
      )}
      {subHeading && (
        <TextField
          style={{
            textAlign: "left",
            lineHeight: 24,
            color: colors.shadedBlue,
          }}
        >
          {subHeading}
        </TextField>
      )}
    </View>
  );
};

export default TitleView;

const styles = StyleSheet.create({});
