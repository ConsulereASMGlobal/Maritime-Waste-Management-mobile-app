import { StyleSheet, View } from "react-native";
import React from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import InfoSVG from "@src/assets/dashboardIcons/InfoSVG";
import { colors } from "@src/globals/colors";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { screenHeight, screenWidth } from "@src/globals/themes";

const InfoContainer = () => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: colors.shaded,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        overflow: "hidden",
        paddingBottom: 7,
      }}
    >
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          // justifyContent: "flex-end",
          // flex: 1,
        }}
      >
        <LottieView
          source={require("../../../assets/gifs/infoBG.json")}
          style={{
            height: "100%",
            width: "100%",
          }}
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingLeft: 15,
          width: "50%",
          flex: 1,
        }}
      >
        <TextBold style={{ color: "white" }}>{t("Make an Impact")}</TextBold>
        <TextField style={{ fontSize: 14, color: "white" }}>
          {t(
            "Let us collaborate to improve collection and recycling rates for a greener, cleaner Malaysia and sustainable future."
          )}
        </TextField>
      </View>
      <View style={{ alignItems: "center", paddingRight: 5 }}>
        <InfoSVG />
      </View>
    </View>
  );
};

export default InfoContainer;

const styles = StyleSheet.create({});
