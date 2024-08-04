import React from "react";
import { Text, View } from "react-native";
import { colors } from "../globals/colors";
import { useTranslation } from "react-i18next";

export const NoDataView = ({ message = "No Data To Display" }) => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.gray, fontSize: 14 }}>{t(message)}</Text>
    </View>
  );
};
