import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "@src/globals/colors";
import { TextField } from "@src/components/TextField/TextField";
import { navigate } from "@src/navigation/navigationService";
import { routes } from "@src/navigation/routes";
import LottieView from "lottie-react-native";
import { MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { useTranslation } from "react-i18next";

const ViewMap = ({ text, btnTxt = "View Map", userType }: any) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={{}}
      onPress={() =>
        userType === "CUSTOMER"
          ? navigate("deals")
          : navigate(t(routes.bottomTabs.map))
      }
    >
      <View
        style={{
          backgroundColor: colors.shaded,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
          alignItems: "center",
          paddingHorizontal: MEDIUM_PADDING_SIZE + MEDIUM_PADDING_SIZE / 2,
          gap: !btnTxt ? 12 : 0,
        }}
      >
        {userType === "CUSTOMER" && (
          <LottieView
            source={require("../../../assets/gifs/mic.json")}
            style={{ width: "15%", height: "100%" }}
            autoPlay
            loop
          />
        )}
        {userType !== "CUSTOMER" && (
          <LottieView
            source={require("../../../assets/gifs/search.json")}
            style={{ width: "8%", height: "100%" }}
            autoPlay
            loop
          />
        )}
        <View style={{ width: userType !== "CUSTOMER" ? "65%" : "90%" }}>
          <TextField
            style={{
              fontSize: 14,
              width: "90%",
              fontWeight: "600",
              color: colors.neutral,
              textAlign: !btnTxt ? "right" : "left",
            }}
          >
            {text}
          </TextField>
        </View>
        <TextField
          style={{ fontSize: 14, color: colors.primary, fontWeight: "600" }}
        >
          {btnTxt}
        </TextField>
      </View>
    </TouchableOpacity>
  );
};

export default ViewMap;

const styles = StyleSheet.create({});
