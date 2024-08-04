import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { historyList } from "./historylist";
import { NoDataView } from "@src/components/NoDataView";
import {
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { orderAPI } from "@src/services/api";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { useTranslation } from "react-i18next";
import { truncateToTwoDecimalPlaces } from "@src/utils/getSum";

export const TransactionHistory = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    setLoading(true);
    orderAPI.getOrdersByCusomter("ACCEPTED,REJECTED").then((res) => {
      console.log(res?.data);
      setLoading(false);
      setOrder(res?.data?.data);
    });
  }, []);

  const renderItem = ({ item }) => (
    <>
      <View style={styles.listCont}>
        <View style={{ flex: 0.4 }}>
          <TextField style={styles.dateLoc}>
            {epochToHumanReadable(item?.collectionDate)}
          </TextField>
        </View>
        <View style={{ flex: 0.4 }}>
          <TextField style={styles.dateLoc}>
            {item?.orderDetails[0]?.items[0]?.itemName}
          </TextField>
        </View>
        <View style={{ flex: 0.4 }}>
          <TextField style={styles.dateLoc}>
            {item?.orderDetails[0]?.items[0]?.quantity}{" "}
            {item?.orderDetails[0]?.items[0]?.unit}
          </TextField>
        </View>
        <View style={{ flex: 0.3 }}>
          {item?.status === "REJECTED" ? (
            <TextField style={[styles.pointT, { color: colors.red }]}>
              {t(item?.status)}
            </TextField>
          ) : (
            <TextField style={styles.pointT}>
              {truncateToTwoDecimalPlaces(item?.totalAmount)}{" "}
              {item?.orderDetails[0]?.items[0]?.currency}
            </TextField>
          )}
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Spacer spacing={10} />
        {/* <View style={styles.headerArea}>
          <TextField style={styles.headerText}>History</TextField>
        </View> */}
        <View style={styles.headerArea}>
          <TextField style={styles.headerText}>{t("History")}</TextField>
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
          <View style={{ flex: 0.4 }}>
            <TextField style={styles.tableHeader}>{t("Date")}</TextField>
          </View>
          <View style={{ flex: 0.4 }}>
            <TextField style={styles.tableHeader}>{t("Item")}</TextField>
          </View>
          <View style={{ flex: 0.4 }}>
            <TextField style={styles.tableHeader}>{t("Qty")}</TextField>
          </View>
          <View style={{ flex: 0.3 }}>
            <TextField style={styles.tableHeader}>{t("Amount")}</TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
            bounces={true}
            data={order || []}
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={NoDataView}
            renderItem={renderItem}
            ListFooterComponent={() => <Spacer spacing={25} />}
            showsVerticalScrollIndicator={false}
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
  dateLoc: { color: colors.sublabel, fontSize: 14 },
  pointT: { color: colors.primary, fontSize: 14 },
  multiplier: { color: colors.orange, fontSize: 14 },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  mainContainer: { flex: 1, backgroundColor: colors.white },
  innerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  headerArea: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  headerText: { fontSize: 20, fontWeight: "700", lineHeight: 32 },
  subHeading: {
    fontWeight: "bold",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  activeTab: {
    marginHorizontal: MEDIUM_PADDING_SIZE,
    borderColor: colors.primary,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: colors.primary,
    borderWidth: 2,
  },
});
