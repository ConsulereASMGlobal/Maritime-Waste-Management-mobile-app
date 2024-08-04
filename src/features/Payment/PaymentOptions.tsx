import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { colors } from "../../globals/colors";

import {
  Fonts,
  REGULAR_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
} from "../../globals/themes";
import { TextField } from "../../components/TextField/TextField";
import { globalStyle } from "../../globals/globalStyles";
import { Spacer } from "../../components/common/Spacer";
import FastImage from "react-native-fast-image";
import Button from "../../components/Button/Button";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { useTranslation } from "react-i18next";

interface PaymentOptionProps {
  onRequestClose: () => void;
  bottomContent?: React.ReactNode;
  setPayment: React.Dispatch<React.SetStateAction<string>>;
  handlePayement?: any;
  loading?: any;
}

export default function PaymentOption({
  handlePayement,
  bottomContent = <></>,
  setPayment,
  onRequestClose,
  loading,
}: PaymentOptionProps) {
  const [selectedItem, setSelectedItem] = useState(1);
  const save = () => {
    handlePayement(selectedItem === 1 ? "WALLET" : "BANK");
  };
  const { t } = useTranslation();

  return (
    <View style={styles.modalContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextField
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("Choose the payment mode")}
          </TextField>
          <Pressable
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={onRequestClose}
          >
            <DynamicIcon
              iconName="close"
              iconSize={30}
              iconColor={colors.dark}
            />
          </Pressable>
          <Spacer spacing={9} />
          <View style={globalStyle.row}>
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(1);
                setPayment("WALLET");
              }}
              style={{
                ...styles.iconButton,
                borderColor:
                  selectedItem == 1 ? colors.primary : colors.borderColor,
              }}
            >
              {/* <Image
                source={require("../../assets/payment/online.png")}
                style={styles.Icon}
                resizeMode="contain"
              /> */}
              {CustomIcon(
                "walletSVG",
                60,
                selectedItem == 1 ? colors.primary : colors.placholderColor
              )}
              <Spacer spacing={5} />
              <TextField style={styles.text}>{t("Wallet")}</TextField>
            </TouchableOpacity>
            <Spacer spacing={5} />
            {/* <TouchableOpacity
              onPress={() => {
                setSelectedItem(2);
                setPayment("CASH");
              }}
              style={{
                ...styles.iconButton,
                borderColor: selectedItem == 2 ? colors.primary : "transparent",
              }}
            >
              <Image
                source={require("../../assets/payment/cash.png")}
                style={styles.Icon}
                resizeMode="contain"
              />
              <Spacer spacing={10} />
              <TextField style={styles.text}>Cash</TextField>
            </TouchableOpacity>
            <Spacer spacing={5} /> */}
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(3);
                setPayment("BANK");
              }}
              style={{
                ...styles.iconButton,
                borderColor:
                  selectedItem == 3 ? colors.primary : colors.borderColor,
              }}
            >
              {/* <Image
                source={require("../../assets/payment/donation.png")}
                style={styles.Icon}
                resizeMode="contain"
              /> */}
              {CustomIcon(
                "bankSVG",
                60,
                selectedItem == 3 ? colors.primary : colors.placholderColor
              )}

              <Spacer spacing={5} />
              <TextField style={styles.text}>{t("Bank")}</TextField>
            </TouchableOpacity>
          </View>
          <Spacer spacing={5} />
          {bottomContent && bottomContent}
          <View style={{ alignItems: "center" }}>
            <Button
              style={{ minWidth: "100%" }}
              textStyle={{
                textAlign: "center",
                minWidth: "100%",
                // marginLeft: 25,
              }}
              onPress={() => save()}
              title={loading ? "loading..." : t("Confirm Payment")}
              disabled={loading}
            >
              {loading && <LoadingIndicator activityColor="white" />}
            </Button>
          </View>
          {/* <Button
          onPress={onRequestClose}
          title={'Make Payment'}
          textStyle={{
            textAlign: 'center',
            width: '90%'
          }}
          style={{ width: '80%' }}
        /> */}
          <Spacer spacing={5} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 means 50% transparency)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#00000050'
  },
  text: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconButton: {
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Icon: {
    height: 50,
    width: 60,
  },
  modalView: {
    marginHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 34,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: XLARGE_PADDING_SIZE,
    alignItems: "center",
  },
  buttonStyle: {
    width: "95%",
    alignSelf: "center",
    textAlign: "center",
  },
});
