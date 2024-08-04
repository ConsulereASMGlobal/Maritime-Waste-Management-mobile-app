import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { REGULAR_PADDING_SIZE } from "../../../../globals/themes";
import { ValidationInput } from "../../../../components/Input/ValidationInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { sortingDataSchema } from "../../../../static/schema/ValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../../../globals/colors";
import Button from "../../../../components/Button/Button";
import { Spacer } from "../../../../components/common/Spacer";
import toast from "../../../../services/toast/index";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../../navigation/routes";
import { TextField } from "../../../../components/TextField/TextField";
import { BottomModalActions } from "../../../../redux/actions/combineAction";
import { useAppDispatch } from "../../../../redux/store";
import { DropDown } from "../../../../components/Dropdown/DropDown";
import { FastImage } from "../../../../components/image/index";
import { useSelector } from "react-redux";
import { selectProfile } from "../../../../redux/selectors";
import { axiosInstance } from "../../../../helpers/axiosHelper";
import RoundCheckIcon from "../../../../assets/svgIcon/icon_tick_round.svg";
import { truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { useTranslation } from "react-i18next";

type InputProps = {};
export const SelectedProcess = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { process, inMaterials, outMaterials } = route.params;

  const maxTwoDecimalRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: process.title,
    });
  }, [process, navigation]);

  const [itemDetail, setItemDetail] = useState({});

  const formOptions = { resolver: yupResolver(sortingDataSchema) };

  const { handleSubmit, watch, ...formProps } =
    useForm<InputProps>(formOptions);

  const [selectedInput, setSelectedInput] = useState();

  useEffect(() => {
    selectedInput &&
      axiosInstance.get(`inventory/items/${selectedInput}`).then((res) => {
        if (res.status === 200) {
          setItemDetail(res?.data?.data[0]);
        }
      });
  }, [selectedInput]);

  const updatedInMaterials = inMaterials?.map((each: any) => {
    return {
      id: each?.id,
      label: each?.name,
      value: each?.id,
      weight: each?.weight,
      quantity: each?.quantity,
    };
  });

  const updatedOutMaterials = outMaterials?.map((each: any) => {
    return {
      id: each?.id,
      label: each?.name,
      value: each?.id,
    };
  });

  const profileData = useSelector(selectProfile);

  const onSubmit: SubmitHandler<InputProps> = async (data: any) => {
    if (!selectedInput) {
      toast.danger({ message: t("Input material is required!") });
      return;
    }
    const productionItem: any = {};

    const formData = {
      ...data,

      wastage: data?.wastage === "" ? 0 : data?.wastage,
    };
    let decimalErrorCount = 0;

    let outputSum = Number(formData.wastage);
    updatedOutMaterials?.forEach((item: any) => {
      if (formData[item.id] !== "") {
        productionItem[item.id] = formData[item.id];
        productionItem[item.id] = Number(formData[item.id]);

        if (formData[item.id] && !maxTwoDecimalRegExp.test(formData[item.id])) {
          decimalErrorCount += 1;
          return;
        }

        outputSum += Number(formData[item.id]);
      }
      delete formData[item.id];
    });

    console.log(itemDetail?.quantity, outputSum, "insed");
    if (Number(itemDetail?.quantity || 0) < Number(outputSum)) {
      toast.danger({
        message: t(
          "Total Output Quantity entered should be less than or equal to available Input Raw material!"
        ),
      });
      return;
    }

    if (decimalErrorCount > 0) {
      toast.danger({
        message: t("Quantity should have at most two decimal places"),
      });
      return;
    }

    if (Number(outputSum) > Number(itemDetail?.quantity)) {
      toast.danger({
        message: "Total of output quantity should be equal to input quantity",
      });
      return;
    }

    const preSortData = {
      inputQuantity: outputSum,
      hubId: profileData?.hubId,
      userId: profileData?.id,
      // shiftId: basicData?.shift?.id,
      inputMaterialTypeId: updatedInMaterials.find(
        (each) => each.id === selectedInput
      ),
      processId: process?.id,
      processName: process?.title,
      productionItem: productionItem,
      ...formData,
      // inputQuantity: Number(formData?.inputQuantity)
    };
    // console.log(preSortData, 'data-------');
    // return;
    navigation.navigate(routes.process.preSortingSummary, {
      preSortData,
      // basicData,
      outputList: outMaterials,
    });
  };
  // console.log(itemDetail, ":::::::");
  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.screen}>
            <View style={styles.screen.screenIcon}>
              <FastImage
                source={{ uri: process?.icon }}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
            <TextField
              style={{ fontSize: 12, lineHeight: 20, fontWeight: "bold" }}
            >
              {process?.title}
            </TextField>
            <View style={styles.check}>
              <RoundCheckIcon style={{ top: 7, right: 7 }} />
            </View>
          </View>
          <Spacer spacing={15} />

          <TextField
            style={{
              marginVertical: 15,
              color: colors.dark,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {t("Input")}
          </TextField>
          <View style={styles.dropdownMainContainer}>
            <DropDown
              tooltipChild={
                <TextField>
                  {t(
                    "Select the material which was fed into the baling machine"
                  )}
                </TextField>
              }
              lebel={t("Input Material")}
              placeholder={t("Select Input Material")}
              rightIconName="sort-down"
              setSelectedValue={setSelectedInput}
              combineOnPress={(rest) =>
                dispatch(
                  BottomModalActions.toggleBottomModal({
                    title: t("Select Input Material"),
                    showList: true,
                    data: updatedInMaterials,
                    ...rest,
                  })
                )
              }
            />
          </View>

          {itemDetail?.quantity && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{
                    marginVertical: 15,
                    color: colors.dark,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {t("Input Quantity")}
                </TextField>
                <TextField
                  style={{
                    marginVertical: 15,
                    color: colors.dark,
                    fontWeight: "600",
                    fontSize: 18,
                  }}
                >
                  {truncateToTwoDecimalPlaces(itemDetail?.quantity)}{" "}
                  {itemDetail?.unitType}
                </TextField>
              </View>

              <TextField
                style={{
                  fontSize: 14,
                }}
              >
                {t(
                  "*Note: Total of output quantity should be less than or equal to available input quantity."
                )}
              </TextField>
            </>
          )}
          <Spacer spacing={5} />

          <TextField
            style={{
              marginVertical: 15,
              color: colors.dark,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {t("Output")}
          </TextField>

          {updatedOutMaterials.length ? (
            updatedOutMaterials.map((each, index) => (
              <View key={index} style={styles.leftLabelInput}>
                <TextField style={styles.leftLabel}>{each.label}</TextField>
                <View style={{ width: "40%" }}>
                  <ValidationInput
                    placeholder={t("Qty")}
                    fieldName={each.id}
                    autoCapitalize={"none"}
                    keyboardType="numeric"
                    iconName={""}
                    leftIconName={""}
                    unit="Kg"
                    {...formProps}
                  />
                </View>
              </View>
            ))
          ) : (
            <></>
          )}

          <Spacer spacing={10} />

          <ValidationInput
            tooltipChild={
              <TextField>
                {t(
                  "Enter the amount which was lost on the account of moisture, non plastic material or other contaminations"
                )}
              </TextField>
            }
            placeholder={t("Wastage")}
            label={t("Wastage")}
            fieldName="wastage"
            autoCapitalize={"none"}
            keyboardType="numeric"
            iconName={""}
            leftIconName={""}
            unit={"KG"}
            {...formProps}
          />

          <Spacer spacing={20} />

          <Button
            textStyle={{ lineHeight: 18 }}
            onPress={handleSubmit(onSubmit)}
            title={"Next"}
          />
          <Spacer spacing={10} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    marginVertical: 15,
  },
  screen: {
    minHeight: 108,
    width: 108,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    position: "relative",
    marginTop: 10,
    padding: 10,
    screenIcon: {
      width: 48,
      height: 48,
      backgroundColor: colors.primary,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
  },

  check: {
    width: 12,
    height: 12,
    position: "absolute",
    // backgroundColor: colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    right: 5,
  },

  imageStyle: { height: 24, width: 24 },

  dropdownMainContainer: { zIndex: 99999 },

  leftLabelInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  leftLabel: { marginBottom: 8, fontWeight: "bold" },
});
