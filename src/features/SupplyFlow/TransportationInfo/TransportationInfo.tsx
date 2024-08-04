import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import dayjs from "dayjs";
import { colors } from "../../../globals/colors";
import { TextField } from "../../../components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  LARGE_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import Button from "../../../components/Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { BottomModalActions } from "../../../redux/actions/combineAction";

import toast from "../../../services/toast";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { DropDown } from "../../../components/Dropdown/DropDown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transportSchema } from "../../../static/schema/ValidationSchema";
import { ValidationInput } from "../../../components/Input/ValidationInput";
import { ImagePickerView } from "../../../components/ImagePicker/ImagePicker";
import { uploadImage } from "../../../services/uploadImage";
import { screenWidth } from "../../../globals/globalStyles";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import CheckBox from "@src/components/CheckBox/CheckBox";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { FastImage } from "@src/components/image";
import { useTranslation } from "react-i18next";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const TransportationInfo = ({ navigation, route }) => {
  const formOptions = { resolver: yupResolver(transportSchema) };
  const { handleSubmit, ...formProps } = useForm(formOptions);

  const { data } = route?.params;
  const dispatch = useAppDispatch();

  const [vehicleBy, setVehicleBy] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [select, setSelect] = useState(false);

  const { t } = useTranslation();

  const customerList = [
    {
      label: t("Own"),
      value: "OWN",
    },
    {
      label: t("Customer"),
      value: "CUSTOMER",
    },
  ];

  const onSubmit = async (formData) => {
    if (!vehicleBy) {
      return toast.danger({ message: t("Please Select Vehicle By") });
    }

    // if (!image) {
    //   return toast.danger({ message: 'Please add registration plate image' });
    // }

    // if (!image) {
    //   return toast.danger({ message: t("Please add the registration plate") });
    // }
    // if (!invoiceImage) {
    //   return toast.danger({ message: t("Please add the material picture") });
    // }
    if (!select) {
      return toast.danger({ message: t("Please accept declaration") });
    }

    // setIsLoading(true);
    // const imageUrl = image && (await uploadImage(image));
    // const invoiceImageUrl = invoiceImage && (await uploadImage(invoiceImage));
    // setIsLoading(false);

    // console.log(newData);
    // return;
    const newData = {
      ...data,
      ...formData,
      vehicleBy,
    };

    // navigation.navigate("UploadDocument", {
    //   data: newData,
    // });

    // console.log(newData);
    // return;

    setIsLoading(false);
    navigation.navigate("Receipt", {
      data: newData,
    });
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{ paddingVertical: MEDIUM_PADDING_SIZE }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.dropDownView}>
          <ValidationInput
            placeholder={t("Enter Vehicle No.")}
            label={t("Vehicle No.")}
            fieldName="vehicleNo"
            autoCapitalize={"none"}
            {...formProps}
          />

          <TextField
            style={{
              color: colors.dark,
              paddingBottom: 10,
              fontSize: 14,
            }}
          >
            {t("Vehicle By")}
          </TextField>
          <DropDown
            placeholder={t("Vehicle By")}
            backgroundColor="white"
            rightIconName="sort-down"
            setSelectedValue={setVehicleBy}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: t("Select Vehicle By"),
                  showList: true,
                  data: customerList,
                  ...rest,
                })
              )
            }
          />

          <Spacer spacing={10} />

          {/* <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            {t("Registration Plate")} :{"  "}
            <TooltipComp
              children={
                <FastImage
                  source={require("../../../assets/tooltips/platenumber.jpg")}
                  style={{ width: 225, height: 220 }}
                  resizeMode="cover"
                />
              }
              tooltipPosition={"top"}
            />
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray, fontSize: 14 }}>
            {t("Click the image of registration plate")}
          </TextField>
          <Spacer spacing={10} />

          <View style={{}}>
            <FileImagePicker setImage={setImage} title={t("Capture Picture")} />
          </View>
          <Spacer spacing={10} />
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            {t("Material Picture")} :{"  "}
            <TooltipComp
              children={
                <FastImage
                  source={require("../../../assets/tooltips/materialimage.jpg")}
                  style={{ width: 225, height: 220 }}
                  resizeMode="cover"
                />
              }
              tooltipPosition={"top"}
            />
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray, fontSize: 14 }}>
            {t("Click the image of material")}
          </TextField>
          <Spacer spacing={10} />
          <View style={{}}>
            <FileImagePicker
              setImage={setInvoiceImage}
              title={t("Capture Picture")}
            />
          </View> */}
          {/* <Spacer spacing={15} /> */}
          <Pressable
            onPress={() => setSelect((pre) => !pre)}
            style={styles.rowCheckBox}
          >
            <CheckBox isSelected={select} />
            <TextField style={styles.checkTextWidth}>
              {t(
                "I declare that the certified materials from PULL Project comprise the part load/ full truck load as per the vehicle details and documents uploaded"
              )}
            </TextField>
          </Pressable>
          <Spacer spacing={10} />
        </View>
        <Button
          title={t("Next")}
          // onPress={() => navigation.navigate('UploadDocument')}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading && <LoadingIndicator activityColor="white" />}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkTextWidth: {
    maxWidth: "90%",
  },
  rowCheckBox: {
    flexDirection: "row",
    gap: 10,
  },
  mainContainer: {
    // flex: 1,
    alignContent: "center",
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dayTitle: {
    fontSize: 12,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
  },
  marginTop: {
    marginTop: BORDER_RADIUS_SIZE,
  },
  marginLeft: {
    marginLeft: BORDER_RADIUS_SIZE,
  },
  dateText: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  selectedDateStyle: {
    color: colors.white,
  },
  checkBoxContainer: {
    flex: 0.1,
  },
  calendarView: {
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
    paddingVertical: LARGE_PADDING_SIZE,
  },
  Icon: {
    height: 80,
    width: 80,
  },
  headerTitle: {
    color: colors.secondary,
  },
  stepTitle: {
    color: colors.primary,
    marginBottom: BORDER_RADIUS_SIZE,
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },
  box: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    width: 60,
    height: 70,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBoxStyle: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },
  timeFlexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: 6,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  lineSeparator: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: MEDIUM_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
  },
  leftButtonStyle: {
    width: "45%",
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
    marginRight: MEDIUM_PADDING_SIZE,
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
    paddingBottom: HALF_MEDIUM_PADDING_SIZE,
  },
});
