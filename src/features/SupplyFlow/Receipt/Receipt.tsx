import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import dayjs from "dayjs";
import { colors } from "../../../globals/colors";
import { TextField } from "../../../components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import Button from "../../../components/Button/Button";
import { globalStyle } from "../../../globals/globalStyles";
import CongratulationsModal from "../../../components/CongratulationsModal/CongratulationsModal";
import { useAppDispatch } from "../../../redux/store";
import { postOrderReturnActions } from "../../../redux/actions/combineAction";
import { useSelector } from "react-redux";
import {
  selectPostOrderReturnSuccess,
  selectProfile,
} from "../../../redux/selectors";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import { FastImage } from "../../../components/image";
import { axiosInstance } from "../../../helpers/axiosHelper";
import toast from "../../../services/toast";
import {
  playPause,
  releaseAudio,
  initializeAudio,
} from "../../../utils/soundUtils";
import { useTranslation } from "react-i18next";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const Receipt = ({ navigation, route }) => {
  const postSuccess = useSelector(selectPostOrderReturnSuccess);

  const { data } = route?.params;
  console.log(data, "hello");

  const profileData = useSelector(selectProfile);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);

  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  useEffect(() => {
    console.log(postSuccess);
    postSuccess && setisModalVisible(true);
  }, [postSuccess]);

  const _onRequestClose = () => {
    setisModalVisible(false);
    dispatch(
      postOrderReturnActions.update({ success: false, successData: {} })
    );
    navigation.navigate("LandingStack");
  };

  const _onConfirmPress = () => {
    // dispatch(postOrderReturnActions.update({ success: true, successData: {} }));
    setIsLoading(true);
    const postData = { ...data };
    // delete postData.customerNew;
    // delete postData.customer;
    // delete postData.slipImg;
    // delete postData.transportImage;
    // delete postData.invoiceImg;

    const images = [];
    if (data.slipImg) images.push(data.slipImg);
    if (data.transportImage) images.push(data.transportImage);
    if (data.invoiceImg) images.push(data.invoiceImg);

    postData["images"] = images;

    console.log(postData);

    // setIsLoading(false);
    // setisModalVisible(true);
    // playPause();
    // return;

    axiosInstance
      .post("order", postData)
      .then((res) => {
        if (res.status === 200) {
          setisModalVisible(true);
          setIsLoading(false);
          playPause();
        } else {
          toast.danger({ message: "Something went wrong!" });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.danger({ message: "Something went wrong!" });
        setIsLoading(false);
      });
  };

  const { t } = useTranslation();

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{ paddingVertical: MEDIUM_PADDING_SIZE }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.dropDownView}>
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            {t("Material Info")} :
          </TextField>

          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: colors.primary,
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <TextField style={{ color: "white" }}>
                {data?.data.length ? data.data[0].categoryName : ""}
              </TextField>
            </View>
            <View
              style={[
                { flexDirection: "row", justifyContent: "space-between" },
                {
                  backgroundColor: colors.cardColor,
                  paddingVertical: 10,
                  paddingLeft: 20,
                },
              ]}
            >
              <TextField
                style={[styles.dataLeft, { flex: 0.6, fontWeight: "bold" }]}
              >
                {t("Item")}
              </TextField>
              <TextField
                style={{ flex: 0.3, textAlign: "center", fontWeight: "bold" }}
              >
                {t("Qty")}
              </TextField>
            </View>
            {data?.data.length && data?.data[0].items?.length ? (
              data?.data[0].items.map((item) => (
                <View
                  style={[
                    { flexDirection: "row", justifyContent: "space-between" },
                    {
                      paddingVertical: 10,
                      paddingLeft: 20,
                    },
                  ]}
                >
                  <TextField style={[styles.dataLeft, { flex: 0.6 }]}>
                    {item.itemName}
                  </TextField>
                  <TextField style={{ flex: 0.3, textAlign: "center" }}>
                    {item.quantity}
                  </TextField>
                </View>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
        <Spacer spacing={10} />

        <View style={styles.dropDownView}>
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {t("Aggregator Info")} :
          </TextField>

          <View>
            <View style={styles.dataRow}>
              <TextField style={styles.dataLeft}>{t("Name")} :</TextField>
              <TextField style={styles.dataRightBold}>
                {profileData?.personalDetails?.name}
              </TextField>
            </View>
          </View>
          <View>
            <View style={styles.dataRow}>
              <TextField style={styles.dataLeft}>{t("Address")} :</TextField>
              <TextField style={styles.dataRightBold}>
                {profileData?.address?.street}, {profileData?.address?.city},{" "}
                {profileData?.address?.state}
              </TextField>
            </View>
          </View>
        </View>
        <Spacer spacing={10} />
        <View style={styles.dropDownView}>
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {t("Recycler Info")} :
          </TextField>
          <View>
            <View style={styles.dataRow}>
              <TextField style={styles.dataLeft}>{t("Name")} :</TextField>
              <TextField style={styles.dataRightBold}>
                {data?.recyclerInfo?.label || data?.customerNew?.customerName}
              </TextField>
            </View>
          </View>
          {!data?.customerId ? (
            <View>
              <View style={styles.dataRow}>
                <TextField style={styles.dataLeft}>{t("Address")} :</TextField>
                <TextField style={styles.dataRightBold}>
                  {data?.recyclerInfo &&
                    data.recyclerInfo?.address?.street +
                      ", " +
                      data.recyclerInfo?.address?.city +
                      ", " +
                      data.recyclerInfo?.address?.country}
                </TextField>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Spacer spacing={15} />
        {data.transportImage && (
          <>
            <TextField style={{ color: colors.dark, marginBottom: 5 }}>
              {t("Registration Plate Image")}
            </TextField>
            <View
              style={{
                borderWidth: 0.5,
                marginBottom: 5,
                backgroundColor: colors.dark,
              }}
            />
            <Spacer spacing={5} />
            <FastImage
              source={{ uri: data.transportImage }}
              resizeMode="contain"
              style={{
                height: 200,
              }}
            />
          </>
        )}

        {/* {data?.slipImg ? (
          <>
            <Spacer spacing={15} />
            <TextField style={{ color: colors.dark, marginBottom: 5 }}>
              Weighment Slip Image
            </TextField>
            <View
              style={{
                borderWidth: 0.5,
                marginBottom: 5,
                backgroundColor: colors.dark,
              }}
            />
            <Spacer spacing={5} />
            <FastImage
              source={{ uri: data.slipImg }}
              resizeMode="contain"
              style={{
                height: 200,
              }}
            />
          </>
        ) : (
          <></>
        )} */}

        {data?.invoiceImg ? (
          <>
            <Spacer spacing={15} />
            <TextField style={{ color: colors.dark, marginBottom: 5 }}>
              {t("Invoice Image")}
            </TextField>
            <View
              style={{
                borderWidth: 0.5,
                marginBottom: 5,
                backgroundColor: colors.dark,
              }}
            />
            <Spacer spacing={5} />
            <FastImage
              source={{ uri: data.invoiceImg }}
              resizeMode="contain"
              style={{
                height: 200,
              }}
            />
          </>
        ) : (
          <></>
        )}

        <Button
          title={t("Save")}
          onPress={_onConfirmPress}
          disabled={isLoading}
        >
          {isLoading && <LoadingIndicator activityColor="white" />}
        </Button>
      </View>
      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}
      >
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          heading=""
          message={t("The material has been successfully dispatched.")}
          bottomContent={
            <View style={{ ...globalStyle.container }}>
              <Button
                style={{
                  width: "80%",
                  backgroundColor: colors.white,
                  borderColor: colors.secondary,
                  borderWidth: 1,
                }}
                textStyle={{ color: colors.secondary }}
                title={t("Done")}
                onPress={_onRequestClose}
              />
            </View>
          }
        />
      </CongratulationsModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignContent: "center",
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },

  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  dataLeft: { width: "25%", textAlign: "left" },
  dataRightBold: {
    width: "70%",
    textAlign: "right",
    fontWeight: "bold",
  },
  dataRight: {
    width: "55%",
    textAlign: "right",
  },

  textStyle: {
    color: colors.dark,
  },
  dropDownView: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
    padding: MEDIUM_PADDING_SIZE,
  },
});
