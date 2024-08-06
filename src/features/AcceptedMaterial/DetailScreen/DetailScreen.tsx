import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import PaymentOption from "@src/features/Payment/PaymentOptions";
import InfoScreen from "@src/features/CongratulationScreen/InfoScreen";
import { globalStyle } from "@src/globals/globalStyles";
import { useSelector } from "react-redux";
import { selectUserType } from "@src/redux/selectors";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { FastImage } from "@src/components/image";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { orderAPI } from "@src/services/api";
import toast from "@src/services/toast";
import { uploadImage } from "@src/services/uploadImage";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { useTranslation } from "react-i18next";

const DetailScreen = ({ route }: any) => {
  const { item, weightSlip } = route?.params;
  const { t } = useTranslation();

  const allItemsWithCategory = item?.orderDetails[0]?.items;
  const navigation = useNavigation<any>();
  const [showBtns, setShowBtns] = useState(true);
  const [showPayBtn, setShowPayBtn] = useState(false);
  const [payment, setPayment] = useState("CASH");
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [message, setMessage] = useState("");
  const seletedUserType = useSelector(selectUserType);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleAccept = async () => {
    if (seletedUserType === "RECYCLER") {
      setLoading(true);
      const weigthSlip = await uploadImage(image);
      console.log(weigthSlip, "--------");
      if (!weigthSlip) {
        setLoading(false);
        return toast.danger({ message: t("Please upload weight slip") });
      }

      orderAPI
        .changeStatus({
          status: "ACCEPTED",
          orderId: item?.id,
          weightImage: weigthSlip,
          actualWeight: 0,
        })
        .then((res) => {
          setLoading(false);
          console.log(res, "reponse");
          if (res.data) {
            setShowBtns(false);
            setShowPayBtn(false);
            setInfoModal(true);
            setMessage(t("Material has been accepted"));
          } else {
            return toast.danger({ message: t("Error while updating order!") });
          }
        });
    } else {
      setPaymentModalVisible((prevState) => !prevState);
    }
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
          setShowPayBtn(false);
          setInfoModal(true);
          setMessage(t("Material has been rejected"));
          // navigation.navigate("Home");
        } else {
          return toast.danger({ message: t("Error while updating order!") });
        }
      });
  };
  const handlePayement = (val: any) => {
    console.log(val, "_+_+_+_+_+_+");
    setLoading(true);
    orderAPI
      .changeStatus({
        orderId: item?.id,
        status: "ACCEPTED",
        paymentMode: val,
      })
      .then((res) => {
        console.log(res, "reponse");
        setLoading(false);
        if (res.data) {
          setPaymentModalVisible((prevState) => !prevState);
          setShowBtns(false);
          setShowPayBtn(false);
          setMessage(t("Payment information has been successfully updated"));
          setInfoModal(true);
          // navigation.navigate("Home");
        } else {
          setPaymentModalVisible((prevState) => !prevState);
          return toast.danger({ message: t("Error while updating order!") });
        }
      });
  };
  const _onPaymentModaClose = async () => {
    setPaymentModalVisible((prevState) => !prevState);
    // setInfoModal(true);
    // setMessage("Payment information has been successfully updated");
  };
  const _onRequestInfoClose = () => {
    navigation.navigate(t("Home"));
    setInfoModal(false);
  };

  const formOptions = { resolver: yupResolver({}) };

  const { handleSubmit, ...formProps } = useForm<any>(formOptions);

  useEffect(() => {
    seletedUserType === "RECYCLER" &&
      navigation.setOptions({ title: "Accept Waste" });
  }, []);

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
                      item?.status === "Completed" ||
                      item?.status === "COMPLETED" ||
                      item?.status === "ACCEPTED" ||
                      item?.status === "Accepted"
                        ? colors.green
                        : item?.status === "Created" ||
                          item?.status === "CREATED"
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
                        : item?.status === "Created" ||
                          item?.status === "CREATED"
                        ? colors.dark
                        : colors.white,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  {seletedUserType !== "CUSTOMER" &&
                  (item?.status === "CREATED" || item?.status === "Created")
                    ? "In transit"
                    : item?.status}
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
                <TextField>
                  {seletedUserType == "RECYCLER"
                    ? t("Vessel Name")
                    : t("Supplier Name")}
                </TextField>
                <TextField style={{ width: "50%", textAlign: "right" }}>
                  {seletedUserType === "RECYCLER"
                    ? item?.pickupInfo?.name.trim(" ")
                    : item?.customerInfo?.name.trim(" ")}
                </TextField>
              </View>
              <Spacer spacing={5} />
            </>
            {seletedUserType === "RECYCLER" && (
              <>
                <View style={styles.rowContainer}>
                  <TextField>{t("Contact")}</TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {item?.pickupInfo?.agentMobile}
                  </TextField>
                </View>
                <Spacer spacing={5} />
                <View style={styles.rowContainer}>
                  <TextField>{t("Address")}</TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {item?.pickupInfo?.address?.street},{" "}
                    {item?.pickupInfo?.address?.city}
                  </TextField>
                </View>
                <Spacer spacing={5} />
              </>
            )}
            {seletedUserType === "PICKUP_POINT" && (
              <>
                <View style={styles.rowContainer}>
                  <TextField>{t("Quantity")}</TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {item?.orderDetails[0]?.items[0]?.quantity}{" "}
                    {item?.orderDetails[0]?.items[0]?.unit}
                  </TextField>
                </View>
                <Spacer spacing={5} />
              </>
            )}
            <>
              <View style={styles.rowContainer}>
                <TextField>
                  {seletedUserType == "RECYCLER"
                    ? t("Unloading Date")
                    : t("Loading Date")}
                </TextField>
                <TextField style={{ width: "50%", textAlign: "right" }}>
                  {seletedUserType === "RECYCLER"
                    ? epochToHumanReadable(item?.createdAt)
                    : epochToHumanReadable(item?.collectionDate)}
                </TextField>
              </View>
            </>
          </View>
          {item?.status === "Pending" && seletedUserType === "PICKUP_POINT" && (
            <Button
              title="Amount Payable"
              style={{ backgroundColor: colors.secondary2 }}
              textStyle={[{ marginRight: 0 }]}
              onPress={() => {}}
            />
          )}
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

              {seletedUserType === "RECYCLER" && (
                <TextField
                  style={{
                    color: colors.white,
                    flex: 0.3,
                  }}
                >
                  {t("AQty")}
                </TextField>
              )}
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
                {seletedUserType === "RECYCLER" && (
                  <View style={{ flex: 0.3 }}>
                    <ValidationInput
                      placeholder="Street"
                      fieldName="street"
                      autoCapitalize={"none"}
                      {...formProps}
                    />
                  </View>
                )}
              </View>
            ))}
            <Spacer spacing={10} />

            <TextField
              style={{
                color: colors.secondary,
              }}
            >
              {t("Note: All quantity in Kgs. AQty = Actual Quantity")}
            </TextField>

            {seletedUserType === "PICKUP_POINT" && (
              <>
                <Spacer spacing={10} />
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
                <TextField style={{ textAlign: "center" }}>
                  {t("Proof of supply")}
                </TextField>
              </>
            )}
            {seletedUserType === "RECYCLER" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "46%", marginBottom: 10 }}>
                  <Spacer spacing={10} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <FastImage
                      source={{ uri: item?.invoiceImg }}
                      style={{ width: 170, height: 170 }}
                      resizeMode="cover"
                    />
                  </View>
                  <Spacer spacing={3} />
                  <TextField style={{ textAlign: "center" }}>
                    {t("Invoice Image")}
                  </TextField>
                </View>
                <View style={{ width: "46%", marginBottom: 10 }}>
                  <Spacer spacing={10} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <FastImage
                      source={{ uri: item?.transportImage }}
                      style={{ width: 170, height: 170 }}
                      resizeMode="cover"
                    />
                  </View>
                  <Spacer spacing={3} />
                  <TextField style={{ textAlign: "center" }}>
                    {t("Material Image")}
                  </TextField>
                </View>
              </View>
            )}
            {item?.weightImage && (
              <>
                <Spacer spacing={10} />
                <FastImage
                  source={{ uri: item?.weightImage }}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
                <Spacer spacing={5} />
                <TextField style={{ textAlign: "center" }}>
                  Weight Slip
                </TextField>
              </>
            )}
            {seletedUserType === "RECYCLER" && (
              <View>
                <Spacer spacing={5} />
                <FileImagePicker
                  setImage={setImage}
                  title={t("Weighment Slip")}
                />
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TooltipComp
                    children={
                      <FastImage
                        source={require("../../../assets/tooltips/weightslip.jpg")}
                        style={{ width: 225, height: 220 }}
                        resizeMode="contain"
                      />
                    }
                    tooltipPosition={"top"}
                  />
                </View>
              </View>
            )}
          </View>
          {showBtns && seletedUserType !== "RECYCLER" && (
            <View
              style={[
                { justifyContent: "space-between", flexDirection: "row" },
              ]}
            >
              <Button
                title={
                  loading
                    ? "loading..."
                    : seletedUserType === "RECYCLER"
                    ? t("Accept")
                    : weightSlip
                    ? t("Accept")
                    : t("Accept")
                }
                style={{ backgroundColor: colors.primaryDark, width: "47%" }}
                textStyle={[{ marginRight: 0 }]}
                disabled={loading}
                // onPress={() => handleAccept()}
                onPress={() =>
                  navigation.navigate("acceptQRScan", {
                    orderId: item.id,
                  })
                }
              />
              <Button
                title={t("Reject")}
                style={{ backgroundColor: colors.error, width: "47%" }}
                textStyle={[{ marginRight: 0 }]}
                onPress={() =>
                  Alert.alert(
                    t("Alert!"),
                    t("Are you sure you want to reject the consignment?"),
                    [
                      {
                        text: t("Cancel"),
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      { text: t("Yes"), onPress: () => handleReject() },
                    ]
                  )
                }
              />
            </View>
          )}

          {seletedUserType === "RECYCLER" && (
            <View>
              <Button
                title={t("Confirm")}
                style={{ backgroundColor: colors.primary }}
                textStyle={[{ marginRight: 0 }]}
                onPress={() =>
                  // Alert.alert(
                  //   t("Alert!"),
                  //   t("Are you sure you want to reject the consignment?"),
                  //   [
                  //     {
                  //       text: t("Cancel"),
                  //       onPress: () => console.log("Cancel Pressed"),
                  //       style: "cancel",
                  //     },
                  //     { text: t("Yes"), onPress: () => handleReject() },
                  //   ]
                  // )
                  {
                    setMessage(t("Waste has been accepted!"));
                    setInfoModal(true);
                  }
                }
              />
            </View>
          )}
          {/* <>
            {showPayBtn && (
              <Button
                title="Confirm Payment"
                textStyle={[{ marginRight: 0 }]}
                onPress={() => handlePayement()}
              />
            )}
          </> */}
          <CongratulationsModal
            modalVisible={paymentModalVisible}
            onRequestClose={_onPaymentModaClose}
          >
            <PaymentOption
              onRequestClose={_onPaymentModaClose}
              setPayment={setPayment}
              handlePayement={handlePayement}
              loading={loading}
              // bottomContent={
              //   <View style={{ alignItems: "center" }}>
              //     <Button
              //       style={{ width: "100%" }}
              //       textStyle={{
              //         textAlign: "center",
              //         width: "100%",
              //         marginLeft: 25,
              //       }}
              //       onPress={handlePayement}
              //       title={"Confirm Payment"}
              //     />
              //   </View>
              // }
            />
          </CongratulationsModal>
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

export default DetailScreen;

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
