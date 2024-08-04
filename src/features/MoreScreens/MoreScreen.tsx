import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";
import { FastImage } from "@src/components/image";
import { persistor } from "@src/redux/store";
import { authActions } from "@src/redux/actions/combineAction";

import ContactSvgIcon from "@src/assets/MoreScreenIcons/ContactSVG";
import OrderSvgIcon from "@src/assets/MoreScreenIcons/OrderSvgIcon";
import DashboardSvg from "@src/assets/MoreScreenIcons/DashboardSvg";
import RecordsSvg from "@src/assets/MoreScreenIcons/RecordsSvg";
import PrivacySVGIcon from "@src/assets/MoreScreenIcons/PrivacySVG";
import FaqSVGIcon from "@src/assets/MoreScreenIcons/FaqSVG";
import ChangePasswordSVGIcon from "@src/assets/MoreScreenIcons/ChangePasswordSVG";
import SwitchLanguageSVGIcon from "@src/assets/MoreScreenIcons/SwitchLanguageSVGIcon";
import LogoutSVGIcon from "@src/assets/MoreScreenIcons/LogoutSVG";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { useDispatch } from "react-redux";

import { navigationRef } from "@src/navigation/navigationService";
import { routes } from "@src/navigation/routes";
import ProfileSvgIcon from "@src/assets/tabIcons/ProfileSvgIcon";
import CustomHeader from "@src/components/CustomHeader";
import { useTranslation } from "react-i18next";

const components: any = {
  dashboard: DashboardSvg,
  collect: OrderSvgIcon,
  report: RecordsSvg,
  contact: ContactSvgIcon,
  privacy: PrivacySVGIcon,
  faq: FaqSVGIcon,
  password: ChangePasswordSVGIcon,
  language: SwitchLanguageSVGIcon,
  logout: LogoutSVGIcon,
  profile: ProfileSvgIcon,
};
const CustomIcon = (iconName: any) => {
  const IconComponent = components[iconName];
  return <IconComponent color={colors.white} />;
};

export const MoreScreen = () => {
  let version = DeviceInfo.getVersion();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let initialOptions = [
    {
      id: 1,
      name: t("Profile"),
      icon: "profile",
      route: routes.more.profile,
    },
    {
      id: 4,
      name: t("Contact Us"),
      icon: "contact",
      route: routes.more.contactUs,
    },
    {
      id: 5,
      name: t("Privacy Policy"),
      icon: "privacy",
      route: routes.more.privacyPolicy,
    },
    {
      id: 6,
      name: t("FAQ"),
      icon: "faq",
      route: routes.more.faq,
    },
    {
      id: 7,
      name: t("Change Password"),
      icon: "password",
      route: routes.more.changePassword,
    },
    {
      id: 8,
      name: t("Switch Language"),
      icon: "language",
      route: routes.more.switchLanguage,
    },
  ];
  const [options, setOptions] = useState(initialOptions);

  return (
    <ScrollContainerLayout topBgColor={colors.secondary}>
      <Spacer spacing={10} />

      <CustomHeader title={t("More")} />

      <View style={{ paddingHorizontal: HALF_MEDIUM_PADDING_SIZE }}>
        <Spacer spacing={10} />
        <View style={{}}>
          {options.map((each) => (
            <Pressable
              style={styles.card}
              key={each?.id}
              onPress={() =>
                navigationRef.navigate("MoreStack", {
                  screen: each?.route,
                })
              }
            >
              <View style={styles.leftItem}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {each?.icon && CustomIcon(each?.icon)}
                </View>
                <TextField>{each?.name}</TextField>
              </View>
              <DynamicIcon
                iconFamily="AntDesign"
                iconName="arrowright"
                iconColor={colors.primaryLight}
              />
            </Pressable>
          ))}
        </View>
        <Pressable
          style={styles.card}
          onPress={() => {
            Alert.alert(t("Logout"), t("Do you want to logout?"), [
              {
                text: t("Cancel"),
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: t("OK"),
                onPress: () => {
                  persistor.purge();
                  dispatch(authActions.logout());
                },
                style: "destructive",
              },
            ]);
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {CustomIcon("logout")}
            </View>
            <TextField>{t("Logout")}</TextField>
          </View>
        </Pressable>
      </View>
      <Spacer spacing={10} />
      <View style={styles.detailBox}>
        <FastImage
          source={require("../../assets/others/poweredbyasm.png")}
          resizeMode="contain"
          style={styles.poweredby}
        />
        <TextField style={styles.versionTxt}>
          {t("Version")} {version}
        </TextField>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    borderRadius: BORDER_RADIUS_SIZE,
    alignItems: "center",
    margin: 10,
    gap: 10,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  leftItem: { flexDirection: "row", gap: 10, alignItems: "center" },
  poweredby: {
    height: 30,
    width: 170,
  },
  detailBox: {
    alignItems: "center",
    gap: 5,
  },
  versionTxt: { fontSize: 14 },
});
