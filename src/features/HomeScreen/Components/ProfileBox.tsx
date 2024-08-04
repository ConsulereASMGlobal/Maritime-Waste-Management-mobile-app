import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { useSelector } from "react-redux";
import { selectNotificationCount, selectProfile } from "@src/redux/selectors";
import { FastImage } from "@src/components/image";
import { HeaderRight } from "../../../navigation/AuthStack";
import Bell from "../../../assets/others/bell.svg";
import { routes } from "@src/navigation/routes";
import { colors } from "@src/globals/colors";
import { useNavigation } from "@react-navigation/native";
import {
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import GradientBackground from "@src/components/GradientBackground";
import { useTranslation } from "react-i18next";

const ProfileBox = () => {
  const profileData = useSelector(selectProfile);
  const notificationCount = useSelector(selectNotificationCount);
  const navigation = useNavigation<any>();

  const { t } = useTranslation();

  return (
    <>
      <GradientBackground>
        <SafeAreaView style={{ flex: 0 }} />
      </GradientBackground>
      <SafeAreaView>
        <GradientBackground>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor: colors.primary,
              paddingHorizontal: REGULAR_PADDING_SIZE,
              paddingVertical: MEDIUM_PADDING_SIZE,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
            >
              {profileData?.kycDocument &&
              profileData?.kycDocument[1]?.docUrl ? (
                <View>
                  <FastImage
                    source={{ uri: profileData?.kycDocument[1]?.docUrl }}
                    style={{ width: 48, height: 48, borderRadius: 100 }}
                  />
                </View>
              ) : (
                <View>
                  <FastImage
                    source={require("../../../assets/others/userProfile.png")}
                    style={{ width: 48, height: 48, borderRadius: 100 }}
                  />
                </View>
              )}
              <View>
                <TextField style={{ color: colors.white, fontSize: 12 }}>
                  {t("Welcome")}
                </TextField>
                {profileData?.personalDetails?.name && (
                  <TextBold style={{ color: colors.white }}>
                    {profileData?.personalDetails?.name.split(" ")[0]}
                  </TextBold>
                )}
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.notificaion.list)}
              >
                <Bell height={27} width={27} fill={colors.white} />
                {notificationCount > 0 && (
                  <View style={styles.bellBadge}>
                    <TextField style={styles.bellBadgeText}>
                      {notificationCount}
                    </TextField>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </GradientBackground>
      </SafeAreaView>
    </>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  bellBadge: {
    position: "absolute",
    backgroundColor: colors.yellow,
    height: 20,
    width: 20,
    borderRadius: 50,
    top: -8,
    left: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  bellBadgeText: {
    color: colors.primary,
    fontSize: 10,
  },
});
