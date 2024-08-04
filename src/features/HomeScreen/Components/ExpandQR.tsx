import { StyleSheet, View } from "react-native";
import React from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import InfoSVG from "@src/assets/dashboardIcons/InfoSVG";
import { colors } from "@src/globals/colors";
import StreakSVG from "@src/assets/dashboardIcons/StreakSVG";
import QRCode from "react-native-qrcode-svg";
import { Spacer } from "@src/components/common/Spacer";
import Button from "@src/components/Button/Button";
import { useSelector } from "react-redux";
import { selectProfile } from "@src/redux/selectors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { routes } from "@src/navigation/routes";
import { useNavigation } from "@react-navigation/native";

const ExpandQR = () => {
  const profileData = useSelector(selectProfile);
  const navigation = useNavigation();
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <TextField
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {profileData?.personalDetails?.name.trim()}USER NAME
        </TextField>
        <Spacer spacing={10} />
        <View
          style={{
            backgroundColor: colors.primaryBG,
            padding: 12,
            borderRadius: 8,
          }}
        >
          <QRCode
            size={260}
            logo={require("../../../assets/logo/appicon.png")}
            logoBackgroundColor={colors.white}
            value={JSON.stringify({
              id: profileData?.id,
              name: profileData?.personalDetails?.name,
              mobile: profileData?.personalDetails?.mobile,
              userType: profileData?.userType,
            })}
          />
        </View>
        <Spacer spacing={10} />
        <TextField style={{ fontWeight: "bold" }}>
          Mobile :{" "}
          <TextField style={{ fontWeight: "bold" }}>
            {profileData?.address?.countryCode &&
              "+" + profileData?.address?.countryCode + " "}{" "}
            9842484002
          </TextField>
          {profileData?.personalDetails?.mobile}
        </TextField>
        <Spacer spacing={5} />

        <Spacer spacing={15} />
      </View>
    </>
  );
};

export default ExpandQR;

const styles = StyleSheet.create({});
