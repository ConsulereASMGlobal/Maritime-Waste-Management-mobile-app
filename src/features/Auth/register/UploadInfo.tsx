import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";

import { CardLayout } from "@src/components/Layouts/CardLayout";
import TitleLogoView from "../Components/TitleLogoView";
import { colors } from "@src/globals/colors";
import {
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import Button from "@src/components/Button/Button";
import ImageBg from "../Components/ImageBg";
import HorizontalCount from "../Components/HorizontalCount";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadImage } from "@src/services/uploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "@src/static/schema/ValidationSchema";
import toast from "@src/services/toast";
import CheckBox from "@src/components/CheckBox/CheckBox";
import { FastImage } from "@src/components/image";

interface Props {
  navigation?: any;
  route?: any;
}
type InputProps = {
  idNumber: string;
};

export const UploadInfo = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata, "nextstep");
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState();
  const [selfie, setSelfie] = useState();
  const [same, setSame] = useState(false);
  const [sameImage, setSameImage] = useState();
  const formOptions = {
    resolver: yupResolver(UploadSchema),
  };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const [zipCode, setZipCode] = useState();
  const handleCheckbox = () => {
    setSame(!same);

    setSameImage(regdata?.filterFran?.kycDocument[0]?.docUrl);
    setImageID(regdata?.filterFran?.kycDocument[0]?.docUrl);
  };
  useEffect(() => {
    if (!same) {
      setSame(false);
      setSameImage();
    }
  }, [same]);
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    setLoading(true);

    const idImage = sameImage ? sameImage : await uploadImage(imageID);

    setLoading(false);
    if (!idImage) {
      toast.danger({
        message: `Please ${
          regdata?.userType === "CUSTOMER" ? "Upload NRIC" : "Upload SSM"
        }`,
      });
      return;
    }
    let selfieImage = "";
    if (regdata?.userType === "CUSTOMER") {
      setLoading(true);
      selfieImage = await uploadImage(selfie);
      setLoading(false);
      if (!selfieImage) {
        toast.danger({ message: "Please upload Selfie" });
        return;
      }
    }

    navigation.navigate("passwordSet", {
      regdata: {
        ...regdata,
        kycDocument: [
          {
            docUrl: idImage,
            docNumber: regdata?.nricNo || "",
            docType: "POE",
          },
          {
            docUrl: selfieImage,
            docNumber: "",
            docType: "POI",
          },
        ],
      },
    });
  };
  return (
    <ScrollContainerLayout
      topBgColor={colors.primaryLight2}
      btmBgColor={colors.primaryLight2}
      // contentStyle={{ flex: 1 }}
      scrollBgColor={colors.primaryLight2}
    >
      <ImageBg />
      {/* <LogoContainer /> */}
      {/* <View
        style={{
          backgroundColor: colors.secondary,
          height: 75,
        }}
      /> */}
      <TitleLogoView
        title={"Create an account"}
        desc={"Enter your information to start your eco-journey now!"}
        titleSize={24}
      />
      <View>
        <CardLayout style={{ top: 0 }}>
          <View style={styles.rootContainer}>
            <View style={styles.mainContainer}>
              <HorizontalCount text={4} />
              <Spacer spacing={10} />

              <View style={{ alignSelf: "flex-start" }}>
                <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                  {`Upload ID`}
                </TextBold>
                <Spacer spacing={3} />
              </View>
              <View style={{ width: "100%" }}>
                <Spacer spacing={10} />
                {same && sameImage ? (
                  <FastImage
                    source={{ uri: sameImage }}
                    style={{ width: 200, height: 200, alignSelf: "center" }}
                  />
                ) : (
                  <>
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center",
                      }}
                    >
                      <FileImagePicker
                        setImage={setImageID}
                        title={
                          regdata?.userType === "CUSTOMER"
                            ? "Upload NRIC"
                            : "Upload SSM"
                        }
                      />
                    </View>
                  </>
                )}
                <Spacer spacing={10} />
                {regdata?.userType === "CUSTOMER" && (
                  <>
                    <FileImagePicker
                      setImage={setSelfie}
                      title={"Profile Picture"}
                    />
                    <Spacer spacing={10} />
                  </>
                )}
                {regdata?.userType === "PICKUP_POINT" && (
                  <Pressable
                    style={styles.rowCheckBox}
                    onPress={() => handleCheckbox()}
                  >
                    <CheckBox isSelected={same} />
                    <TextField style={styles.checkTextWidth}>
                      Select if Aggregator's incorporation certificate are the
                      same as Franchisee's
                    </TextField>
                  </Pressable>
                )}
                <Button
                  textStyle={{ marginRight: 0 }}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!!loading}
                  title={"Next"}
                >
                  {!!loading && <LoadingIndicator activityColor="white" />}
                </Button>
              </View>
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
              <Spacer spacing={10} />
            </View>
          </View>
        </CardLayout>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },

  rootContainer: {
    flex: 1,
    paddingHorizontal: REGULAR_PADDING_SIZE / 2,
  },
  rowCheckBox: {
    flexDirection: "row",
    gap: 10,
  },
  checkTextWidth: {
    maxWidth: "90%",
    lineHeight: 24,
  },
});
