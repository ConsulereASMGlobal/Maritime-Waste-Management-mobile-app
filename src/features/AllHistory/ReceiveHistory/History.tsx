import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../globals/colors";
import { Spacer } from "../../../components/common/Spacer";
import {
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { useDispatch, useSelector } from "react-redux";
import { selectReturnList } from "../../../redux/selectors";
import { returnActions } from "../../../redux/actions/combineAction";
import { RootState } from "../../../redux/store";
import { NoDataView } from "../../../components/NoDataView";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TextField } from "@src/components/TextField/TextField";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { useTranslation } from "react-i18next";

export const History = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(returnActions.getReturn("ACCEPTED,COMPLETED"));
  }, [isFocused]);

  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);
  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(returnActions.getReturn("ACCEPTED,COMPLETED"));
    setRefreshing(false);
  };
  const returnOrders = useSelector(selectReturnList);

  const RenderItem = ({ item }: any) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("historyDetails", {
          item,
        })
      }
    >
      <View style={styles.listCont}>
        <View style={{ flex: 0.3 }}>
          <TextField style={styles.dateLoc}>
            {epochToHumanReadable(item?.createdAt)}
          </TextField>
        </View>
        <View style={{ flex: 0.5 }}>
          <TextField style={styles.dateLoc}>
            {item?.pickupInfo?.name || "N/A"}
          </TextField>
        </View>
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <TextField style={styles.pointT}>
            {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))} KG
          </TextField>
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </Pressable>
  );

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Spacer spacing={10} />

        <View style={styles.headerArea}>
          <TextField style={styles.headerText}>{t("Waste Received")}</TextField>
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
            <TextField style={styles.tableHeader}>
              {t("Shipping Company")}
            </TextField>
          </View>
          <View style={{ flex: 0.2, alignItems: "flex-end" }}>
            <TextField style={styles.tableHeader}>{t("Qty")}</TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={returnOrders}
            renderItem={RenderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                tintColor={colors.primary}
              />
            }
            style={{ flex: 1 }}
            keyExtractor={(item) => item?.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContainerStyle}
            ListEmptyComponent={NoDataView}
            ItemSeparatorComponent={() => <Spacer spacing={5} />}
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
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    // paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  card: {
    // flexDirection: "row",
    justifyContent: "space-between",
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8ECF2",
    padding: 16,
    marginRight: 15,
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2,
  },
});
