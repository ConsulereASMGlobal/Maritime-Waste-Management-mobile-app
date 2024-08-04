import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { useTranslation } from "react-i18next";

const BankDetails = ({ profileData }: any) => {
  const { t } = useTranslation();

  const details = [
    [t("Name"), profileData?.bankDetails?.accountName || "N/A"],
    [t("Bank Name"), profileData?.bankDetails?.bankName || "N/A"],
    [t("Account No."), profileData?.bankDetails?.accountNo || "N/A"],
  ];
  const [show, setShow] = useState(false);
  return (
    <>
      {profileData?.bankDetails?.accountName ? (
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
          <TextBold>{t("Bank Details")}</TextBold>
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
            {details?.map((item, index) => (
              <View key={index} style={styles.info}>
                <TextField style={styles.leftText} key={index}>
                  {item[0]} :{" "}
                </TextField>
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
                    {item[0] === "Account No."
                      ? show
                        ? item[1]
                        : item[1].replace(/./g, "X")
                      : item[1]}
                  </TextField>
                  {item[0] === "Account No." && (
                    <Pressable onPress={() => setShow(!show)}>
                      <DynamicIcon
                        iconFamily="Feather"
                        iconName={show ? "eye" : "eye-off"}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default BankDetails;

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
