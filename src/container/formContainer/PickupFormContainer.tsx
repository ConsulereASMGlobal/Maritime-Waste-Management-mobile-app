import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  pickUpSchema,
  sameAddressSchema,
} from "../../static/schema/ValidationSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ValidationInput } from "../../components/Input/ValidationInput";
import Button from "../../components/Button/Button";

import { useSelector } from "react-redux";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/TextField/TextField";
import { DropDown } from "../../components/Dropdown/DropDown";
import { BottomModalActions } from "../../redux/actions/combineAction";
import provinceList from "./provinceList";
import cityList from "./cityList";

import toast from "../../services/toast";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { Spacer } from "@src/components/common/Spacer";
import RadioGroup from "@src/components/RadioGroup/RadioGroup";
import { options } from "../../navigation/AuthStack";
import { uploadImage } from "@src/services/uploadImage";
import CheckBox from "@src/components/CheckBox/CheckBox";
import AutoTextField from "@src/features/Auth/register/components/AutoTextField/AutoTextField";

type InputProps = {
  lotNumber: string;
};

export const PickupFormContainer = ({ regdata }) => {
  console.log(regdata, "data heres------------");
  let provinces = [...provinceList];
  provinces.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  let cities = [...cityList];

  cities.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  const navigation = useNavigation<any>();
  const [same, setSame] = useState(false);

  const formOptions = {
    resolver: yupResolver(same ? sameAddressSchema : pickUpSchema),
  };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const [loading, setLoading] = useState(false);

  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const handleCheckbox = () => {
    setSame(!same);

    setStreet(regdata?.filterFran?.address?.street);
    setCity(regdata?.filterFran?.address?.city);
    setZipCode(regdata?.filterFran?.address?.zipCode);
  };
  useEffect(() => {
    if (!same) {
      setSame(false);
      setStreet();
      setCity();
      setZipCode();
    }
  }, [same]);
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    navigation.navigate("bankDetails", {
      regdata: {
        ...regdata,
        ...data,
        franchiseeId: regdata?.filterFran?.value,
        franchiseeName: regdata?.filterFran?.label,
        city: same && city ? city : data?.city,
        street: same && street ? street : data?.street,
        zipCode: same && zipCode ? zipCode : data?.zipCode,
      },
    });
  };

  return (
    <View style={{ width: "100%" }}>
      {!same && !street ? (
        <ValidationInput
          placeholder="Street"
          label="Street*"
          fieldName="street"
          autoCapitalize={"none"}
          {...formProps}
        />
      ) : (
        <>
          <AutoTextField title={"Street*"} value={street} />

          {/* <TextField>Street: {street}</TextField>
          <Spacer spacing={5} /> */}
        </>
      )}
      {!same && !street ? (
        <ValidationInput
          placeholder="City"
          label="City*"
          fieldName="city"
          autoCapitalize={"none"}
          {...formProps}
        />
      ) : (
        <>
          <AutoTextField title={"City*"} value={city} />

          {/* <TextField>City: {city}</TextField>
          <Spacer spacing={5} /> */}
        </>
      )}
      {!same && !street ? (
        <ValidationInput
          placeholder="Zip Code"
          label="Zip Code*"
          fieldName="zipCode"
          autoCapitalize={"none"}
          {...formProps}
        />
      ) : (
        <>
          {/* <TextField>ZipCode: {zipCode}</TextField>
          <Spacer spacing={5} /> */}
          <AutoTextField title={"ZipCode*"} value={zipCode} />
        </>
      )}

      {regdata?.userType === "PICKUP_POINT" && (
        <Pressable style={styles.rowCheckBox} onPress={() => handleCheckbox()}>
          <CheckBox isSelected={same} />
          <TextField style={styles.checkTextWidth}>
            Select if Aggregator's Collection Point address is the same as
            Franchisee's Material Recovery Facility's
          </TextField>
        </Pressable>
      )}
      {/* {(regdata?.userType === "PICKUP_POINT" 
      ||regdata?.userType === "RECYCLER") && (
        <Pressable style={styles.rowCheckBox} onPress={() => setSame(!same)}>
          <CheckBox isSelected={same} />
          <TextField style={styles.checkTextWidth}>
            {regdata?.userType === "PICKUP_POINT"
              ? "Select if Aggregator's Collection Point address is the same as Franchisee's Material Recovery Facility's"
              : regdata?.userType === "RECYCLER"
              ? "Select if Recycler's Recycling Facility address is the same as Business Address"
              : ""}
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
