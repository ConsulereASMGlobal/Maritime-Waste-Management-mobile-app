import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { useSelector } from "react-redux";
import { productionActions } from "../../../redux/actions/combineAction";
import { RootState, useAppDispatch } from "../../../redux/store";
import { selectProductionList } from "../../../redux/selectors";

import { NoDataView } from "../../../components/NoDataView";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ProductionReportCard from "./components/ProductionReportCard";
import { TextField } from "@src/components/TextField/TextField";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { useTranslation } from "react-i18next";

const renderItem =
  (onPress) =>
  ({ item }) =>
    (
      <Pressable onPress={onPress(item)}>
        <>
          <View style={styles.listCont}>
            <View style={{ flex: 0.3 }}>
              <TextField style={styles.dateLoc}>
                {epochToHumanReadable(item?.productionId)}
              </TextField>
            </View>
            <View style={{ flex: 0.5 }}>
              <TextField style={styles.dateLoc}>
                {item?.processName ? item?.processName.trim(" ") : "N/A"}
              </TextField>
            </View>
            <View style={{ flex: 0.2 }}>
              <TextField
                style={[
                  styles.pointT,
                  {
                    textAlign: "right",
                  },
                ]}
              >
                {`${truncateToTwoDecimalPlaces(item?.inputQuantity)} KG`}
              </TextField>
            </View>
          </View>
          <View style={styles.horizontalLine} />
        </>
      </Pressable>
    );

export const ProductionReport = () => {
  const navigation = useNavigation<any>();
  const onPress = (data: any) => () => {
    navigation.navigate("ProductionDetailsScreen", {
      data: data,
    });
  };
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(productionActions.getProduction());
  }, []);

  useEffect(() => {
    dispatch(productionActions.getProduction());
    setRefreshing(false);
  }, [refreshing, isFocused]);

  const _onRefresh = () => {
    setRefreshing(true);
  };
  const productions = useSelector(selectProductionList);
  const isLoading = useSelector((state: RootState) => state.orderList.loading);

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Spacer spacing={10} />

        <View style={styles.headerArea}>
          <TextField style={styles.headerText}>
            {t("Waste Generation")}
          </TextField>
          <View
            style={{
              borderColor: colors.primary,
              width: "100%",
              borderRadius: 50,
              marginTop: 10,
              backgroundColor: colors.primary,
              borderWidth: 1.5,
            }}
          />
        </View>
        <Spacer spacing={10} />
      </View>
      <View style={{ flex: 1 }}>
        <Spacer spacing={5} />
        <View style={styles.listCont}>
          <View style={{ flex: 0.3 }}>
            <TextField style={styles.tableHeader}>{t("Date")}</TextField>
          </View>
          <View style={{ flex: 0.5 }}>
            <TextField style={styles.tableHeader}>{t("Process")}</TextField>
          </View>
          <View style={{ flex: 0.2 }}>
            <TextField
              style={[
                styles.tableHeader,
                {
                  textAlign: "right",
                },
              ]}
            >
              {t("Qty")}
            </TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={productions}
            renderItem={renderItem(onPress)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                tintColor={colors.primary}
              />
            }
            style={styles.flatListStyle}
            keyExtractor={(item) => item.orderId}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={NoDataView}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
            bounces={true}
            ListFooterComponent={() => <Spacer spacing={25} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listCont: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: REGULAR_PADDING_SIZE,
  },
  tableHeader: { fontWeight: "bold" },
  dateLoc: { color: colors.dark, fontSize: 14 },
  pointT: { color: colors.primary, fontSize: 14 },
  multiplier: { color: colors.orange, fontSize: 14 },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  innerContainer: {
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  headerArea: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  headerText: { fontSize: 20, fontWeight: "700", lineHeight: 32 },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  flatListStyle: {
    flex: 1,
  },
  flatlistContainerStyle: {
    paddingBottom: MEDIUM_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    paddingTop: 2,
  },
  orderList: {
    backgroundColor: colors.white,
    paddingVertical: MEDIUM_PADDING_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    borderRadius: BORDER_RADIUS_SIZE,
    marginTop: 2,
  },
  itemText: {
    fontSize: 16,
    color: colors.dark,
    // fontWeight: 'bold',
  },
  itemTextTitle: {
    fontSize: 16,
    color: colors.dark,
  },
  itemStatusText: {
    fontSize: 11,
    color: colors.yellow,
    textTransform: "uppercase",
  },
  row: {
    paddingTop: BORDER_RADIUS_SIZE,
    flexDirection: "row",
  },

  orderStatusView: {
    borderRadius: 12,
    paddingVertical: 2,
    width: "40%",
    marginBottom: 5,
    justifyContent: "center",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    backgroundColor: colors.cardColor,
  },
  card: {
    // backgroundColor: colors.white,
    // shadowColor: colors.dark,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // borderRadius: BORDER_RADIUS_SIZE,
    // elevation: 5,
    // padding: MEDIUM_PADDING_SIZE,
    // marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listHeaderComponentStyle: {
    backgroundColor: colors.secondary2,

    borderTopLeftRadius: BORDER_RADIUS_SIZE,
    borderTopRightRadius: BORDER_RADIUS_SIZE,
  },
  labelStyle: {
    fontSize: 16,
    color: colors.white,
  },
  leftHeaderContainer: {
    alignItems: "center",
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
});
