import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import { FastImage } from "../../../components/image";
import { TextField, TextMedium } from "../../../components/TextField/TextField";
import { CategoryQuantityRender } from "../../../container/flatlistRender/CategoryQuantityRender";

import { colors } from "../../../globals/colors";
import { screenWidth } from "../../../globals/globalStyles";
import { styles as GlobalStyles } from "../../SupplyFlow/StockScreen/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryActions,
  getCategoryPriceActions,
} from "../../../redux/actions/combineAction";
import {
  categoriesPrice,
  categoriesPriceLoading,
  selectSubCategory,
} from "../../../redux/selectors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { mergeTwoArray } from "../../../utils/arraryUtils";

// import RoundCheckIcon from "../../../assets/svgIcon/icon_tick_round.svg";
import { NoDataView } from "../../../components/NoDataView";
import toast from "../../../services/toast";
import { ScrollView } from "react-native";
import { routes } from "../../../navigation/routes";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { useTranslation } from "react-i18next";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import Button from "@src/components/Button/Button";

export const QualitySelection = ({ navigation, route }) => {
  const payload = route?.params;

  console.log(payload, "pppppppppppppppppp");
  const dispatch = useDispatch();
  const subCategories = useSelector(selectSubCategory);
  const loading = useSelector(categoriesPriceLoading);
  const subCategoryPrice = useSelector(categoriesPrice);
  const [categoryList, setCategoryList] = useState<Array<any>>([]);
  useEffect(() => {
    if (!!!subCategories && !!!subCategoryPrice) {
      return;
    }
    const filterCategoryList = mergeTwoArray(
      subCategoryPrice,
      subCategories,
      "categoryId"
    )?.map((item, index) => {
      return {
        quantity: 0,
        isAdded: false,
        ...item,
      };
    });
    // setCategoryList(subCategories);
    setCategoryList(filterCategoryList);
  }, [subCategories, subCategoryPrice]);
  console.log(subCategoryPrice, "sub");
  useEffect(() => {
    dispatch(getCategoryActions.getSubCategory(payload?.data?.[0]?.categoryId));
    dispatch(
      getCategoryPriceActions.getCategoryPrice(payload?.data?.[0]?.categoryId)
    );
  }, []);

  const _onChangeNumber = (text: string, index: number) => {
    let tempItem = [...categoryList];
    tempItem[index].quantity = text as any;
    setCategoryList(tempItem as any);
  };

  const onQuentityChange = async (item: any, index: number) => {
    navigation.navigate(routes.quality.selection, {
      item,
      payload,
      categoryList,
      index,
    });
  };

  const checkIfCategorySelected = () =>
    categoryList?.find((item) => item?.quantity > 0);

  const onSubmit = () => {
    if (!!!checkIfCategorySelected()) {
      return toast.danger({ message: "Please select the quantity" });
    }
    navigation.navigate("OrderSummery", {
      routeFlowFrom: "COLLECT_SCREEN",
      payload: {
        ...payload,
        data: [
          {
            categoryId: payload?.data?.[0]?.categoryId,
            items: categoryList,
          },
        ],
      },
    });
  };

  const { t } = useTranslation();

  return (
    <ScrollView style={GlobalStyles.mainContainer}>
      <View style={styles.imagecontainer}>
        {/* <RoundCheckIcon style={styles.tick} /> */}
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
            source={{ uri: payload?.data?.[0]?.icon }}
            style={{ height: 40, width: 40 }}
            resizeMode={"contain"}
          />
        </View>
        <TextMedium style={styles.textTitle}>
          {payload?.data?.[0]?.name}
        </TextMedium>
      </View>
      <TextField style={GlobalStyles.headerTitle}>
        {t("Select the Material Type")}
      </TextField>
      <Spacer spacing={5} />
      {loading ? (
        <View style={{ flex: 1 }}>
          <Spacer spacing={50} />

          <LoadingIndicator activityColor={colors.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={categoryList}
            ListEmptyComponent={NoDataView}
            contentContainerStyle={{
              paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
            }}
            keyExtractor={(item) => item?.id}
            scrollEnabled={false}
            numColumns={1}
            renderItem={({ item, index }) => (
              <View style={styles.mainContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      backgroundColor: colors.primary,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FastImage
                      source={{ uri: item?.icon }}
                      style={styles.Icon}
                      resizeMode={"contain"}
                    />
                  </View>
                  <Spacer spacing={4} />
                  <TextMedium style={styles.textTitle}>{item?.name}</TextMedium>
                  {(item?.name === "PET" ||
                    item?.name === "HDPE" ||
                    item?.name === "PPE" ||
                    item?.name === "LDPE" ||
                    item?.name === "UBC") && (
                    <View style={{ position: "absolute", top: -4, left: 30 }}>
                      <TooltipComp
                        children={
                          <FastImage
                            source={
                              item?.name === "PET"
                                ? require("../../../assets/tooltips/PET.png")
                                : item?.name === "HDPE"
                                ? require("../../../assets/tooltips/HDPE.png")
                                : item?.name === "PPE"
                                ? require("../../../assets/tooltips/PPE.png")
                                : item?.name === "LDPE"
                                ? require("../../../assets/tooltips/LDPE.png")
                                : require("../../../assets/tooltips/UBC.jpeg")
                            }
                            style={{ width: 225, height: 220 }}
                            resizeMode="contain"
                          />
                        }
                        tooltipPosition={"top"}
                      />
                    </View>
                  )}
                </View>
                {/* <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                {item?.applicableDeal && (
                  <FastImage
                    source={require("../../../assets/img/deal.png")}
                    style={{ width: 60, height: 60 }}
                  />
                )}

                <View
                  style={{
                    width: screenWidth / 4,
                    alignItems: "center",
                    backgroundColor: colors.primaryBG,
                    height: 45,
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <TextField
                    style={{
                      color: colors.primary,
                      lineHeight: 30,
                    }}
                  >
                    {item?.currency} {item?.price}/{item?.unit}
                  </TextField>
                </View>

                
              </View> */}
                <View
                  style={[
                    styles.qtyRowContainer,
                    { width: "40%", justifyContent: "flex-end" },
                  ]}
                >
                  <TextInput
                    style={styles.inputBox}
                    value={
                      item?.isItemsSelectedToReturn &&
                      item?.quantity?.toString()
                    }
                    // editable={item?.tqty > 0 ? true : false}
                    onChangeText={(text) => _onChangeNumber(text, index)}
                    placeholder={t("Enter Quantity")}
                    placeholderTextColor={colors.gray}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
          />
          <View style={{ paddingHorizontal: HALF_MEDIUM_PADDING_SIZE }}>
            <Button
              title={"Next"}
              onPress={() =>
                navigation.navigate(routes.quality.selection, {
                  payload,
                  categoryList,
                })
              }
            />
          </View>
        </>
      )}

      <Spacer spacing={10} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    padding: 10,
    alignItems: "center",
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

  tick: {
    position: "absolute",
    top: -7,
    right: -7,
  },

  mainContainer: {
    alignItems: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.white,
    borderColor: "#EDEDED",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  Icon: {
    height: 30,
    width: 30,
  },

  qtyRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    fontSize: 14,
    color: colors.neutral_dark,
    borderWidth: 1,
    borderColor: colors.gray,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
});
