import React from "react";
import { View, StyleSheet } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { FastImage } from "@src/components/image";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  screenWidth,
} from "@src/globals/themes";
import {
  epochToHumanReadable,
  epochToHumanReadableTime,
} from "@src/utils/dateUtils";
import {
  sumQuantity,
  totalSalesPrice,
  truncateToTwoDecimalPlaces,
} from "@src/utils/getSum";
import QRCode from "react-native-qrcode-svg";
import OrderSvgIcon from "@src/assets/MoreScreenIcons/OrderSvgIcon";
import SupplyOrderHistoryIcon from "@src/assets/MoreScreenIcons/SupplyOrderHistoryIcon";
import { useTranslation } from "react-i18next";

const OrderCard = ({ item, detail, history = false, flowfrom }: any) => {
  const { t } = useTranslation();

  const allItemsWithCategory = item?.orderDetails?.flatMap((orderDetail: any) =>
    orderDetail.items.map((item: any) => ({
      categoryName: orderDetail.categoryName,
      ...item,
    }))
  );

  const qrData = {
    agentId: item?.pickupInfo?.agentId,
    orderId: item?.id,
  };
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <TextField>
            {t("Order ID")} : {item?.id}
          </TextField>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={[
              styles.statusView,
              {
                backgroundColor:
                  item?.status === "Completed" ||
                  item?.status === "COMPLETED" ||
                  item?.status === "ACCEPTED" ||
                  item?.status === "Accepted"
                    ? colors.green
                    : item?.status === "Created" || item?.status === "CREATED"
                    ? colors.yellow
                    : colors.primary,
              },
            ]}
          >
            <TextField
              style={{
                color:
                  item?.status === "Completed" ||
                  item?.status === "COMPLETED" ||
                  item?.status === "ACCEPTED" ||
                  item?.status === "Accepted"
                    ? colors.white
                    : item?.status === "Created" || item?.status === "CREATED"
                    ? colors.dark
                    : colors.white,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              {item?.status}
            </TextField>
          </View>
        </View>
      </View>
      <Spacer spacing={7} />
      <View
        style={{
          height: 0.4,
          backgroundColor: colors.darkGray,
          marginHorizontal: -10,
        }}
      />
      <Spacer spacing={7} />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        {/* <View style={{ flex: 0.5 }}>
          <View style={styles.circleView}>
            {flowfrom === "CollectOrder" ? (
              <OrderSvgIcon size={20} color={colors.secondary} />
            ) : (
              <SupplyOrderHistoryIcon size={20} color={colors.secondary} />
            )}
          </View>
        </View> */}
        <View style={{ flex: 4 }}>
          <View style={styles.rowContainer}>
            <TextField style={{ fontSize: 12, color: colors.darkGray }}>
              {`${epochToHumanReadable(item?.createdAt)}`}{" "}
              {`${epochToHumanReadableTime(item?.createdAt)}`}
            </TextField>
          </View>
          <Spacer spacing={2} />
          {flowfrom === "CollectOrder" && (
            <>
              <View style={styles.rowContainer}>
                <TextField>{t("Actual Collection Date")}</TextField>
                <TextField>
                  {epochToHumanReadable(item?.collectionDate)}
                </TextField>
              </View>

              <Spacer spacing={5} />
              <View style={styles.rowContainer}>
                <TextField>{t("Depositor Name")}</TextField>
                <TextField style={{ width: "60%", textAlign: "right" }}>
                  {item?.customerName ? item?.customerName.trim(" ") : "N/A"}
                </TextField>
              </View>
              <Spacer spacing={5} />
              <View style={styles.rowContainer}>
                <TextField>{t("Quantity")}</TextField>
                <TextField>
                  {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))}{" "}
                  KG
                </TextField>
              </View>
              <Spacer spacing={5} />
              <View style={styles.rowContainer}>
                <TextField>{t("Order Value")}</TextField>
                <TextField>
                  {truncateToTwoDecimalPlaces(
                    totalSalesPrice(item?.orderDetails)
                  )}{" "}
                  {item?.orderDetails[0]?.items[0]?.currency}
                </TextField>
              </View>
            </>
          )}
          {flowfrom === "Supply" && (
            <>
              <View style={styles.rowContainer}>
                <TextField>{t("Recycler Name")}</TextField>
                <TextField style={{ width: "60%", textAlign: "right" }}>
                  {item?.centreInfo?.name || "N/A"}
                </TextField>
              </View>
              <Spacer spacing={5} />
              <View style={styles.rowContainer}>
                <TextField>{t("Quantity")}</TextField>
                <TextField>
                  {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))}{" "}
                  KG
                </TextField>
              </View>
              <Spacer spacing={5} />
              <View style={styles.rowContainer}>
                <TextField>{t("Dispatch Date")}</TextField>
                <TextField>
                  {epochToHumanReadable(item?.pickupInfo?.pickupDate)}
                </TextField>
              </View>
            </>
          )}

          {!detail && (
            <>
              <Spacer spacing={5} />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  alignSelf: "flex-start",
                  borderRadius: 8,
                }}
              >
                <TextMedium style={{ color: colors.primary, fontSize: 14 }}>
                  {t("View Details")}
                </TextMedium>
              </View>
            </>
          )}
        </View>
      </View>

      {detail && (
        <View>
          <Spacer spacing={10} />
          <View
            style={{
              height: 0.4,
              backgroundColor: colors.darkGray,
              marginHorizontal: -10,
            }}
          />
          <Spacer spacing={10} />
          {/* {flowfrom === "Supply" && (
            <>
              <TextField
                style={{
                  color: colors.secondary,
                }}
              >
                OQty - Offered Quantity (KG)
              </TextField>
              <Spacer spacing={5} />
            </>
          )} */}
          <TextMedium>{t("Material Information")}</TextMedium>
          <Spacer spacing={5} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextField>{t("Category")}</TextField>
            <View
              style={{
                backgroundColor: colors.primaryLight2,
                paddingHorizontal: 12,
                paddingVertical: 2,
                borderRadius: 40,
              }}
            >
              <TextMedium style={{ color: colors.white, fontSize: 12 }}>
                {allItemsWithCategory[0]?.categoryName}
              </TextMedium>
            </View>
          </View>
          <Spacer spacing={5} />
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.secondary2,
              padding: HALF_MEDIUM_PADDING_SIZE,
              borderTopLeftRadius: BORDER_RADIUS_SIZE,
              borderTopRightRadius: BORDER_RADIUS_SIZE,
              paddingHorizontal: MEDIUM_PADDING_SIZE,
              justifyContent: "space-between",
            }}
          >
            <TextField
              style={{
                color: colors.white,
              }}
            >
              {t("Type")}
            </TextField>
            <TextField
              style={{
                color: colors.white,
              }}
            >
              {flowfrom === "Supply" ? t("Qty") : t("Qty")}
            </TextField>
          </View>

          {allItemsWithCategory.map((item: any) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: HALF_MEDIUM_PADDING_SIZE,
                paddingHorizontal: MEDIUM_PADDING_SIZE,
              }}
            >
              <TextMedium style={{ textAlign: "center" }}>
                {item?.itemName}
              </TextMedium>
              <TextMedium style={{ textAlign: "right" }}>
                {truncateToTwoDecimalPlaces(item?.quantity)}
              </TextMedium>
            </View>
          ))}
          <Spacer spacing={10} />

          <TextField
            style={{
              color: colors.secondary,
            }}
          >
            {t("Note: All quantity in Kgs")}
          </TextField>
          {flowfrom === "CollectOrder" && (
            <View>
              <Spacer spacing={10} />
              <TextField
                style={{
                  color: colors.secondary,
                }}
              >
                {t("Proof of Collection")}:
              </TextField>
              <Spacer spacing={5} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {item?.images?.map((res) => (
                  <View style={{ width: "47%", marginBottom: 10 }}>
                    <FastImage
                      source={{ uri: res }}
                      style={{ width: 170, height: 170 }}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
          {flowfrom === "Supply" &&
            (item?.status === "Pickup Completed" ||
            item?.status !== "Accepted" ? null : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <>
                  <Spacer spacing={10} />
                  <TextField
                    style={[
                      { color: colors.primaryLight2, textAlign: "center" },
                    ]}
                  >
                    {t("Share this QR Code to confirm the receipt")}
                  </TextField>
                  <Spacer spacing={10} />
                  <QRCode
                    value={JSON.stringify(qrData)}
                    size={screenWidth / 1.7}
                    logo={require("../../../../assets/logo/appicon.png")}
                    logoBackgroundColor={colors.white}
                  />
                  <Spacer spacing={5} />
                </>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5,
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
    padding: 16,
    marginRight: 10,
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
