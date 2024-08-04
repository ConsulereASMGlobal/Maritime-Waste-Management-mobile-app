import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  TextBold,
  TextField,
  TextMedium,
} from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import { colors } from "@src/globals/colors";

import Button from "@src/components/Button/Button";
import { LoadingIndicator } from "@src/components/LoadingIndicator";

import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import InfoScreen from "../../CongratulationScreen/InfoScreen";
import { globalStyle } from "@src/globals/globalStyles";
import TitleLogoView from "../Components/TitleLogoView";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { CardLayout } from "@src/components/Layouts/CardLayout";

import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  screenHeight,
  screenWidth,
} from "@src/globals/themes";
import ImageBg from "../Components/ImageBg";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import QRCodeScanner from "react-native-qrcode-scanner";
import { FastImage } from "@src/components/image";
import toast from "@src/services/toast";
import { check, PERMISSIONS, request } from "react-native-permissions";

export const SelectUserType = ({ route }: any) => {
  const { heading, subheading, routeFrom } = route?.params;

  const navigation = useNavigation<any>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [selectedLng, setSelectedLng] = useState();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState("not-determined");
  const [doneScanning, setDoneScanning] = useState(false);

  const _requestCameraPermission = async () => {
    try {
      const hasPermission = await check(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
      if (hasPermission != "granted") {
        const requestPermission = await request(
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA
        );
        requestPermission === "granted" &&
          setCameraPermissionStatus("authorized");
      } else {
        setCameraPermissionStatus("authorized");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = useCallback(async () => {
    setDoneScanning(false);
    Platform.OS === "android" &&
      ToastAndroid.showWithGravity(
        "Requesting camera permission...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    _requestCameraPermission();
  }, []);
  const userType = [
    { id: 1, name: "Aggregator", value: "PICKUP_POINT", selected: false },
    { id: 2, name: "Recycler", value: "RECYCLER", selected: false },
    {
      id: 3,
      name: "Collection Agent",
      value: "CUSTOMER",
      selected: false,
    },
  ];
  const [userList, setUserList] = useState<any>(userType);
  const changeType = async (type: any) => {
    const updatedUserList = userList.map((each) => {
      if (each.value === type) {
        return { ...each, selected: true };
      } else {
        return { ...each, selected: false };
      }
    });
    setUserList(updatedUserList);
  };

  const filterUserType = userList.find((item) => item.selected === true);

  const onSubmit = () => {
    if (filterUserType?.value === "CUSTOMER") {
      setTitle(`To create an account, please ensure that`);
      setMessage(
        `
      \n1. You have the following: 
      \na. Valid Malaysian ID
      \nb. Bank account details
      \n2. You are currently at the Aggregator's Collection Point
      `
      );
    } else {
      setTitle(`To create an account, please ensure that`);
      setMessage(`You have the following:
      \n1. Valid SSM Certificate
      \n2. Bank account detail
      `);
    }

    setisModalVisible((prev) => !prev);
    // const filterUserType = userList.find((item) => item.selected === true);

    // navigation.navigate("sendOtp", {
    //   routeFrom,
    //   heading,
    //   subheading,
    //   userType: filterUserType?.value,
    // });
  };
  const _onRequestClose = () => {
    setisModalVisible((prev) => !prev);
    if (filterUserType?.value === "CUSTOMER") {
      requestCameraPermission();
    } else {
      navigation.navigate("sendOtp", {
        routeFrom,
        heading,
        subheading,
        userType: filterUserType?.value,
      });
    }
  };
  const onSuccess = async (e: any) => {
    try {
      const parseData = await JSON.parse(e.data);
      console.log(parseData, "------");
      // return;
      if (parseData?.userType === "PICKUP_POINT" && parseData?.id) {
        navigation.navigate("sendOtp", {
          routeFrom,
          heading,
          subheading,
          userType: filterUserType?.value,
          aggregatorID: parseData?.id,
        });
      } else {
        toast.danger({
          message: "Invalid QR code.",
        });
      }
      // if (!parseData.orderId) {
      //   toast.danger({
      //     message: "Invalid QR code.",
      //   });
      // }
    } catch (error) {
      toast.danger({
        message: "unable to read from QR code.",
      });
      navigation.navigate("sendOtp", {
        routeFrom,
        heading,
        subheading,
        userType: filterUserType?.value,
      });
    }
  };
  return (
    <ScrollContainerLayout
      topBgColor={colors.primaryLight2}
      btmBgColor={colors.primaryLight2}
      contentStyle={{ flex: 1 }}
      scrollBgColor={colors.primaryLight2}
    >
      {!doneScanning && cameraPermissionStatus === "authorized" ? (
        <View style={{ backgroundColor: colors.backgroundColor }}>
          <QRCodeScanner
            reactivate
            reactivateTimeout={3000}
            bottomViewStyle={{ flex: 1 }}
            onRead={onSuccess}
            fadeIn
            showMarker={true}
            customMarker={
              <FastImage
                source={require("../../../assets/others/camera_frame.png")}
                resizeMode="stretch"
                style={{
                  height: screenWidth * 0.75,
                  width: screenWidth * 0.75,
                }}
              />
            }
            containerStyle={{
              height: screenHeight,
              width: screenWidth,
            }}
            cameraStyle={{
              height: screenWidth * 0.75,
              width: screenWidth * 0.75,
              overflow: "hidden",
              borderRadius: 25,
            }}
            cameraContainerStyle={{
              height: screenHeight,
              width: screenWidth,
              alignItems: "center",
              paddingTop: screenHeight * 0.2,
              backgroundColor: "#7d7a7a9e",
            }}
          />
        </View>
      ) : (
        <>
          <ImageBg />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TitleLogoView title={heading} desc={subheading} />
            <View style={styles.rootContainer}>
              <CardLayout
                style={{
                  top: 0,
                  marginHorizontal: REGULAR_PADDING_SIZE,
                  paddingHorizontal: REGULAR_PADDING_SIZE,
                  paddingVertical: REGULAR_PADDING_SIZE,
                }}
              >
                <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                  Select User Type
                </TextBold>
                <Spacer spacing={5} />
                <View style={{ width: "100%" }}>
                  {userList.map((item) => (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.languageButton,
                          {
                            backgroundColor: item?.selected
                              ? colors.primary
                              : colors.white,
                          },
                        ]}
                        onPress={() => changeType(item?.value)}
                      >
                        <TextField
                          style={[
                            styles.lngName,
                            {
                              fontWeight: "700",
                              color: item?.selected
                                ? colors.white
                                : colors.primary,
                            },
                          ]}
                        >
                          {item?.name}
                        </TextField>
                        {item?.selected && (
                          <DynamicIcon
                            iconName="checkcircle"
                            iconFamily="AntDesign"
                            iconColor={colors.white}
                          />
                        )}
                      </TouchableOpacity>
                      <Spacer spacing={10} />
                    </>
                  ))}
                </View>
                {routeFrom === "forgot" && (
                  <Pressable
                    style={{ justifyContent: "center", alignItems: "center" }}
                    onPress={() => navigation.goBack()}
                  >
                    <TextBold style={{ color: colors.primary }}>
                      Actually, I remember my password
                    </TextBold>
                  </Pressable>
                )}
                <Button
                  onPress={onSubmit}
                  disabled={!!loading}
                  textStyle={{ marginRight: 0 }}
                  title={"Confirm"}
                >
                  {!!loading && <LoadingIndicator activityColor="white" />}
                </Button>
                <Spacer spacing={10} />
                {routeFrom !== "forgot" && (
                  <View style={styles.registerRow}>
                    <TextMedium>Already have an account? </TextMedium>

                    <Pressable
                      style={styles.registerBtn}
                      onPress={() => navigation.goBack()}
                    >
                      <TextBold style={{ color: colors.primary }}>
                        Login
                      </TextBold>
                    </Pressable>
                  </View>
                )}
              </CardLayout>

              <CongratulationsModal
                modalVisible={isModalVisible}
                onRequestClose={_onRequestClose}
              >
                <InfoScreen
                  onRequestClose={_onRequestClose}
                  heading={title}
                  message={message}
                  textAlign={"left"}
                  bottomContent={
                    <View style={{ ...globalStyle.container }}>
                      <Button
                        style={{
                          width: "80%",
                          backgroundColor: colors.white,
                          borderColor: colors.primary,
                          borderWidth: 1,
                        }}
                        textStyle={{ color: colors.primary, marginRight: 0 }}
                        title={"Ok"}
                        onPress={_onRequestClose}
                      />
                    </View>
                  }
                />
              </CongratulationsModal>
            </View>
          </View>
        </>
      )}
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    justifyContent: "center",
  },
  registerRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  registerBtn: { justifyContent: "center", alignItems: "center" },

  languageButton: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderColor: "#f2f2f2",
    color: colors.neutral_dark,
    backgroundColor: colors.white,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: MEDIUM_PADDING_SIZE,
    shadowColor: "#F0FFFFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mainContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
});
