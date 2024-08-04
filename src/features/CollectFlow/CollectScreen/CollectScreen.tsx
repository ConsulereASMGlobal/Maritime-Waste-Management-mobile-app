import React, { useState, useEffect, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Spacer } from "../../../components/common/Spacer";
import { globalStyle } from "../../../globals/globalStyles";
import {
  TextBold,
  TextField,
  TextMedium,
} from "../../../components/TextField/TextField";
import Button from "../../../components/Button/Button";
import toast from "../../../services/toast";
import { useAppDispatch } from "../../../redux/store";
import { setInfoActions } from "../../../redux/actions/combineAction";
import { qrSchema } from "../../../static/schema/ValidationSchema";
import { colors } from "../../../globals/colors";
import { DynamicIcon } from "../../../utils/Dynamic/DynamicIcon";
import { ProfileAPI } from "../../../services/api";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { axiosInstance } from "../../../helpers/axiosHelper";
import { HorizontalLine } from "../../../components/HorizontalLine";
import { check, PERMISSIONS, request } from "react-native-permissions";
import QRCodeScanner from "react-native-qrcode-scanner";
import { FastImage } from "@src/components/image";
import {
  BORDER_RADIUS_SIZE,
  LARGE_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  screenHeight,
  screenWidth,
} from "@src/globals/themes";
import { selectProfile } from "@src/redux/selectors";
import { useSelector } from "react-redux";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import RadioButtonOtpions from "../Components/RadioOptions";
import { useIsFocused } from "@react-navigation/native";

type InputProps = {
  mobile: string;
  name: string;
  org: string;
};
const formProItems = [
  { id: 1, label: "Individual", value: "Individual" },
  { id: 2, label: "Commercial", value: "Commercial" },
  { id: 3, label: "Institutional", value: "Institutional" },
];
export const CollectScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isScreenFocused = useIsFocused();
  const [mobile, setMobile] = useState();

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState("not-determined");

  useEffect(() => {
    axiosInstance
      .get("/users?type=CUSTOMER&customerType=CORPORATE")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (mobile) {
      setSelectedCompany(null);
    }
  }, [mobile]);
  const [doneScanning, setDoneScanning] = useState(false);
  const [fullName, setFullName] = useState();
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (selectedCompany || isScreenFocused) {
      setUserData(null);
      setMobile("");
      // setOrg(null);
    }
  }, [selectedCompany, isScreenFocused]);
  const [org, setOrg] = useState(formProItems[0]?.value);
  const [selectedItem, setSelectedItem] = useState(formProItems[0]);

  const [searchLoading, setSearchLoading] = useState(false);

  const [companies, setCompanies] = useState([]);

  const companyList = companies?.map((each: any) => ({
    label: each?.personalDetails?.name,
    value: each.id,
    mobile: each.personalDetails?.mobile,
  }));

  const formOptions = { resolver: yupResolver(qrSchema) };

  const { handleSubmit } = useForm<InputProps>(formOptions);
  const [isFocused, setIsFocus] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectProfile);

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    if (!selectedCompany) {
      if (!fullName) {
        return toast.danger({
          message: "Full Name is Required!",
        });
      }
      if (!org) {
        return toast.danger({
          message: "Source is Required!",
        });
      }
      dispatch(setInfoActions.setCustomerName(fullName));
      dispatch(setInfoActions.setCustomerMobile(mobile));
      dispatch(setInfoActions.setCustomerOrg(org));
      if (userData?.data || userData?.name) {
        navigation.navigate("catalogue", {
          dataFields: { ...data, uid: userData?.data?.id || userData?.id },
        });
      } else {
        setLoading(true);
        ProfileAPI.registerUser({
          firstName: fullName,
          lastName: "",
          email: "",
          mobile: mobile,
          userType: "CUSTOMER",
          companyDetails: {
            name: org,
          },
          address: {},
          password: mobile,
        }).then((res) => {
          setLoading(false);
          if (res?.data) {
            navigation.navigate("catalogue", {
              dataFields: { ...data, uid: res?.data?.data?.id },
            });
          } else if (res === 500) {
            return toast.danger({
              message: "Please try again!",
            });
          }
        });
      }
    } else {
      const company = companyList.find(
        (each) => (each.value = selectedCompany)
      );
      dispatch(setInfoActions.setCustomerName(company?.label));
      dispatch(setInfoActions.setCustomerMobile(company?.mobile));
      dispatch(setInfoActions.setCustomerOrg("Corporate"));
      navigation.navigate("catalogue", {
        dataFields: { ...data, uid: selectedCompany },
      });
    }
  };
  const handleFocus = (e: any) => {
    setIsFocus(true);
  };

  const handleBlur = (e: any) => {
    setIsFocus(false);
  };
  const fieldColor = isFocused ? colors.primary : colors.gray;
  const inputFieldColor = colors.dark;

  const getUserD = () => {
    if (!mobile) {
      return toast.danger({
        message: "Mobile Number is Required!",
      });
    }

    setSearchLoading(true);
    ProfileAPI.getRegisteredUser({ mobile }).then((res) => {
      setSearchLoading(false);
      if (res === 500) {
        return toast.danger({
          message: "You are registered as plastic station or rider!",
        });
      } else {
        setUserData(res);
        setFullName(res?.data?.personalDetails?.name);
        setOrg(formProItems[0]?.value);
        setSelectedItem(formProItems[0]);
      }
    });
  };

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
  const onSuccess = async (e: any) => {
    try {
      const parseData = await JSON.parse(e.data);
      console.log(parseData, "scan data-------");
      if (parseData?.mobile === profileData?.personalDetails?.mobile) {
        return toast.danger({
          message: "This number is registered as a plastic station!",
        });
      }
      if (parseData?.userType === "CUSTOMER") {
        setUserData(parseData);
        setMobile(parseData?.mobile);
        setFullName(parseData?.name);
        setDoneScanning(true);
      } else {
        toast.danger({
          message:
            "unable to read from QR code. please scan with valid QR code",
        });
      }
    } catch (error) {
      toast.danger({
        message: "unable to read from QR code.",
      });
    }
  };

  const handleOptionSelection = (item: any) => {
    setSelectedItem(item);
    setOrg(item?.value);
  };

  return (
    <ScrollContainerLayout topBgColor={colors.secondary}>
      {!doneScanning && cameraPermissionStatus === "authorized" ? (
        <View>
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
          <View style={styles.mainContainer}>
            <View style={globalStyle.aliginCenter}>
              {/* <Button
                onPress={requestCameraPermission}
                title={'Scan QR Code'}
              /> */}
              <TouchableOpacity
                onPress={requestCameraPermission}
                style={{
                  height: 56,
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: LARGE_PADDING_SIZE,
                  backgroundColor: colors.primary,
                  borderRadius: BORDER_RADIUS_SIZE,
                  paddingVertical: MEDIUM_PADDING_SIZE,
                }}
              >
                <TextMedium style={{ color: colors.white }}>
                  Scan QR Code
                </TextMedium>
              </TouchableOpacity>

              <Spacer spacing={10} />

              {/* <TextBold style={{ color: colors.darkGray }}>
                    {'Search by company name'}
                  </TextBold>
                  <Spacer spacing={10} />

                  <FilterDropDown
                    title={''}
                    placeholder={'Select Company'}
                    value={selectedCompany}
                    setValue={setSelectedCompany}
                    data={companyList}
                  /> */}

              <Spacer spacing={20} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  paddingHorizontal: 15,
                }}
              >
                <View style={{ width: "40%" }}>
                  <HorizontalLine color={colors.gray} />
                </View>
                <TextField>OR</TextField>
                <View style={{ width: "40%" }}>
                  <HorizontalLine color={colors.gray} />
                </View>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <Spacer spacing={20} />
              <TextBold style={{ color: colors.darkGray, textAlign: "center" }}>
                {"Search by mobile number"}
              </TextBold>
              <Spacer spacing={10} />
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    flexDirection: "row",
                    paddingRight: 14,
                    alignItems: "center",
                    borderColor: fieldColor,
                  }}
                >
                  <TextInput
                    placeholder="9xx xxx xxxx"
                    style={{
                      height: 50,
                      padding: 10,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      flex: 1,
                      fontSize: 16,
                      color: inputFieldColor,
                    }}
                    placeholderTextColor={colors.gray}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onChangeText={(val) => {
                      setMobile(val);
                      setFullName();
                      setUserData();
                    }}
                    defaultValue={mobile}
                    autoCapitalize={"none"}
                    keyboardType="phone-pad"
                  />

                  <Pressable
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 50,
                      height: 50,
                      marginRight: -14,
                      paddingHorizontal: 12,
                      borderBottomRightRadius: 8,
                      borderTopRightRadius: 8,
                      elevation: 5,
                      backgroundColor: colors.primaryLight2,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                    }}
                    onPress={() => getUserD()}
                  >
                    {searchLoading ? (
                      <ActivityIndicator size={"large"} color={colors.white} />
                    ) : (
                      <DynamicIcon
                        iconFamily="Ionicons"
                        iconName="search-sharp"
                        iconColor={colors.white}
                        iconSize={25}
                      />
                    )}
                  </Pressable>
                </View>
                <Spacer spacing={8} />
              </View>
              {userData && (
                <>
                  <View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        flexDirection: "row",
                        paddingRight: 14,
                        alignItems: "center",
                        borderColor: colors.gray,
                      }}
                    >
                      <TextInput
                        placeholder="Full Name"
                        style={{
                          height: 50,
                          padding: 10,
                          borderBottomLeftRadius: 10,
                          borderTopLeftRadius: 10,
                          flex: 1,
                          fontSize: 16,
                          color: inputFieldColor,
                        }}
                        placeholderTextColor={colors.gray}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onChangeText={(val) => setFullName(val)}
                        defaultValue={fullName}
                        autoCapitalize={"none"}
                        editable={
                          userData?.data?.personalDetails?.name ? false : true
                        }
                      />
                    </View>
                    <Spacer spacing={8} />
                    {userData?.data?.personalDetails?.profileImage && (
                      <View style={{ alignItems: "center" }}>
                        <FastImage
                          source={
                            userData?.data?.personalDetails?.profileImage
                              ? {
                                  uri: userData?.data?.personalDetails
                                    ?.profileImage,
                                }
                              : require("../../../assets/others/userProfile.png")
                          }
                          style={{ width: 150, height: 150, borderRadius: 5 }}
                        />
                        <Spacer spacing={15} />
                      </View>
                    )}
                  </View>
                  <View>
                    {/* <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            flexDirection: 'row',
                            paddingRight: 14,
                            alignItems: 'center',
                            borderColor: colors.gray
                          }}>
                          <TextInput
                            placeholder="Organization"
                            style={{
                              height: 50,
                              padding: 10,
                              borderBottomLeftRadius: 10,
                              borderTopLeftRadius: 10,
                              flex: 1,
                              fontSize: 16,
                              color: inputFieldColor
                            }}
                            placeholderTextColor={colors.gray}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            onChangeText={val => setOrg(val)}
                            defaultValue={org}
                            autoCapitalize={'none'}
                            editable={
                              userData?.data?.companyDetails?.name ? false : true
                            }
                          />
                        </View> */}
                    {/* <DropDown
                      placeholder="Depositor Type"
                      rightIconName="sort-down"
                      setSelectedValue={setOrg}
                      defaultValue={org}
                      combineOnPress={rest =>
                        dispatch(
                          BottomModalActions.toggleBottomModal({
                            title: 'Select Depositor Type',
                            showList: true,
                            data: formProItems,
                            ...rest
                          })
                        )
                      }
                    />
                    <Spacer spacing={8} /> */}
                    <RadioButtonOtpions
                      title="Select Depositor Type"
                      options={formProItems}
                      selectedItem={selectedItem}
                      onSelect={handleOptionSelection}
                    />
                  </View>
                </>
              )}
            </View>
            <Spacer spacing={10} />
            {(userData || selectedCompany) && (
              <Button
                textStyle={{ lineHeight: 18 }}
                onPress={handleSubmit(onSubmit)}
                title={"Confirm"}
                disabled={!!loading}
              >
                {!!loading && <LoadingIndicator activityColor="white" />}
              </Button>
            )}
          </View>
        </>
      )}
    </ScrollContainerLayout>
  );
};
