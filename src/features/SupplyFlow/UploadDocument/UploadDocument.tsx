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

import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useForm } from "react-hook-form";
import { ImagePickerView } from "../../../components/ImagePicker/ImagePicker";
import { uploadImage } from "../../../services/uploadImage";
import { screenWidth } from "../../../globals/globalStyles";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import CheckBox from "@src/components/CheckBox/CheckBox";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const UploadDocument = ({ navigation, route }) => {
  const { handleSubmit } = useForm();

  const { data } = route?.params;

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [select, setSelect] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const slipImageUrl = image && (await uploadImage(image));
    const invoiceImageUrl = invoiceImage && (await uploadImage(invoiceImage));

    const newData = {
      ...data,
      slipImg: slipImageUrl,
      invoiceImg: invoiceImageUrl,
    };

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
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            Weighment Slip :
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray, fontSize: 14 }}>
            Click the image of Weighment Slip if any
          </TextField>
          <Spacer spacing={10} />

          <View style={{ width: screenWidth / 2, alignSelf: "center" }}>
            <FileImagePicker setImage={setImage} title={"Capture Picture"} />
          </View>
          <Spacer spacing={20} />

          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            Invoice :
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray, fontSize: 14 }}>
            Click the image of Invoice if any
          </TextField>
          <Spacer spacing={10} />

          <View style={{ width: screenWidth / 2, alignSelf: "center" }}>
            <FileImagePicker
              setImage={setInvoiceImage}
              title={"Capture Picture"}
            />
          </View>
          <Spacer spacing={15} />
          <Pressable
            onPress={() => setSelect((pre) => !pre)}
            style={styles.rowCheckBox}
          >
            <CheckBox isSelected={select} />
            <TextField style={styles.checkTextWidth}>
              I declare that the certified materials from PULL Project comprise
              the part load/ full truck load as per the vehicle details and
              documents uploaded
            </TextField>
          </Pressable>
          <Spacer spacing={10} />
        </View>
        <Button
          title={"Next"}
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
  mainContainer: {
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
  rowCheckBox: {
    flexDirection: "row",
    gap: 10,
  },
  checkTextWidth: {
    maxWidth: "90%",
  },
});
