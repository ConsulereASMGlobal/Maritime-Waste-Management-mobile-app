import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <View>
      <View
        style={
          {
            //   flexDirection: "row",
            //   justifyContent: "space-between",
            //   marginHorizontal: 2,
          }
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextBold>{t("How it Works")}</TextBold>
        </View>
        <Spacer spacing={10} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#FCF4E0",
            padding: 12,
            borderRadius: 8,
            paddingHorizontal: 25,
            borderColor: "#F9E5AD",
            borderWidth: 1,
          }}
        >
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <View
              style={{
                padding: 12,
                backgroundColor: colors.white,
                borderRadius: 100,
              }}
            >
              {CustomIcon("stepOneSVGIcon", 28)}
            </View>
            <View style={{ position: "absolute", right: -45, top: 15 }}>
              <DynamicIcon
                iconName="arrow-right"
                iconFamily="MaterialCommunityIcons"
                iconSize={24}
                iconColor={"#EAB308"}
              />
            </View>
            <Spacer spacing={5} />

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TextBold
                style={{ fontSize: 24, lineHeight: 32, color: "#EAB308" }}
              >
                01
              </TextBold>
              <TextField style={{ fontWeight: "600", fontSize: 12 }}>
                {t(`Collect\nPlastic`)}
              </TextField>
            </View>
          </View>
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <View
              style={{
                padding: 12,
                backgroundColor: colors.white,
                borderRadius: 100,
              }}
            >
              {CustomIcon("stepTwoSVGIcon", 28)}
            </View>
            <View style={{ position: "absolute", right: -45, top: 15 }}>
              <DynamicIcon
                iconName="arrow-right"
                iconFamily="MaterialCommunityIcons"
                iconSize={24}
                iconColor={"#EAB308"}
              />
            </View>
            <Spacer spacing={5} />

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TextBold
                style={{ fontSize: 24, lineHeight: 32, color: "#EAB308" }}
              >
                02
              </TextBold>
              <TextField style={{ fontWeight: "600", fontSize: 12 }}>
                {t(`Record\nWeight`)}
              </TextField>
            </View>
          </View>
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <View
              style={{
                padding: 12,
                backgroundColor: colors.white,
                borderRadius: 100,
              }}
            >
              {CustomIcon("stepThreeSVGIcon", 28)}
            </View>
            <Spacer spacing={5} />

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TextBold
                style={{ fontSize: 24, lineHeight: 32, color: "#EAB308" }}
              >
                03
              </TextBold>
              <TextField style={{ fontWeight: "600", fontSize: 12 }}>
                {t("Submit & get paid")}
              </TextField>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HowItWorks;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius: BORDER_RADIUS_SIZE,
    marginBottom: MEDIUM_PADDING_SIZE,
    padding: MEDIUM_PADDING_SIZE,
    marginHorizontal: 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
