import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";

import { CardLayout } from "@src/components/Layouts/CardLayout";
import TitleLogoView from "../Components/TitleLogoView";
import toast from "@src/services/toast";
import { ProfileAPI } from "@src/services/api";
import { colors } from "@src/globals/colors";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import CheckBox from "@src/components/CheckBox/CheckBox";
import Button from "@src/components/Button/Button";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { MEDIUM_PADDING_SIZE, REGULAR_PADDING_SIZE } from "@src/globals/themes";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import InfoScreen from "@src/features/CongratulationScreen/InfoScreen";
import { globalStyle } from "@src/globals/globalStyles";
import ImageBg from "../Components/ImageBg";

export const LastStep = ({ navigation, route }: any) => {
  const { regdata } = route.params;
  console.log(regdata, "laststeps=====================");
  const [loading, setLoading] = useState(false);
  const [loc, setLoc] = useState<any>();

  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isAgreement, setIsAgreement] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLoc({ lat: info.coords.latitude, lng: info.coords.longitude });
    });
  }, []);
  const onSubmit = async () => {
    if (!isAgeVerified) {
      toast.danger({
        message: "Please agree declaration that all information is correct.",
      });
      return;
    }
    if (!isAgreement) {
      toast.danger({
        message: "Please agree to the terms and conditions before proceeding.",
      });
      return;
    }
    // navigation.navigate("applicationSubmitted");
    const sendData = {
      firstName: regdata?.firstName,
      lastName: regdata?.lastName ?? "",
      email: regdata?.email,
      mobile: regdata?.mobile,
      userType: regdata?.userType,
      countryCode: regdata?.prefix,
      password: regdata?.password,
      status: "INACTIVE",
      franchiseId: regdata?.franchiseeId ?? "",
      franchiseName: regdata?.franchiseeName ?? "",
      kycDocument: regdata?.kycDocument,
      companyDetails: {
        name: "",
        companyId: "",
      },
      address: {
        street: regdata?.street,
        state: "",
        city: regdata?.city,
        country: regdata?.country,
        latitute: loc?.lat,
        longitute: loc?.lng,
        zipCode: regdata?.zipCode,
        province: "",
        barangay: "",
        lotNumber: "",
        countryCode: regdata?.prefix,
      },
      person: "",
      store: "",
      storeName: "",
      bankName: "",
      notes: "",
      isoCertificate: false,
      pprsCertificate: false,
      bankDetails: regdata?.bankDetails,
      pickupointId: regdata?.aggregatorID ?? "",
    };
    console.log(sendData, "---------");
    // return;

    setLoading(true);
    ProfileAPI.registerUser(sendData).then((res) => {
      setLoading(false);
      console.log(res, "register response");
      if (res?.data) {
        navigation.navigate("applicationSubmitted");
      } else {
        setisModalVisible((prevState) => !prevState);

        // Alert.alert(
        //   'Info',
        //   `You are already registered with ${regdata?.mobile} mobile number`,
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => navigation.navigate('login')
        //     },
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel'
        //     }
        //   ]
        // );
      }
    });
    // navigation.navigate('applicationSubmitted');
  };
  const [isModalVisible, setisModalVisible] = useState(false);

  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate("login");
  };
  return (
    <ScrollContainerLayout
      topBgColor={colors.primaryLight2}
      btmBgColor={colors.primaryLight2}
      // contentStyle={{ flex: 1 }}
      scrollBgColor={colors.primaryLight2}
    >
      <ImageBg />
      <TitleLogoView
        title={"Create an account"}
        desc={"Enter your information to start your eco-journey now!"}
        titleSize={24}
      />
      <View>
        <CardLayout
          style={{
            top: 0,
            marginHorizontal: REGULAR_PADDING_SIZE / 2,
          }}
        >
          <View style={styles.mainContainer}>
            <View>
              <TextField
                style={{
                  fontWeight: "bold",
                  color: colors.secondary,
                }}
              >
                One Last Step
              </TextField>
              <Spacer spacing={3} />
              <TextField style={{ color: colors.gray }}>
                Please check to confirm if all the details below are correct.
              </TextField>
              <Spacer spacing={10} />
            </View>
            <View
              style={{
                width: "100%",
              }}
            >
              <View>
                <View style={styles.titleBox}>
                  <TextBold>
                    {regdata?.userType === "PICKUP_POINT"
                      ? "Aggregator's Information"
                      : regdata?.userType === "RECYCLER"
                      ? "Recycler's Information"
                      : "Collection Agent's Information"}
                  </TextBold>
                </View>
                <View style={{ padding: 8, gap: 3 }}>
                  <TextField>
                    {regdata?.userType === "CUSTOMER"
                      ? "Full Name (as per NRIC)"
                      : "Business Name"}{" "}
                    : <TextField>{regdata?.firstName}</TextField>
                  </TextField>
                  {regdata?.email && (
                    <TextField>
                      Email : <TextField>{regdata?.email}</TextField>
                    </TextField>
                  )}
                  <TextField>
                    Mobile :{" "}
                    <TextField>
                      {regdata?.prefix} {regdata?.mobile}
                    </TextField>
                  </TextField>
                </View>
              </View>
              <Spacer spacing={10} />

              <View>
                <View style={styles.titleBox}>
                  <TextBold>
                    {regdata?.userType === "PICKUP_POINT"
                      ? "Collection Point Address"
                      : regdata?.userType === "RECYCLER"
                      ? "Recycler's Business and Recycling Facility Address"
                      : "Collection Agent's Address"}
                  </TextBold>
                </View>
                <View style={{ padding: 8 }}>
                  <TextField>
                    Address :{" "}
                    <TextField>
                      {regdata?.street && `${regdata?.street}, `}
                      {regdata?.city && `${regdata?.city}, `}
                      {regdata?.country && `${regdata?.country}`}
                    </TextField>
                  </TextField>
                  {regdata?.notes && (
                    <TextField>
                      Notes : <TextField>{regdata?.notes}</TextField>
                    </TextField>
                  )}
                </View>
              </View>
              <Spacer spacing={10} />

              <Pressable
                onPress={() => setIsAgeVerified((pre) => !pre)}
                style={styles.rowCheckBox}
              >
                <CheckBox isSelected={isAgeVerified} />
                <TextField style={styles.checkTextWidth}>
                  I declare that all information provided is correct
                </TextField>
              </Pressable>
              <Spacer spacing={5} />
              <Pressable
                onPress={() => setIsAgreement((pre) => !pre)}
                style={styles.rowCheckBox}
              >
                <CheckBox isSelected={isAgreement} />
                <TextField style={styles.checkTextWidth}>
                  I agree to the{" "}
                  <TextField
                    style={styles.termConditionTxt}
                    onPress={() => {
                      navigation.navigate("pdfViewer", {
                        title: "Terms & Conditions",
                        pdfUrl:
                          Platform.OS == "android"
                            ? "bundle-assets://pdf/termsER.pdf"
                            : require("../../../assets/PDF/termsER.pdf"),
                      });
                    }}
                  >
                    Terms and Conditions
                  </TextField>{" "}
                  as set out by the user agreement.
                </TextField>
              </Pressable>

              <Button
                textStyle={{ lineHeight: 18 }}
                onPress={() => onSubmit()}
                title={"Submit"}
                style={{ backgroundColor: colors.primary }}
                rippleColor={colors.ternary}
                disabled={loading}
              >
                {loading && <LoadingIndicator activityColor="white" />}
              </Button>
              <Button
                onPress={() => navigation.goBack()}
                title={"Back"}
                style={{
                  width: "100%",
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1,
                  marginTop: MEDIUM_PADDING_SIZE,
                }}
                textStyle={{ color: colors.primary, lineHeight: 18 }}
              />
            </View>
            <Spacer spacing={10} />
          </View>

          <CongratulationsModal
            modalVisible={isModalVisible}
            onRequestClose={_onRequestClose}
          >
            <InfoScreen
              onRequestClose={_onRequestClose}
              heading=""
              message={`Try again.`}
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
                    title={"Login"}
                    onPress={_onRequestClose}
                  />
                </View>
              }
            />
          </CongratulationsModal>
        </CardLayout>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingHorizontal: REGULAR_PADDING_SIZE / 2,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleBox: {
    backgroundColor: colors.shaded,
    padding: 8,
    marginBottom: 5,
  },
  rowCheckBox: {
    flexDirection: "row",
    gap: 10,
  },
  checkTextWidth: {
    maxWidth: "90%",
  },
  termConditionTxt: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
