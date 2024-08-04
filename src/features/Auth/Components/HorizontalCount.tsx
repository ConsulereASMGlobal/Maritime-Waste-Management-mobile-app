import { StyleSheet, View } from "react-native";
import React from "react";
import { TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE } from "@src/globals/themes";

const HorizontalCount = ({ text }) => {
  const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {list?.map((item) => (
        <>
          <View
            style={{
              borderRadius: 32,
              backgroundColor:
                item?.id === text ? colors.primary : colors.white,
              borderColor: colors.primary,
              borderWidth: 1,
              width: 28,

              height: 28,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              style={{
                fontSize: 14,
                color: item?.id !== text ? colors.primary : colors.white,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              {item.id}
            </TextField>
          </View>
          {item.id !== list.length && (
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 5,
                height: 1,
                borderRadius: BORDER_RADIUS_SIZE,
                backgroundColor: colors.light,
                justifyContent: "center",
              }}
            />
          )}
        </>
      ))}
    </View>
  );
};

export default HorizontalCount;

const styles = StyleSheet.create({});
