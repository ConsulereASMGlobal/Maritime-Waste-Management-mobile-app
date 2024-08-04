import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { ProfileAPI } from "@src/services/api";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const StreakContainer = () => {
  const [userPoint, setUserPoint] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      ProfileAPI.getPointHisotry().then((res) => {
        if (res?.data) {
          setUserPoint(res?.data?.data?.totalEarned);
        }
      });
    }
  }, [isFocused]);
  const { t } = useTranslation();

  return (
    <>
      <ImageBackground
        source={require("../../../assets/others/pointbanner.png")}
        resizeMode="contain"
        style={{
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 122,
          // paddingTop: 24,
          paddingHorizontal: 20,
        }}
      >
        <View style={{}}>
          <TextBold style={{ color: colors.white, lineHeight: 22 }}>
            {t("Your")}
          </TextBold>
          <TextField
            style={{
              fontSize: 18,
              width: "100%",
              color: colors.white,
              lineHeight: 32,
            }}
          >
            {t("Total Earning")}
          </TextField>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <TextBold
              style={{ color: colors.white, fontSize: 34, lineHeight: 38 }}
            >
              RM {userPoint}
            </TextBold>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default StreakContainer;

const styles = StyleSheet.create({});
