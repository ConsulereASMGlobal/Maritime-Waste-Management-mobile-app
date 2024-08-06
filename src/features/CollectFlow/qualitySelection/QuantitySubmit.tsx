import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { styles as GlobalStyles } from "../../SupplyFlow/StockScreen/styles";
import { TextField, TextMedium } from "../../../components/TextField/TextField";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Spacer } from "../../../components/common/Spacer";
import { FastImage } from "../../../components/image";
import { colors } from "../../../globals/colors";
import { screenWidth } from "../../../globals/globalStyles";
import RoundCheckIcon from "../../../assets/svgIcon/icon_tick_round.svg";

import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { yupResolver } from "@hookform/resolvers/yup";
import { quantityPickchema } from "../../../static/schema/ValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import toast from "../../../services/toast/index";
import RadioButtonOtpions from "../Components/RadioOptions";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import dayjs from "dayjs";
import { uploadImage } from "@src/services/uploadImage";
import { selectInfo } from "@src/redux/selectors";
import Geolocation from "@react-native-community/geolocation";
import { orderAPI } from "@src/services/api";
import {
  initializeAudio,
  playPause,
  releaseAudio,
} from "@src/utils/soundUtils";
import Tooltip from "react-native-walkthrough-tooltip";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { useTranslation } from "react-i18next";
import { LoadingIndicator } from "@src/components/LoadingIndicator";

type InputProps = {
  quantity: string;
};

export const QuantitySubmit = ({ onFocus, onBlur }: TextInputProps) => {
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const { t } = useTranslation();

  const [toolTipVisible, setToolTipVisible] = useState(false);

  const wasteSources = [
    { id: 1, label: t("Post Consumer"), value: t("Post Consumer") },
    {
      id: 3,
      label: t("Post Industrial"),
      value: "Post Industrial",
    },
  ];
  const [comment, setComment] = useState(wasteSources[0]?.value);
  const [quantity, setQuantity] = useState();

  const route = useRoute();
  const { payload, categoryList, index }: any = route?.params;
  const [selectedItem, setSelectedItem] = useState(wasteSources[0]);

  const navigation = useNavigation<any>();

  const formOptions = { resolver: yupResolver(quantityPickchema) };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const maxTwoDecimalRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;
  const [image, setImage] = useState<any>(null);
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [pickDate, setPickDate] = useState<any>(new Date());
  const { customerOrg } = useSelector(selectInfo);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  }, []);

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // if (!quantity) {
    //   toast.danger({ message: t("Quantity is required") });
    //   return;
    // }

    // if (!maxTwoDecimalRegExp.test(quantity)) {
    //   toast.danger({
    //     message: t("Quantity should have at most two decimal places"),
    //   });
    //   return;
    // }

    let tempItem = [...categoryList];
    const newPayload = {
      ...payload,
      data: [
        {
          categoryId: payload?.data?.[0]?.categoryId,
          items: tempItem,
        },
      ],
    };

    const items = newPayload?.data?.[0]?.items?.filter(
      (item: any) => item?.quantity > 0
    );

    if (!image) {
      return toast.danger({ message: t("Click the image of material") });
    }

    setLoading(true);
    const imageUrl = await uploadImage(image);
    let image1Url, image2Url;

    if (image1) {
      image1Url = await uploadImage(image1);
    }
    if (image2) {
      image2Url = await uploadImage(image2);
    }

    const imageArr = [imageUrl];

    if (image1Url) {
      imageArr.push(image1Url);
    }

    if (image2Url) {
      imageArr.push(image2Url);
    }
    // console.log(imageArr, "----");
    // return;
    const sendData = {
      ...{
        ...payload,
        data: [{ categoryId: items[0]?.categoryId, items }],
      },
      totalAmount: 0,
      images: imageArr,
      orderType: "COLLECT",
      customerId: payload?.customerId,
      source: customerOrg,
      collectionDate: pickDate.getTime(),
      latitude: location?.latitude,
      longitude: location?.longitude,
    };

    orderAPI.postOrders(sendData).then((res) => {
      console.log(res, "response");
      setLoading(false);
      if (res?.data) {
        playPause();
        navigation.navigate("collectReceipt", {
          orderID: res?.data?.data?.orderId,
        });
      } else {
        return toast.danger({ message: "Something went wrong!" });
      }
    });
  };
  const _addMore = async () => {
    if (!quantity) {
      toast.danger({ message: "Quantity is required" });
      return;
    }

    if (!maxTwoDecimalRegExp.test(quantity)) {
      toast.danger({
        message: "Quantity should have at most two decimal places",
      });
      return;
    }
    // if (!brand) {
    //   toast.danger({ message: 'Brand is required' });
    //   return;
    // }
    // if (!form) {
    //   toast.danger({ message: 'Form is required' });
    //   return;
    // }
    let tempItem = [...categoryList];
    tempItem[index].quantity = quantity;
    tempItem[index].brand = "";
    tempItem[index].form = "";
    tempItem[index].remark = comment;

    navigation.goBack({
      payload: {
        ...payload,
        data: [
          {
            categoryId: payload?.data?.[0]?.categoryId,
            items: tempItem,
          },
        ],
      },
    });
  };
  const [isFocused, setIsFocus] = useState(false);

  const handleFocus = (e: any) => {
    onFocus && onFocus(e);
    setIsFocus(true);
  };
  const handleBlur = (e: any) => {
    onBlur && onBlur(e);
    setIsFocus(false);
  };
  const handleOptionSelection = (item: any) => {
    if (item?.id === 3) {
      toast.danger({
        message: "Sorry we are not accepting this type of material",
      });
      return;
    }
    setSelectedItem(item);
    setComment(item?.value);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView
        style={GlobalStyles.mainContainer}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        {/* <TextMedium style={GlobalStyles.headerTitle}>
          {t("You have selected")} {item?.name}
        </TextMedium>

        <View style={styles.imagecontainer}>
          <RoundCheckIcon style={styles.tick} />
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FastImage
              source={{ uri: item?.icon }}
              style={{ height: 40, width: 40 }}
              resizeMode={"contain"}
            />
          </View>
          <TextMedium style={styles.textTitle}>{item?.name}</TextMedium>
        </View> */}

        {/* <View style={styles.line} /> */}
        <View style={{ width: "100%", padding: 12 }}>
          {/* <TextField
            style={{
              color: colors.dark,
              paddingBottom: 5,
              fontSize: 14,
            }}
          >
            {t("Quantity")}
          </TextField>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,
              paddingRight: 14,
              borderColor: isFocused ? colors.primary : colors.gray,
            }}
          >
            <TextInput
              placeholder={t("Quantity")}
              placeholderTextColor={colors.gray}
              style={{
                height: 50,
                padding: 10,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                fontSize: 16,
                width: "92%",
                color: colors.dark,
              }}
              keyboardType="decimal-pad"
              // maxLength={10}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={(val) => setQuantity(val)}
            />
            <View
              style={{
                backgroundColor: colors.primaryLight2,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                marginTop: -2,
                marginBottom: -1,
                width: "13%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: colors.white }}>{"KG"}</Text>
            </View>
          </View>

          <Spacer spacing={7} />

          <RadioButtonOtpions
            title={t("Choose Source of Waste")}
            options={wasteSources}
            selectedItem={selectedItem}
            onSelect={handleOptionSelection}
          />

          <Spacer spacing={10} /> */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: image ? "46%" : "100%" }}>
              <FileImagePicker
                setImage={setImage}
                title={image ? "" : t("Upload Image")}
              />
            </View>
            <View style={{ width: image1 ? "46%" : "100%" }}>
              {image && (
                <FileImagePicker
                  setImage={setImage1}
                  title={image1 ? "" : t("Add More Image")}
                />
              )}
            </View>
            <View style={{ width: image2 ? "46%" : "100%" }}>
              {/* <Spacer spacing={5} /> */}
              {image1 && (
                <FileImagePicker
                  setImage={setImage2}
                  title={image2 ? "" : t("Add More Image")}
                />
              )}
            </View>
          </View>
          <Spacer spacing={5} />

          <TextField style={{ textAlign: "center", fontSize: 14 }}>
            {t("Proof of Loading")}{" "}
            <TooltipComp
              children={
                <FastImage
                  source={require("../../../assets/tooltips/weighmentscale.jpeg")}
                  style={{ width: 225, height: 220 }}
                  resizeMode="cover"
                />
              }
              tooltipPosition={"top"}
            />
          </TextField>
          <Spacer spacing={2} />
          <TextField style={{ marginTop: 15, fontSize: 12 }}>
            {t(
              "Note: Please ensure photos capture the weight details of the materials"
            )}
          </TextField>
          <Spacer spacing={10} />

          <View>
            <TextField>{t("Actual Loading Date")}:</TextField>
            <Spacer spacing={5} />

            <ValidationInput
              placeholder="Select Date"
              fieldName="date"
              autoCapitalize={"none"}
              mode="datePicker"
              maxToday
              iconName={""}
              leftIconName={"calendar-month-outline"}
              leftIconFamily="MaterialCommunityIcons"
              leftIconColor={colors.gray}
              defaultValue={dayjs(new Date()).format("DD/MM/YYYY")}
              setPickDate={setPickDate}
              {...formProps}
            />
          </View>
          <View style={GlobalStyles.flexRow}>
            {/* <Button
              title="Add More"
              textStyle={GlobalStyles.textStyle}
              style={GlobalStyles.leftButtonStyle}
              onPress={() => _addMore()}
            /> */}
            <Button
              onPress={handleSubmit(onSubmit)}
              title={loading ? "Loading..." : t("Confirm")}
              disabled={loading}
            >
              {loading && <LoadingIndicator activityColor="white" />}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imagecontainer: {
    padding: 10,
    alignItems: "center",
    // height: 120,
    width: screenWidth / 3,
    justifyContent: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    margin: MEDIUM_PADDING_SIZE,
    marginBottom: 0,
    marginTop: REGULAR_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
    position: "relative",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textTitle: {
    fontSize: 14,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
  },

  line: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: MEDIUM_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
  },
  tick: {
    position: "absolute",
    top: -7,
    right: -7,
  },
});
