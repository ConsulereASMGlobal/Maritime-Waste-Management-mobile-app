import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

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
import {
  bankSchema,
  passwordSchema,
  UploadSchema,
} from "@src/static/schema/ValidationSchema";
import toast from "@src/services/toast";
import { DropDown } from "@src/components/Dropdown/DropDown";
import { BottomModalActions } from "@src/redux/actions/combineAction";
import { banks } from "./bankList";
import { useDispatch } from "react-redux";

interface Props {
  navigation?: any;
  route?: any;
}
type InputProps = {
  idNumber: string;
};

export const PasswordSet = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata, "nextstep");
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState();
  const [selfie, setSelfie] = useState();
  const [bank, setBank] = useState();
  const dispatch = useDispatch();

  const formOptions = {
    resolver: yupResolver(passwordSchema),
  };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // setLoading(true);

    // const idImage = await uploadImage(imageID);
    // const selfieImage = await uploadImage(selfie);

    // setLoading(false);
    // if (!idImage) {
    //   toast.danger({ message: "Please upload ID" });
    //   return;
    // }
    // if (!selfieImage) {
    //   toast.danger({ message: "Please upload Selfie" });
    //   return;
    // }

    navigation.navigate("lastStep", {
      regdata: {
        ...regdata,
        password: data?.password,
        // kycDocument: [
        //   {
        //     docUrl: selfieImage,
        //     docNumber: "",
        //     docType: "selfie",
        //   },
        //   {
        //     docUrl: idImage,
        //     docNumber: "",
        //     docType: "POI",
        //   },
        // ],
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
              <HorizontalCount text={5} />
              <Spacer spacing={10} />

              <View style={{ alignSelf: "flex-start" }}>
                <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                  {`Set Password`}
                </TextBold>
                <Spacer spacing={5} />
              </View>
              <View style={{ width: "100%" }}>
                <ValidationInput
                  placeholder="Password"
                  fieldName="password"
                  label="Password*"
                  secureTextEntry
                  iconName="eye"
                  iconFamily="Feather"
                  {...formProps}
                />
                <ValidationInput
                  placeholder="Confirm Password"
                  fieldName="cPassword"
                  label="Confirm Password*"
                  secureTextEntry
                  iconName="eye"
                  iconFamily="Feather"
                  {...formProps}
                />
                <TextField>
                  **Note: Password must contain at least 8 characters, one
                  uppercase, one number and one special case character
                </TextField>
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
});
