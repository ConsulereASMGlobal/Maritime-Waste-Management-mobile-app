import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextField } from "../../components/TextField/TextField";
import {
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../globals/themes";
import { colors } from "../../globals/colors";
import QRCode from "react-native-qrcode-svg";
import { Spacer } from "../../components/common/Spacer";
import { HorizontalLine } from "../../components/common/HorizontalLine";
import { ProfileDetails } from "./ProfileDetails";
import { selectProfile, selectUserId } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { FastImage } from "../../components/image/index";
import { Fonts } from "../../globals/themes";
import { epochToHumanReadableYear } from "../../utils/dateUtils";
import Button from "../../components/Button/Button";
import { ProfileAPI } from "../../services/api";
import { authActions, profileActions } from "../../redux/actions/combineAction";
import ImagePicker from "react-native-image-crop-picker";
import toast from "../../services/toast";
import { uploadImage } from "../../services/uploadImage";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { DynamicIcon } from "../../utils/Dynamic/DynamicIcon";
import { Platform } from "react-native";
import GradientBackground from "@src/components/GradientBackground";
import BankDetails from "./Components/BankDetails";
import KYCDocument from "./Components/KYCDocument";
import { useTranslation } from "react-i18next";

export const MyProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(selectProfile);
  const [loading, setLoading] = useState(false);
  const [profieImage, setProfileImage] = useState(null);
  // const [userData, setUserData] = useState(profileData);

  const requestCameraPermision = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Marea App Camera Permission",
          message:
            "Marea App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const pickSingleWithCamera = async (
    cropping = true,
    mediaType: "video" | "photo" = "photo"
  ) => {
    await requestCameraPermision();
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      compressImageQuality: 0.2,
      cameraType: "front",
    })
      .then(async (image) => {
        console.log("received image", image);
        if (image?.size > 125000) {
          return toast.danger({ message: "Please use image less than 1Mb" });
        }
        setProfileImage({
          uri: image?.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch();
  };

  useEffect(() => {
    if (profieImage) {
      updateProfile();
    }
  }, [profieImage]);

  const updateProfile = async () => {
    setLoading(true);
    const profileUrl = await uploadImage(profieImage);
    // setUserData({
    //   ...userData,
    //   personalDetails: {
    //     ...userData.personalDetails,
    //     profileImage: profileUrl
    //   }
    // });

    const sendData = {
      title: profileData?.personalDetails?.title,
      firstName: profileData?.personalDetails?.name,
      lastName: "",
      email: profileData?.personalDetails?.email,
      mobile: profileData?.personalDetails?.mobile,
      userType: "PICKUP_POINT",
      profileImage: profileUrl,
      customerType: "COLLECTION_STORE",
      address: {
        country: profileData?.address?.country,
        state: profileData?.address?.state,
        city: profileData?.address?.city,
        zipCode: profileData?.address?.zipCode,
        street: profileData?.address?.street,
        landMark: "",
        latitute: profileData?.address?.latitute,
        longitute: profileData?.address?.longitute,
        countryCode: profileData?.address?.countryCode ?? "",
      },
    };

    ProfileAPI.updateUser({ id: profileData?.id, data: sendData }).then(
      (res) => {
        setLoading(false);
        if (res?.data?.data) {
          dispatch(profileActions.getProfile({ id: profileData?.id }));
        } else {
          return toast.danger({
            message: "Please try to upload again with new image!",
          });
        }
      }
    );
  };

  const userId = useSelector(selectUserId);

  const deleteAccount = () => {
    ProfileAPI.deleteUser({ userId }).then((res) => {
      if (res?.data) {
        dispatch(authActions.logout());
      } else {
        Alert.alert("Alert", "Delete Account failed, please try again.", [
          { text: "ok", onPress: () => console.log("not deleted") },
        ]);
      }
    });
  };
  const userType = profileData?.userType;

  if (loading) {
    return <LoadingIndicator />;
  }

  const { t } = useTranslation();

  return (
    <View style={{ backgroundColor: "#E8ECF280", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GradientBackground>
          <View style={{ height: 150 }}></View>
        </GradientBackground>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.white,
              top: -100,
              marginHorizontal: 15,
              borderRadius: 16,
              elevation: 2,
              paddingVertical: 40,
            }}
          >
            <View style={styles.profileContainer}>
              <View>
                <FastImage
                  source={
                    profileData?.personalDetails?.profileImage
                      ? { uri: profileData?.personalDetails?.profileImage }
                      : require("../../assets/others/userProfile.png")
                  }
                  resizeMode="cover"
                  style={styles.profileImg}
                />

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 85,
                    right: Platform.OS === "ios" ? 7 : 25,
                    backgroundColor: colors.borderColor,
                    padding: 5,
                    borderRadius: 20,
                    zIndex: 99999,
                  }}
                  onPress={() => pickSingleWithCamera()}
                >
                  <DynamicIcon
                    iconColor={colors.primary}
                    iconName="camera"
                    iconOnPress={() => pickSingleWithCamera()}
                  />
                </TouchableOpacity>

                <Spacer spacing={10} />
                <View style={styles.textContainer}>
                  <TextField
                    style={[
                      styles.nameText,
                      {
                        color: colors.dark,
                        fontWeight: "bold",
                        textAlign: "center",
                      },
                    ]}
                  >
                    {profileData?.personalDetails?.name}
                  </TextField>
                  <TextField
                    style={[
                      {
                        marginTop: 5,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {profileData?.userType === "CUSTOMER"
                      ? t("Collection Agent")
                      : profileData?.userType === "PICKUP_POINT"
                      ? t("Aggregator")
                      : t("Recycler")}
                  </TextField>
                </View>
              </View>
              <Spacer spacing={5} />
              <HorizontalLine />
            </View>
            <View style={styles.profileDetailsContainer}>
              <Spacer spacing={10} />
              <ProfileDetails profileData={profileData} />
            </View>
          </View>
        </View>
        <Spacer spacing={10} />

        <BankDetails profileData={profileData} />

        <Spacer spacing={10} />
        {userType === "CUSTOMER" && (
          <>
            <KYCDocument profileData={profileData} />
            <Spacer spacing={10} />
          </>
        )}

        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 16,
            top: -100,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <StatsCard
            title={t("Active Status")}
            data={t(profileData?.status) || "N/A"}
            icon={require("../../assets/profileIcons/active.png")}
          />
          <StatsCard
            title={t("Partner Since")}
            data={
              profileData?.createdAt
                ? epochToHumanReadableYear(profileData?.createdAt)
                : "N/A"
            }
            icon={require("../../assets/profileIcons/user.png")}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            padding: MEDIUM_PADDING_SIZE,
            top: -50,
          }}
        >
          <QRCode
            size={240}
            logoBackgroundColor={colors.white}
            logo={require("../../assets/logo/appicon.png")}
            value={JSON.stringify({
              name: profileData?.personalDetails?.name,
              id: profileData?.id,
              userType: profileData?.userType,
            })}
          />
          <Spacer spacing={20} />
          <Button
            style={{ backgroundColor: colors.error }}
            title={t("Delete Account")}
            onPress={() => {
              Alert.alert(
                t("Warning"),
                t("Do you want to delete your account?"),
                [
                  {
                    text: t("No"),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: t("Yes"), onPress: () => deleteAccount() },
                ]
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const StatsCard = ({ title, data, icon }: any) => {
  return (
    <View
      style={{
        elevation: 2,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 16,
        backgroundColor: colors.white,
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          backgroundColor: colors.secondaryAlpha(0.1),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FastImage source={icon} resizeMode="contain" style={styles.icon} />
      </View>
      <Spacer spacing={5} />
      <TextField style={{ marginVertical: 5 }}>{title}</TextField>
      <TextField style={{ fontWeight: "bold" }}>{data}</TextField>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  profileDetailsContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    justifyContent: "center",
  },
  profileImg: {
    height: 120,
    width: 120,
    alignSelf: "center",
    borderRadius: 100,
  },
  textContainer: { marginBottom: 15, alignItems: "center" },
  nameText: { fontSize: 20, lineHeight: 26 },
  idText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 26,
    fontFamily: Fonts.PoppinsLight,
  },
  icon: {
    height: 24,
    width: 24,
  },
});
