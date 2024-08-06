import { StyleSheet, View } from "react-native";
import React from "react";
import { TextField } from "../../components/TextField/TextField";
import { useTranslation } from "react-i18next";

export const ProfileDetails = ({ profileData }: any) => {
  const { t } = useTranslation();

  const details = [
    [t("Vessel Name"), profileData?.personalDetails?.name || "N/A"],
    [t("Vessel No."), profileData?.personalDetails?.mobile || "N/A"],
    [t("Email"), profileData?.personalDetails?.email || "N/A"],
    [t("Registered"), `${profileData?.address?.country}`],
  ];

  return (
    <View>
      {details?.map((item, index) => (
        <View key={index} style={styles.info}>
          <TextField style={styles.leftText} key={index}>
            {item[0]} :{" "}
          </TextField>
          <TextField style={styles.rightText}>{item[1]}</TextField>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    textAlign: "right",
  },
  leftText: {
    fontSize: 16,
    marginVertical: 1,
  },
  rightText: {
    fontWeight: "bold",
    width: "65%",
    textAlign: "right",
  },
});
