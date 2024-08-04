import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useAppDispatch } from "../../redux/store";
import {
  customerRegisterSchema,
  registerSchema,
  sameRegisterSchema,
} from "../../static/schema/ValidationSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ValidationInput } from "../../components/Input/ValidationInput";
import Button from "../../components/Button/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";

import { DropDown } from "@src/components/Dropdown/DropDown";
import { BottomModalActions } from "@src/redux/actions/combineAction";
import { users } from "@src/services/api";
import toast from "@src/services/toast";
import { TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import CheckBox from "@src/components/CheckBox/CheckBox";
import { colors } from "@src/globals/colors";
import AutoTextField from "@src/features/Auth/register/components/AutoTextField/AutoTextField";

type InputProps = {
  firstName: string;
  lastName: string;
  email?: string;
};

export const RegisterFormContainer = ({
  mobile,
  country,
  prefix,
  userType,
  aggregatorID,
}: any) => {
  const navigation = useNavigation<any>();
  const [same, setSame] = useState(false);
  console.log(userType);
  const formOptions =
    same && userType === "PICKUP_POINT"
      ? { resolver: yupResolver(sameRegisterSchema) }
      : userType === "CUSTOMER"
      ? {
          resolver: yupResolver(customerRegisterSchema),
        }
      : { resolver: yupResolver(registerSchema) };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const [image, setImage] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [selectedFranchisee, setSelectedFranchisee] = useState();
  const [FranchiseeList, setFranchiseeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  useEffect(() => {
    users.getFranchise().then((res) => {
      setFranchiseeList(res?.data);
    });
  }, []);
  const franchisees = FranchiseeList?.map((each) => ({
    label: each?.companyDetails?.name,
    value: each.id,
    ...each,
  }));
  const handleCheckbox = () => {
    setSame(!same);
    const filterFran = franchisees.find(
      (each) => each.value === selectedFranchisee
    );
    setName(filterFran?.companyDetails?.name);
    setEmail(filterFran?.personalDetails?.email);
  };
  useEffect(() => {
    if (!same) {
      setSame(false);
      setName();
      setEmail();
    }
  }, [selectedFranchisee, same]);
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    if (userType === "PICKUP_POINT")
      if (!selectedFranchisee) {
        return toast.danger({ message: "Please select Franchisee" });
      }
    const filterFran = franchisees.find(
      (each) => each.value === selectedFranchisee
    );
    // console.log(filterFran?.label, filterFran?.value);
    // setLoading(true);
    // const identityImage = await uploadImage(image);
    // setLoading(false);
    // if (!identityImage) {
    //   toast.danger({ message: "Please upload Proof of Identity" });
    // }
    // return;
    // console.log(filterFran);
    navigation.navigate("pickupLocation", {
      regdata: {
        ...data,
        firstName: data?.firstName || name,
        email: data?.email || email,
        mobile,
        country,
        prefix,
        userType,
        aggregatorID,
        filterFran,
      },
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <Spacer spacing={5} />

      {userType === "PICKUP_POINT" && (
        <>
          <Spacer spacing={5} />
          <DropDown
            lebel="Franchisee*"
            placeholder="Select the Franchisee"
            rightIconName="sort-down"
            setSelectedValue={setSelectedFranchisee}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: "Select the Franchisee",
                  showList: true,
                  data: franchisees,
                  ...rest,
                })
              )
            }
          />
        </>
      )}
      {!same && !name ? (
        <ValidationInput
          placeholder={userType === "CUSTOMER" ? "Full Name" : "Business Name"}
          label={
            userType === "CUSTOMER"
              ? "Full Name (as per NRIC)*"
              : "Business Name*"
          }
          fieldName="firstName"
          autoCapitalize={"none"}
          {...formProps}
        />
      ) : (
        <>
          <AutoTextField title={"Business Name*"} value={name} />
          {/* <TextField
            style={{
              color: colors.darkLight,
              paddingBottom: 5,
              fontSize: 14,
            }}
          >
            Business Name
          </TextField>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              height: 50,
              paddingHorizontal: 10,
              borderColor: colors.placholderColor,
              justifyContent: "center",
            }}
          >
            <TextField
              style={{
                color: colors.placholderColor,
              }}
            >
              {name}
            </TextField>
          </View> */}
          {/* <TextField>{name}</TextField> */}
          {/* <Spacer spacing={5} /> */}
        </>
      )}
      {userType === "CUSTOMER" && (
        <ValidationInput
          placeholder={"NRIC number"}
          label={"NRIC number*"}
          fieldName="nricNo"
          autoCapitalize={"none"}
          {...formProps}
        />
      )}
      {!same && !email ? (
        <ValidationInput
          placeholder="Email"
          label="Email (Optional)"
          fieldName="email"
          autoCapitalize={"none"}
          {...formProps}
        />
      ) : (
        <>
          <AutoTextField title={"Email (Optional)"} value={email} />

          {/* <TextField>Email: {email}</TextField>
          <Spacer spacing={5} /> */}
        </>
      )}

      {userType === "PICKUP_POINT" && selectedFranchisee && (
        <Pressable style={styles.rowCheckBox} onPress={() => handleCheckbox()}>
          <CheckBox isSelected={same} />
          <TextField style={styles.checkTextWidth}>
            Select if business name and email are the same as Franchisee's
          </TextField>
        </Pressable>
      )}
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={!!loading}
        title={"Next"}
      >
        {!!loading && <LoadingIndicator activityColor="white" />}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  rowCheckBox: {
    flexDirection: "row",
    gap: 10,
  },
  checkTextWidth: {
    maxWidth: "90%",
    lineHeight: 24,
  },
});
