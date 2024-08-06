import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { selectUserType } from "@src/redux/selectors";
import { orderAPI } from "@src/services/api";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { useIsFocused } from "@react-navigation/native";
import Tooltip from "react-native-walkthrough-tooltip";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { FastImage } from "@src/components/image";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";

const ViewOrders = ({ refresh }) => {
  const seletedUserType = useSelector(selectUserType);
  const [order, setOrder] = useState([]);
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused) {
      if (seletedUserType === "CUSTOMER") {
        orderAPI.getOrdersByCusomter("CREATED").then((res) => {
          setOrder(res?.data?.data);
        });
      } else if (seletedUserType === "PICKUP_POINT") {
        orderAPI.getReturn("CREATED").then((res) => {
          setOrder(res?.data?.data);
        });
      } else {
        orderAPI.getReturn("CREATED").then((res) => {
          setOrder(res?.data?.data);
        });
      }
    }
  }, [isFocused, refresh]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 2,
          }}
        >
          <TextBold>
            {seletedUserType === "CUSTOMER"
              ? t("Recent Supplies")
              : seletedUserType === "RECYCLER"
              ? t("Incoming Shipments")
              : t("Recent Unload")}
            {"  "}

            <TooltipComp
              children={
                <TextField>
                  {seletedUserType === "CUSTOMER"
                    ? t(
                        "Shows the list of transactions which are pending for approval by the aggregator"
                      )
                    : seletedUserType === "RECYCLER"
                    ? t(
                        "Shows the list of consignments which are shipped by the aggregator and are on the way to your facility"
                      )
                    : t(
                        "Shows the list of supplies which are on the way to the recycler facility"
                      )}
                </TextField>
              }
              tooltipPosition={"top"}
            />
          </TextBold>
        </View>
        {/* <FastImage
          source={require("../../../assets/gifs/truck.gif")}
          style={{ width: 22, height: 22 }}
        /> */}
        <LottieView
          source={
            seletedUserType === "CUSTOMER"
              ? require("../../../assets/gifs/loading.json")
              : require("../../../assets/gifs/truck.json")
          }
          style={{ width: "20%", height: "150%" }}
          autoPlay
          loop
        />
      </View>
      <Spacer spacing={10} />
      {order?.map((item) => (
        <View style={styles.card} key={item?.id}>
          <View style={styles.rowContainer}>
            <TextField style={{ color: colors.blue, fontWeight: "600" }}>
              {t("Status")}
            </TextField>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 3,
                marginBottom: 5,
                borderRadius: 92 / 2,
                backgroundColor:
                  item?.status === "Completed" ||
                  item?.status === "COMPLETED" ||
                  item?.status === "ACCEPTED" ||
                  item?.status === "Accepted"
                    ? colors.green
                    : item?.status === "Created" || item?.status === "CREATED"
                    ? colors.yellow
                    : colors.primary,
              }}
            >
              <TextField
                style={{
                  fontSize: 12,
                  color:
                    item?.status === "Completed" ||
                    item?.status === "COMPLETED" ||
                    item?.status === "ACCEPTED" ||
                    item?.status === "Accepted"
                      ? colors.white
                      : item?.status === "Created" || item?.status === "CREATED"
                      ? colors.dark
                      : colors.white,
                }}
              >
                {seletedUserType !== "CUSTOMER" &&
                (item?.status === "CREATED" || item?.status === "Created")
                  ? "In transit"
                  : t(item?.status)}
              </TextField>
            </View>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField
              style={{ color: colors.blue, fontWeight: "600", fontSize: 14 }}
            >
              {seletedUserType !== "CUSTOMER" ? t("Order ID :") : t("Material")}
            </TextField>
            <TextField>
              {" "}
              {seletedUserType === "CUSTOMER"
                ? item?.orderDetails[0]?.items[0]?.itemName
                : item?.id}
            </TextField>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField
              style={{ color: colors.blue, fontWeight: "600", fontSize: 14 }}
            >
              {seletedUserType === "CUSTOMER"
                ? t("Quantity")
                : seletedUserType === "RECYCLER"
                ? t("Unloading Date :")
                : t("Unloading Date :")}
            </TextField>
            <TextField>
              {seletedUserType === "CUSTOMER"
                ? `${item?.orderDetails[0]?.items[0]?.quantity} ${item?.orderDetails[0]?.items[0]?.unit}`
                : epochToHumanReadable(item?.createdAt)}
            </TextField>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ViewOrders;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius: BORDER_RADIUS_SIZE,
    marginBottom: MEDIUM_PADDING_SIZE,
    padding: MEDIUM_PADDING_SIZE,
    marginHorizontal: 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
