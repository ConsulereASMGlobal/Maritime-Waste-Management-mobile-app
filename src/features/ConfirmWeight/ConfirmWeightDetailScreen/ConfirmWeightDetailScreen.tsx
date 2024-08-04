import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { Spacer } from "@src/components/common/Spacer";
import { truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import Button from "@src/components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import InfoScreen from "@src/features/CongratulationScreen/InfoScreen";
import { globalStyle } from "@src/globals/globalStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { FastImage } from "@src/components/image";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { orderAPI } from "@src/services/api";
import toast from "@src/services/toast";
import { useTranslation } from "react-i18next";
import { routes } from "@src/navigation/routes";

const ConfirmWeightDetailScreen = ({ route }: any) => {
  const { item } = route?.params;
  const { t } = useTranslation();

  const allItemsWithCategory = item?.orderDetails[0]?.items;
  const navigation = useNavigation<any>();
  const [showBtns, setShowBtns] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAccept = async () => {
    setLoading(true);

    orderAPI
      .changeStatus({
        status: "COMPLETED",
        orderId: item?.id,
      })
      .then((res) => {
        setLoading(false);
        console.log(res, "reponse");
        if (res.data) {
          setShowBtns(false);
          setInfoModal(true);
          setMessage(t("Material has been accepted"));
        } else {
          return toast.danger({ message: "Error while updating order!" });
        }
      });
  };
  const handleReject = () => {
    orderAPI
      .changeStatus({
        orderId: item?.id,
        status: "REJECTED",
      })
      .then((res) => {
        console.log(res, "reponse");
        if (res.data) {
          setShowBtns(false);
          setInfoModal(true);
          setMessage(t("Material has been rejected"));
          navigation.navigate(routes.bottomTabs.default);
        } else {
          return toast.danger({ message: "Error while updating order!" });
        }
      });
  };

  const _onRequestInfoClose = () => {
    navigation.navigate(routes.bottomTabs.default);
    setInfoModal(false);
  };

  const formOptions = { resolver: yupResolver({}) };

  const { handleSubmit, ...formProps } = useForm<any>(formOptions);
  return (
    <ScrollContainerLayout>
      <View style={styles.mainContainer}>
        <View style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
                      item?.status === "COMPLETED"
                        ? colors.green
                        : item?.status === "CREATED" ||
                          item?.status === "Created"
                        ? colors.primary
                        : colors.primaryLight2,
                  },
                ]}
              >
                <TextField
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  {item?.status}
                </TextField>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 0.4,
              backgroundColor: colors.darkGray,
              marginHorizontal: -10,
            }}
          />
          <Spacer spacing={7} />

          <View style={{ flex: 4 }}>
            <>
              <View style={styles.rowContainer}>
                <TextField>{t("Recycler Name")}</TextField>
                <TextField style={{ width: "50%", textAlign: "right" }}>
                  {item?.centreInfo?.name.trim(" ")}
                </TextField>
              </View>
              <Spacer spacing={5} />
            </>
            <>
              <View style={styles.rowContainer}>
                <TextField>{t("Address")}</TextField>
                <TextField style={{ width: "50%", textAlign: "right" }}>
                  {item?.pickupInfo?.address?.street},{" "}
                  {item?.pickupInfo?.address?.city}
                </TextField>
              </View>
              <Spacer spacing={5} />
            </>

            <>
              <View style={styles.rowContainer}>
                <TextField>{t("Dispatch Date")}</TextField>
                <TextField style={{ width: "50%", textAlign: "right" }}>
                  {epochToHumanReadable(item?.createdAt)}
                </TextField>
              </View>
            </>
          </View>

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
            <TextMedium>{t("Order Details")}</TextMedium>
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
                  {item?.orderDetails[0]?.categoryName}
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
                {t("Qty")}
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
                  {item.itemName}
                </TextMedium>
                <TextMedium style={{ textAlign: "right" }}>
                  {truncateToTwoDecimalPlaces(item.quantity)}
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

            {item?.weightImage && (
              <>
                <Spacer spacing={10} />

                <FastImage
                  source={{ uri: item?.weightImage }}
                  // source={require("../../../assets/others/garbagetrucks.jpeg")}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
                <Spacer spacing={5} />
                <TextField style={{ textAlign: "center" }}>
                  {t("Weight Slip")}
                </TextField>
              </>
            )}
          </View>
          {showBtns && (
            <View
              style={[
                { justifyContent: "space-between", flexDirection: "row" },
              ]}
            >
              <Button
                title={loading ? "loading..." : t("Accept")}
                style={{ backgroundColor: colors.primaryDark, width: "47%" }}
                textStyle={[{ marginRight: 0 }]}
                disabled={loading}
                onPress={() => handleAccept()}
              />
              <Button
                title={t("Reject")}
                style={{ backgroundColor: colors.error, width: "47%" }}
                textStyle={[{ marginRight: 0 }]}
                onPress={() => handleReject()}
              />
            </View>
          )}

          <CongratulationsModal
            modalVisible={infoModal}
            onRequestClose={_onRequestInfoClose}
          >
            <InfoScreen
              onRequestClose={_onRequestInfoClose}
              heading=""
              message={message}
              success={true}
              bottomContent={
                <View style={{ ...globalStyle.container }}>
                  <Button
                    style={{
                      width: "80%",
                      backgroundColor: colors.white,
                      borderColor: colors.primary,
                      borderWidth: 1,
                    }}
                    textStyle={{ color: colors.primary }}
                    title={t("Done")}
                    onPress={_onRequestInfoClose}
                  />
                </View>
              }
            />
          </CongratulationsModal>
        </View>
      </View>
    </ScrollContainerLayout>
  );
};

export default ConfirmWeightDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
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
