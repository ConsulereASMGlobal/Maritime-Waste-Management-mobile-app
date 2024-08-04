import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { FastImage } from "@src/components/image";
import { useTranslation } from "react-i18next";

const KYCDocument = ({ profileData }: any) => {
  // const details = [
  //   ["Account Holder Name", profileData?.bankDetails?.accountName || "N/A"],
  //   ["Bank Name", profileData?.bankDetails?.bankName || "N/A"],
  //   ["Bank Account No.", profileData?.bankDetails?.accountNo || "N/A"],
  // ];
  const [show, setShow] = useState(false);
  const userType = profileData?.userType;

  const { t } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: colors.white,
        top: -100,
        marginHorizontal: 15,
        borderRadius: 16,
        elevation: 2,
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          // alignItems: "flex-end",
          justifyContent: "center",
          // gap: 5,
        }}
      >
        <TextBold style={{ textAlign: "center" }}>{t("KYC Document")}</TextBold>

        {profileData?.kycDocument[0]?.docType === "POE" && (
          <Pressable
            onPress={() => setShow(!show)}
            style={{ position: "absolute", right: 25 }}
          >
            <DynamicIcon
              iconFamily="Feather"
              iconName={show ? "eye" : "eye-off"}
            />
          </Pressable>
        )}
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors.shaded,
          backgroundColor: colors.shaded,
          width: "90%",
          paddingHorizontal: 30,
          marginVertical: 5,
        }}
      />

      <View
        style={{
          paddingHorizontal: REGULAR_PADDING_SIZE,
          justifyContent: "center",
        }}
      >
        <View style={styles.info}>
          <TextField style={styles.leftText}>{t("NRIC No.")}</TextField>
          <View
            style={{
              width: "53%",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 5,
            }}
          >
            <TextField style={styles.rightText}>
              {profileData?.kycDocument[0]?.docType === "POE"
                ? show
                  ? profileData?.kycDocument[0]?.docNumber
                  : profileData?.kycDocument[0]?.docNumber.replace(/./g, "X")
                : profileData?.kycDocument[0]?.docNumber}
            </TextField>
            {/* {profileData?.kycDocument[0]?.docType === "POE" && (
              <Pressable onPress={() => setShow(!show)}>
                <DynamicIcon
                  iconFamily="Feather"
                  iconName={show ? "eye" : "eye-off"}
                />
              </Pressable>
            )} */}
          </View>
        </View>

        <View style={styles.info}>
          <TextField style={styles.leftText}>{t("Document")}</TextField>
          <View
            style={{
              width: "53%",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 5,
            }}
          >
            {show && (
              <FastImage
                source={{ uri: profileData?.kycDocument[0]?.docUrl }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 8,
                  // opacity: show ? 1 : 0.09,
                }}
              />
            )}
            {/* {profileData?.kycDocument[0]?.docType === "POE" && (
              <Pressable onPress={() => setShow(!show)}>
                <DynamicIcon
                  iconFamily="Feather"
                  iconName={show ? "eye" : "eye-off"}
                />
              </Pressable>
            )} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default KYCDocument;

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    // textAlign: "right",
  },
  leftText: {
    fontSize: 16,
    marginVertical: 1,
    width: "47%",
  },
  rightText: {
    fontWeight: "bold",
    // width: "50%",
    textAlign: "right",
  },
});
