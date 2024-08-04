import { Alert, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  Fonts,
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
import { FastImage } from "@src/components/image";
import { ProfileAPI, users } from "@src/services/api";
import toast from "@src/services/toast";

const ApproveDetailScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);

  const [status, setStatus] = useState("Pending");
  const allItemsWithCategory = [{ id: 1, itemName: "Rigid", qty: 10 }];
  const navigation = useNavigation<any>();
  const [showBtns, setShowBtns] = useState(true);
  const [showPayBtn, setShowPayBtn] = useState(false);
  const [payment, setPayment] = useState("CASH");
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAccept = () => {
    // setStatus("Accepted");
    // setShowBtns(false);
    // setInfoModal(true);
    // setMessage(
    //   "The collection agent account creation request has been approved."
    // );
    setLoading(true);

    users
      .activateCustomer({ userId: item?.id, status: "ACTIVE" })
      .then((res) => {
        setLoading(false);
        if (res?.data) {
          setShowBtns(false);
          setMessage(
            "The collection agent account creation request has been approved."
          );
          setInfoModal(true);
        } else {
          return toast.danger({
            message: "Please try again!",
          });
        }
      });
  };
  const handleReject = () => {
    // setStatus("Rejected");
    // setShowBtns(false);
    // setShowPayBtn(false);

    users
      .activateCustomer({ userId: item?.id, status: "REJECTED" })
      .then((res) => {
        if (res) {
          setShowBtns(false);
          setMessage(
            "The collection agent account creation request has been rejected."
          );
          setInfoModal(true);
        } else {
          return toast.danger({
            message: "Please try again!",
          });
        }
      });
  };
  const handlePayement = () => {
    setShowBtns(false);
    setShowPayBtn(false);

    setPaymentModalVisible((prevState) => !prevState);
  };
  const _onPaymentModaClose = async () => {
    setStatus("Completed");
    setPaymentModalVisible((prevState) => !prevState);
    setInfoModal(true);
    setMessage("Payment information has been successfully updated");
  };
  const _onRequestInfoClose = () => {
    setInfoModal(false);
    setShowBtns(false);
    navigation.navigate("Home");

    // setInfoModal(true);
    // setMessage(
    //   "The collection agent account creation request has been approved."
    // );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextField>ID : {item?.id}</TextField>
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
                      : item?.status === "INACTIVE" ||
                        item?.status === "inactive" ||
                        item?.status === "Created" ||
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
                      : item?.status === "INACTIVE" ||
                        item?.status === "inactive" ||
                        item?.status === "Created" ||
                        item?.status === "CREATED"
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
          <View style={{ flex: 4 }}>
            <View style={styles.rowContainer}>
              <TextField>Collection Agent Name</TextField>
              <TextField style={{ width: "50%", textAlign: "right" }}>
                {item?.personalDetails?.name.trim("   ") || "N/A"}
              </TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Mobile Number</TextField>
              <TextField>{item?.personalDetails?.mobile}</TextField>
            </View>
            {item?.personalDetails?.email && (
              <>
                <Spacer spacing={5} />
                <View style={styles.rowContainer}>
                  <TextField>Email</TextField>
                  <TextField>{item?.personalDetails?.email}</TextField>
                </View>
              </>
            )}
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>NRIC Number</TextField>
              <TextField>{item?.kycDocument[0]?.docNumber ?? "N/A"}</TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Street</TextField>
              <TextField>{item?.address?.street}</TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>City</TextField>
              <TextField>{item?.address?.city}</TextField>
            </View>

            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Zip Code</TextField>
              <TextField>{item?.address?.zipCode}</TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Bank Name</TextField>
              <TextField style={{ width: "50%", textAlign: "right" }}>
                {item?.bankDetails?.bankName}
              </TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Bank Account No</TextField>
              <TextField>{item?.bankDetails?.accountNo}</TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Account Holder Name</TextField>
              <TextField>{item?.bankDetails?.accountName}</TextField>
            </View>
            <Spacer spacing={10} />

            <View
              style={[
                styles.rowContainer,
                { justifyContent: "center", gap: 30 },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <FastImage
                  source={{ uri: item?.kycDocument[0]?.docUrl }}
                  // source={require("../../../assets/others/userProfile.png")}
                  style={{ width: 120, height: 120 }}
                />
                <Spacer spacing={5} />
                <TextField>NRIC Picture</TextField>
              </View>
              <View style={{ alignItems: "center" }}>
                <FastImage
                  source={{ uri: item?.kycDocument[1]?.docUrl }}
                  // source={require("../../../assets/others/userProfile.png")}
                  style={{ width: 120, height: 120 }}
                />
                <Spacer spacing={5} />
                <TextField>Profile Picture</TextField>
              </View>
            </View>
          </View>
        </View>

        {showBtns && (
          <View
            style={[{ justifyContent: "space-between", flexDirection: "row" }]}
          >
            <Button
              title={loading ? "...loading" : "Accept"}
              style={{ backgroundColor: colors.primaryDark, width: "47%" }}
              textStyle={[{ marginRight: 0 }]}
              disabled={loading}
              onPress={() => handleAccept()}
            />
            <Button
              title="Reject"
              style={{ backgroundColor: colors.error, width: "47%" }}
              textStyle={[{ marginRight: 0 }]}
              onPress={() =>
                Alert.alert(
                  "Alert!",
                  "Are you sure you want to reject the customer?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "Yes", onPress: () => handleReject() },
                  ]
                )
              }
            />
          </View>
        )}
        <>
          {showPayBtn && (
            <Button
              title="Confirm Payment"
              textStyle={[{ marginRight: 0 }]}
              onPress={() => handlePayement()}
            />
          )}
        </>
        <CongratulationsModal
          modalVisible={paymentModalVisible}
          onRequestClose={_onPaymentModaClose}
        >
          <PaymentOption
            onRequestClose={_onPaymentModaClose}
            setPayment={setPayment}
            bottomContent={
              <View style={{ alignItems: "center" }}>
                <Button
                  style={{ width: "100%" }}
                  textStyle={{
                    textAlign: "center",
                    width: "100%",
                    marginLeft: 25,
                  }}
                  onPress={_onPaymentModaClose}
                  title={"Confirm Payment"}
                />
              </View>
            }
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
                  title={"Done"}
                  onPress={_onRequestInfoClose}
                />
              </View>
            }
          />
        </CongratulationsModal>
      </View>
    </View>
  );
};

export default ApproveDetailScreen;

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
