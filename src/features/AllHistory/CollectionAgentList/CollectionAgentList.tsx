import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@src/redux/store";
import { returnActions } from "@src/redux/actions/combineAction";
import { selectReturnList } from "@src/redux/selectors";
import { Spacer } from "@src/components/common/Spacer";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { NoDataView } from "@src/components/NoDataView";
import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { TextField } from "@src/components/TextField/TextField";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { users } from "@src/services/api";
import { useTranslation } from "react-i18next";

const RenderItem = ({ item, t }) => {
  return (
    <View>
      <>
        <View style={styles.listCont}>
          <View style={{ flex: 0.3 }}>
            <TextField style={styles.dateLoc}>
              {epochToHumanReadable(item?.createdAt)}
              {/* {item?.date} */}
            </TextField>
          </View>
          <View style={{ flex: 0.6 }}>
            <TextField style={[styles.dateLoc, { width: "70%" }]}>
              {item?.personalDetails?.name || "N/A"}
            </TextField>
          </View>
          <View style={{ flex: 0.25 }}>
            <TextField
              style={[
                styles.pointT,
                {
                  color: item?.status === "ACTIVE" ? colors.green : colors.red,
                  textAlign: "right",
                },
              ]}
            >
              {/* {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))} KG */}
              {t(item?.status)}
            </TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
      </>
    </View>
  );
};

export const CollectionAgentList = ({ navigation }: any) => {
  const onPress = (data: any) => () => {
    navigation.navigate("OrderDetailsCard", {
      data,
      from: "Supply",
    });
  };
  const dispatch = useAppDispatch();

  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    users.getCUSTOMER("ACTIVE,REJECTED").then((res) => {
      console.log(res?.data);
      setCustomerList(res?.data);
    });
  }, []);
  const isFocused = useIsFocused();

  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // dispatch(returnActions.getReturn());
    setRefreshing(false);
  }, [refreshing, isFocused]);

  const _onRefresh = () => {
    setRefreshing(true);
  };

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Spacer spacing={10} />

        <View style={styles.headerArea}>
          <TextField style={styles.headerText}>
            {t("Supply Vendor Co.")}
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
          <View style={{ flex: 0.6 }}>
            <TextField style={styles.tableHeader}>{t("Name")}</TextField>
          </View>
          <View style={{ flex: 0.25 }}>
            <TextField
              style={[
                styles.tableHeader,
                {
                  textAlign: "right",
                },
              ]}
            >
              {t("Status")}
            </TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={customerList}
            renderItem={({ item }) => <RenderItem item={item} t={t} />}
            style={styles.flatListStyle}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                tintColor={colors.primary}
              />
            }
            keyExtractor={(item) => item.id.toString()}
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
  pointT: { fontSize: 14 },
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
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingTop: 10,
    paddingBottom: 10,
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
    color: colors.dark,
  },
  itemTextTitle: {
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
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderStatusView: {
    borderRadius: 12,
    paddingVertical: 2,
    marginBottom: 5,
    justifyContent: "center",
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.cardColor,
  },
  card: {
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
