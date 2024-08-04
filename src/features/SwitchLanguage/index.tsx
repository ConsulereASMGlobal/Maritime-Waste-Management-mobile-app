import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Spacer } from "../../components/common/Spacer";
import { colors } from "../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../globals/themes";
import { useTranslation } from "react-i18next";
import { TextField } from "../../components/TextField/TextField";
import i18next from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DynamicIcon } from "../../utils/Dynamic/DynamicIcon";
import { useNavigation } from "@react-navigation/native";
import { routes } from "@src/navigation/routes";

export const SwitchLanguage = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [selectedLng, setSelectedLng] = useState();
  const changeLng = async (lng) => {
    i18next.changeLanguage(lng);
    await AsyncStorage.setItem("storedLng", lng);
    setSelectedLng(lng);
    navigation.navigate(t("Home"));
  };
  const checkLanguage = async () => {
    let Customlng = await AsyncStorage.getItem("storedLng");
    setSelectedLng(Customlng);
  };
  useEffect(() => {
    checkLanguage();
  }, []);
  console.log(selectedLng, "--0000--");

  console.log(!selectedLng);
  const lngList = [
    { id: 1, name: "English (EN)", value: "en" },
    { id: 2, name: "Malay (MS)", value: "ms" },
    { id: 3, name: "Chinese (ZH)", value: "zh" },
  ];
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <Spacer spacing={20} />
        {lngList.map((item) => (
          <>
            <TouchableOpacity
              style={[
                styles.languageButton,
                {
                  backgroundColor:
                    selectedLng === item?.value ||
                    (!selectedLng && item?.value === "en")
                      ? colors.primary
                      : colors.white,
                },
              ]}
              onPress={() => changeLng(item?.value)}
            >
              <TextField
                style={{
                  fontWeight: "700",
                  color:
                    selectedLng === item?.value ||
                    (!selectedLng && item?.value === "en")
                      ? colors.white
                      : colors.primary,
                }}
              >
                {item?.name}
              </TextField>
              {(selectedLng === item?.value ||
                (!selectedLng && item?.value === "en")) && (
                <DynamicIcon
                  iconName="checkcircle"
                  iconFamily="AntDesign"
                  iconColor={colors.white}
                />
              )}
            </TouchableOpacity>
            <Spacer spacing={10} />
          </>
        ))}
        <Spacer spacing={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderColor: colors.grayTwo,
    color: colors.neutral_dark,
    backgroundColor: colors.white,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: MEDIUM_PADDING_SIZE,
    shadowColor: "#F0FFFFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mainContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },

  rootContainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
});
