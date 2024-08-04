import { StyleSheet, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotSchema } from "@src/static/schema/ValidationSchema";
import { useNavigation } from "@react-navigation/native";
import { countriesList } from "./countryList";
import { TextBold, TextMedium } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import { colors } from "@src/globals/colors";
import { DropDown } from "@src/components/Dropdown/DropDown";
import { BottomModalActions } from "@src/redux/actions/combineAction";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import Button from "@src/components/Button/Button";
import { LoadingIndicator } from "@src/components/LoadingIndicator";

import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import InfoScreen from "../../CongratulationScreen/InfoScreen";
import { globalStyle } from "@src/globals/globalStyles";
import TitleLogoView from "../Components/TitleLogoView";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import toast from "@src/services/toast";
import { validationAPI } from "@src/services/api";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import ImageBg from "../Components/ImageBg";

type InputProps = {
  mobile: string;
};
export const SendOTP = ({ route }: any) => {
  const { heading, subheading, routeFrom, userType, aggregatorID } =
    route?.params;
  // console.log(userType, "+++++");
  console.log(route.params);
  const dispatch = useDispatch();
  const formOptions = { resolver: yupResolver(forgotSchema) };
  const navigation = useNavigation<any>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState<any>();

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // prefix = "+60";
    // if (!prefix) {
    //   toast.danger({ message: "Please select country code" });
    //   return;
    // }
    // navigation.navigate("verifyOtp", {
    //   routeFrom,
    //   mobile: data?.mobile,
    //   prefix,
    //   country: "Malaysia",
    //   userType,
    //   aggregatorID,
    // });
    // return;
    setLoading(true);

    validationAPI
      .sendOTP({
        mobile: data?.mobile,
        prefix,
        from: routeFrom === "forgot" ? "forgotPassword" : "registration",
      })
      .then((res: any) => {
        setLoading(false);
        console.log(res, "response");
        if (res?.status === 208) {
          if (routeFrom === "register") {
            setMessage(
              `Your mobile number ${data?.mobile} has already registered. Please login.`
            );
            setisModalVisible((prevState) => !prevState);
          } else {
            setMessage(`Please Try again`);
            setisModalVisible((prevState) => !prevState);
          }
          // setMessage(
          //   `Your mobile number ${data?.mobile} has already registered. Please login.`
          // );
          // setisModalVisible(prevState => !prevState);
        } else if (res === 404) {
          setMessage(
            `Your mobile number ${data?.mobile} has not registered yet. Please register.`
          );
          setisModalVisible((prevState) => !prevState);
        } else if (res === 403) {
          setMessage(
            "The account associated with this number has been deleted. Please try using some other mobile number"
          );
          setisModalVisible((prevState) => !prevState);
        } else if (res === 500) {
          setMessage(`Please use Valid mobile number`);
          setisModalVisible((prevState) => !prevState);
        } else {
          navigation.navigate("verifyOtp", {
            routeFrom,
            mobile: data?.mobile,
            prefix,
            country: "Malaysia",
            userType,
            aggregatorID,
          });
        }
      });
  };
  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate("login");
  };

  const [prefix, setPrefix] = useState("60");

  const updatedCountry = countriesList?.map((obj) => {
    return {
      id: obj.id,
      label: "(+" + obj?.Code + ") " + obj?.Country,
      value: obj?.Code,
      country: obj?.Country,
    };
  });

  useEffect(() => {
    const filteredObjects = updatedCountry.filter(
      (obj) => obj.value === prefix
    );
    setCountry(filteredObjects[0]?.country);
  }, [prefix]);

  return (
    <ScrollContainerLayout
      topBgColor={colors.primaryLight2}
      btmBgColor={colors.primaryLight2}
      contentStyle={{ flex: 1 }}
      scrollBgColor={colors.primaryLight2}
    >
      <ImageBg />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TitleLogoView title={heading} desc={subheading} />

        {/* {routeFrom !== "forgot" && <LogoContainer />} */}
        {/* <View
        style={{
          backgroundColor: colors.secondary,
          height: routeFrom === "forgot" ? 150 : 75,
        }}
      /> */}
        <View style={styles.rootContainer}>
          {/* <TopShadowView topMar={-85} /> */}
          <CardLayout
            style={{
              top: 0,
              marginHorizontal: REGULAR_PADDING_SIZE,
              paddingHorizontal: REGULAR_PADDING_SIZE,
              paddingVertical: REGULAR_PADDING_SIZE,
            }}
          >
            <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
              Generate OTP
            </TextBold>
            <Spacer spacing={5} />

            {/* {routeFrom === "forgot" && (
            <LogoContainer
              bgColor={colors.white}
              logo={require("../../../assets/authIcons/forgotPassword.png")}
              width={128}
              height={74}
            />
          )} */}
            <View style={{ width: "100%" }}>
              {/* <DropDown
                lebel="Country Code"
                placeholder="Select Country Code"
                rightIconName="sort-down"
                setSelectedValue={setPrefix}
                combineOnPress={(rest) =>
                  dispatch(
                    BottomModalActions.toggleBottomModal({
                      title: "Select Country Code",
                      showList: true,
                      data: updatedCountry,
                      ...rest,
                    })
                  )
                }
              /> */}

              <ValidationInput
                placeholder="9xx xxx xxxx"
                label="Mobile Number"
                fieldName="mobile"
                prefix={`+${prefix}`}
                autoCapitalize={"none"}
                keyboardType="phone-pad"
                {...formProps}
              />
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
              onPress={handleSubmit(onSubmit)}
              disabled={!!loading}
              title={"Send Code"}
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
                  <TextBold style={{ color: colors.primary }}>Login</TextBold>
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
              heading=""
              message={message}
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
                    onPress={_onRequestClose}
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
});
