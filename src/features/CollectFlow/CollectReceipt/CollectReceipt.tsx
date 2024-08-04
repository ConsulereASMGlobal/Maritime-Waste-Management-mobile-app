import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import Button from "@src/components/Button/Button";
import {
  TextBold,
  TextField,
  TextMedium,
} from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import dayjs from "dayjs";
import { routes } from "@src/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";
import { orderAPI } from "@src/services/api";
import { truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { FastImage } from "@src/components/image";
import { useTranslation } from "react-i18next";

const CollectReceipt = ({ route }: any) => {
  const { orderID } = route?.params || {};
  const navigation = useNavigation();
  const [recieptData, setRecieptData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    orderAPI.getOrdersWithId({ id: orderID }).then((res) => {
      setLoading(false);
      // console.log(
      //   res?.data?.data[0]?.orderDetails[0]?.items[0]?.quantity,
      //   "error order with id"
      // );
      setRecieptData(res?.data?.data[0]);
    });
  }, []);

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View
        style={{ alignItems: "center", flex: 0.8, justifyContent: "center" }}
      >
        {/* {CustomIcon("firstSvg", 222)} */}
        <FastImage
          source={require("../../../assets/gifs/correct.gif")}
          style={{ width: 150, height: 150 }}
        />
        <Spacer spacing={10} />
        <View style={{ alignItems: "center" }}>
          <TextMedium
            style={{ color: colors.sublabel, lineHeight: 30, fontSize: 18 }}
          >
            {t("The material submission has been initiated")}
          </TextMedium>
          <Spacer spacing={5} />

          <TextField style={{ color: colors.sublabel }}>
            {t("Thank you!")}
          </TextField>
        </View>
        <Spacer spacing={10} />
        {loading ? (
          <View style={{ height: 150 }}>
            <LoadingIndicator />
          </View>
        ) : (
          <View>
            <TextField style={{ fontWeight: "bold", lineHeight: 22 }}>
              {t("Aggregator Name")} : {recieptData?.centerName ?? "N/A"}
            </TextField>
            <TextField style={{ fontWeight: "bold", lineHeight: 22 }}>
              {t("Material Type")}:{" "}
              {recieptData?.orderDetails[0]?.items[0]?.itemName}
            </TextField>
            <TextField style={{ fontWeight: "bold", lineHeight: 22 }}>
              {t("Quantity")} :{" "}
              {truncateToTwoDecimalPlaces(
                recieptData?.orderDetails[0]?.items[0]?.quantity
              )}{" "}
              {recieptData?.orderDetails[0]?.items[0]?.unit}
            </TextField>
            <TextField style={{ fontWeight: "bold", lineHeight: 22 }}>
              {t("Transaction Date")}:{" "}
              {dayjs(recieptData?.createdAt).format("DD/MM/YYYY")}
            </TextField>
            <TextField style={{ fontWeight: "bold", lineHeight: 22 }}>
              {t("Transaction Status")}: {recieptData?.status}
            </TextField>
          </View>
        )}
        <Spacer spacing={8} />

        <View>
          <TextBold style={styles.customerTitleText}>
            {t("Chain of Custody")}
          </TextBold>
          <View
            style={{
              backgroundColor: colors.darkGray,
              height: 0.4,
              marginVertical: 10,
            }}
          />
          <View style={{}}>
            <TextField style={{ fontWeight: "bold", lineHeight: 22 }}>
              {t("Methodology")} : Batch Traceablity
            </TextField>

            <TextField style={{ fontWeight: "bold" }}>
              {`${t("Standard")} : ISO 22095 [Mass Balance]`}
            </TextField>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => navigation.navigate(routes.bottomTabs.default)}
          title={t("Close")}
          textStyle={{ fontWeight: "bold", lineHeight: 18 }}
          style={{ backgroundColor: colors.darkBlue, height: 48 }}
        />
      </View>
    </View>
  );
};

export default CollectReceipt;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.white,
  },
  btnContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE + REGULAR_PADDING_SIZE,
    position: "absolute",
    bottom: 100,
    right: 0,
    left: 0,
  },
  heading: {
    color: colors.lightGreen,
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 34,
  },
});
