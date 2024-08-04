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
import {
  bankSchema,
  customerBankSchema,
  UploadSchema,
} from "@src/static/schema/ValidationSchema";
import toast from "@src/services/toast";
import { DropDown } from "@src/components/Dropdown/DropDown";
import { BottomModalActions } from "@src/redux/actions/combineAction";
// import { banks } from "./bankList";
import { useDispatch } from "react-redux";
import CheckBox from "@src/components/CheckBox/CheckBox";
import { bankAPI } from "@src/services/api";

interface Props {
  navigation?: any;
  route?: any;
}
type InputProps = {
  idNumber: string;
};

export const BankDetails = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata, "nextstep");
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState();
  const [selfie, setSelfie] = useState();
  const [bank, setBank] = useState("");
  const dispatch = useDispatch();
  const [same, setSame] = useState(false);
  const [banks, setBanks] = useState([]);
  const formOptions = {
    resolver: yupResolver(
      regdata?.userType === "CUSTOMER" ? customerBankSchema : bankSchema
    ),
  };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  useEffect(() => {
    bankAPI.getBankList().then((res) => {
      const filter = res?.data?.data?.map((item, index) => ({
        id: item?.id,
        label: item.name,
        value: item.name,
      }));
      setBanks(filter);
    });
  }, []);
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // setLoading(true);

    // const idImage = await uploadImage(imageID);
    // const selfieImage = await uploadImage(selfie);

    // setLoading(false);
    // if (!idImage) {
    //   toast.danger({ message: "Please upload ID" });
    //   return;
    // }
    if (regdata?.userType !== "CUSTOMER" && !bank) {
      toast.danger({ message: "Please select bank" });
      return;
    }

    navigation.navigate("uploadStep", {
      regdata: {
        ...regdata,
        bankDetails: {
          bankName: bank,
          accountNo: data?.accountNumber ?? "",
          upiId: "",
          ifscCode: "",
          accountName: data?.accountName ?? "",
        },
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
              <HorizontalCount text={3} />
              <Spacer spacing={10} />

              <View style={{ alignSelf: "flex-start" }}>
                <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                  {`Bank Details`}
                </TextBold>
                <Spacer spacing={5} />
              </View>
              <View style={{ width: "100%" }}>
                <DropDown
                  lebel={
                    regdata?.userType !== "CUSTOMER"
                      ? "Select Bank*"
                      : "Select Bank"
                  }
                  placeholder="Select Bank"
                  rightIconName="sort-down"
                  setSelectedValue={setBank}
                  combineOnPress={(rest) =>
                    dispatch(
                      BottomModalActions.toggleBottomModal({
                        title: "Select Bank",
                        showList: true,
                        data: banks,
                        ...rest,
                      })
                    )
                  }
                />
                <ValidationInput
                  placeholder="Account Number"
                  label={
                    regdata?.userType !== "CUSTOMER"
                      ? "Account Number*"
                      : "Account Number"
                  }
                  fieldName="accountNumber"
                  autoCapitalize={"none"}
                  {...formProps}
                />
                <ValidationInput
                  placeholder="Account Holder Name"
                  label={
                    regdata?.userType !== "CUSTOMER"
                      ? "Account Holder Name*"
                      : "Account Holder Name"
                  }
                  fieldName="accountName"
                  autoCapitalize={"none"}
                  {...formProps}
                />
                {/* {regdata?.userType === "PICKUP_POINT" && (
                  <Pressable
                    style={styles.rowCheckBox}
                    onPress={() => setSame(!same)}
                  >
                    <CheckBox isSelected={same} />
                    <TextField style={styles.checkTextWidth}>
                      Select if Aggregator's bank details are the same as
                      Franchisee's
                    </TextField>
                  </Pressable>
                )} */}
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
