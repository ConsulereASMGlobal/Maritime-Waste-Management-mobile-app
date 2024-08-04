import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { loginSchema } from "@src/static/schema/ValidationSchema";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import { colors } from "@src/globals/colors";
import Button from "@src/components/Button/Button";
import {
  authActions,
  BottomModalActions,
  onBoradActions,
} from "@src/redux/actions/combineAction";
import toast from "@src/services/toast";
import { DropDown } from "@src/components/Dropdown/DropDown";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { RootState, useAppDispatch } from "@src/redux/store";

type LoginFormContainerProps = {};

type InputProps = {
  mobile: string;
  password: string;
};

export const LoginFormContainer = ({}: LoginFormContainerProps) => {
  const formOptions = { resolver: yupResolver(loginSchema) };
  const dispatch = useAppDispatch();

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const { logging } = useSelector((state: RootState) => state.auth);

  const [selectedUserType, setSelectedUserType] = useState("");

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    if (!selectedUserType) {
      toast.danger({ message: "Please select a user type!" });
      return;
    }
    // if (selectedUserType === "CUSTOMER") {
    //   dispatch(authActions.setSuccess());
    // } else if (selectedUserType === "RECYCLER") {
    //   dispatch(authActions.setRecycler());
    // } else {
    // }
    dispatch(authActions.login({ ...data, userType: selectedUserType }));
    dispatch(onBoradActions.onboard({ onboard: "Completed" }));
  };
  const navigation = useNavigation<any>();

  const userType = [
    { id: 2, label: "Waste Management Co.", value: "RECYCLER" },
    { id: 1, label: "Shipping Co.", value: "PICKUP_POINT" },
    { id: 3, label: "Supply Vendor Co.", value: "CUSTOMER" },
  ];

  return (
    <View style={{ width: "100%" }}>
      <TextField
        style={{
          paddingBottom: 5,
          fontSize: 14,
        }}
      >
        User Type
      </TextField>
      <DropDown
        placeholder="Select User Type"
        rightIconName="sort-down"
        setSelectedValue={setSelectedUserType}
        combineOnPress={(rest) =>
          dispatch(
            BottomModalActions.toggleBottomModal({
              title: "Select User Type",
              showList: true,
              data: userType,
              ...rest,
            })
          )
        }
      />

      <ValidationInput
        placeholder="9xx xxx xxxx"
        label="Mobile Number"
        fieldName="mobile"
        autoCapitalize={"none"}
        // maxLength={10}
        keyboardType="phone-pad"
        prefix="+60"
        {...formProps}
      />

      <ValidationInput
        placeholder="Password"
        label="Password"
        fieldName="password"
        secureTextEntry
        iconName="eye"
        iconFamily="Feather"
        {...formProps}
      />
      <Pressable
        style={{ alignItems: "flex-end" }}
        onPress={() =>
          navigation.navigate("sendOtp", {
            heading: "Forgot Your Password?",
            subheading:
              "Don't worry! Please enter the mobile number associated with your account. We will send an OTP verification to you.",
            routeFrom: "forgot",
          })
        }
      >
        <TextMedium style={{ fontSize: 14, color: colors.primary }}>
          Forgot Password?
        </TextMedium>
      </Pressable>
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={logging}
        title={logging ? "loading..." : "Login"}
      >
        {logging && <LoadingIndicator activityColor="white" />}
      </Button>
    </View>
  );
};
