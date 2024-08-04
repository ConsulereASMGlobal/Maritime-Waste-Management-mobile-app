import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { Spacer } from "@src/components/common/Spacer";

const AutoTextField = ({ title, value }: { title?: any; value?: any }) => {
  return (
    <View>
      <TextField
        style={{
          color: colors.darkLight,
          paddingBottom: 5,
          fontSize: 14,
        }}
      >
        {title}
      </TextField>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          height: 50,
          paddingHorizontal: 10,
          borderColor: colors.placholderColor,
          justifyContent: "center",
        }}
      >
        <TextField
          style={{
            color: colors.placholderColor,
            marginBottom: -5,
          }}
        >
          {value}
        </TextField>
      </View>
      <Spacer spacing={5} />
    </View>
  );
};

export default AutoTextField;

const styles = StyleSheet.create({});
