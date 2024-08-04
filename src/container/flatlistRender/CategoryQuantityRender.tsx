import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FastImage } from "../../components/image";
import { colors } from "../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  screenWidth,
} from "../../globals/themes";
import { Spacer } from "../../components/common/Spacer";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";

interface CategoryQuantityRenderProps {
  item: any;
  onPress: () => void;
  index: number;
  _onChangeNumber: (text: string, type: string, index: number) => void;
}

export const CategoryQuantityRender = ({
  item,
  onPress,
  index,
  _onChangeNumber,
}: CategoryQuantityRenderProps) => {
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={onPress}
      // disabled={item.title !== 'Plastic'}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={{ uri: item?.icon }}
            style={styles.Icon}
            resizeMode={"contain"}
          />
        </View>
        <Spacer spacing={4} />
        <TextMedium style={styles.textTitle}>{item?.name}</TextMedium>
        {(item?.name === "PET" ||
          item?.name === "HDPE" ||
          item?.name === "PPE" ||
          item?.name === "LDPE" ||
          item?.name === "UBC") && (
          <View style={{ position: "absolute", top: -4, left: 30 }}>
            <TooltipComp
              children={
                <FastImage
                  source={
                    item?.name === "PET"
                      ? require("../../assets/tooltips/PET.png")
                      : item?.name === "HDPE"
                      ? require("../../assets/tooltips/HDPE.png")
                      : item?.name === "PPE"
                      ? require("../../assets/tooltips/PPE.png")
                      : item?.name === "LDPE"
                      ? require("../../assets/tooltips/LDPE.png")
                      : require("../../assets/tooltips/UBC.jpeg")
                  }
                  style={{ width: 225, height: 220 }}
                  resizeMode="contain"
                />
              }
              tooltipPosition={"top"}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        {item?.applicableDeal && (
          <FastImage
            source={require("../../assets/img/deal.png")}
            style={{ width: 60, height: 60 }}
          />
        )}

        <View
          style={{
            width: screenWidth / 4,
            alignItems: "center",
            backgroundColor: colors.primaryBG,
            height: 45,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <TextField
            style={{
              color: colors.primary,
              lineHeight: 30,
            }}
          >
            {item?.currency} {item?.price}/{item?.unit}
          </TextField>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    // height: 190,
    // width: screenWidth / 2.4,
    // justifyContent: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.white,
    borderColor: "#EDEDED",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  Icon: {
    height: 30,
    width: 30,
  },
  textTitle: {
    // marginTop: MEDIUM_PADDING_SIZE,
  },
});
