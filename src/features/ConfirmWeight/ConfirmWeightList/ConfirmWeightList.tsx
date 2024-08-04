import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { Spacer } from "@src/components/common/Spacer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrderList,
  selectReturnList,
  selectReturnListLoading,
  selectUserType,
} from "@src/redux/selectors";
import { orderActions, returnActions } from "@src/redux/actions/combineAction";
import { NoDataView } from "@src/components/NoDataView";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { useTranslation } from "react-i18next";

const ConfirmWeightList = () => {
  const [status, setStatus] = useState("Pending");
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const seletedUserType = useSelector(selectUserType);
  useEffect(() => {
    dispatch(returnActions.getReturn("ACCEPTED"));
  }, []);
  const returnOrders = useSelector(selectReturnList);
  const returnListLoading = useSelector(selectReturnListLoading);
  const { t } = useTranslation();

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.mainContainer}
        onPress={() =>
          navigation.navigate("confirmWeightDetailScreen", {
            item,
            weightSlip: false,
          })
        }
      >
        <View style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <TextField>
                {t("Order ID")} : {item.id}
              </TextField>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={[
                  styles.statusView,
                  {
                    backgroundColor:
                      item?.status === "COMPLETED"
                        ? colors.green
                        : item?.status === "CREATED" ||
                          item?.status === "Created"
                        ? colors.primary
                        : colors.primaryLight2,
                  },
                ]}
              >
                <TextField
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  {item?.status}
                </TextField>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 0.4,
              backgroundColor: colors.darkGray,
              marginHorizontal: -10,
            }}
          />
          <Spacer spacing={7} />
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View style={{ flex: 4 }}>
              <>
                <View style={styles.rowContainer}>
                  <TextField>{t("Recycler Name")}</TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {item?.centreInfo?.name.trim(" ")}
                  </TextField>
                </View>
                <Spacer spacing={5} />
              </>
              <>
                <View style={styles.rowContainer}>
                  <TextField>{t("Address")}</TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {item?.pickupInfo?.address?.street},{" "}
                    {item?.pickupInfo?.address?.city}
                  </TextField>
                </View>
                <Spacer spacing={5} />
              </>

              <>
                <View style={styles.rowContainer}>
                  <TextField>{t("Dispatch Date")}</TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {epochToHumanReadable(item?.createdAt)}
                  </TextField>
                </View>
                <Spacer spacing={5} />
              </>

              <>
                <Spacer spacing={5} />
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    alignSelf: "flex-start",
                    borderRadius: 8,
                  }}
                >
                  <TextMedium style={{ color: colors.primary, fontSize: 14 }}>
                    {t("View Details")}
                  </TextMedium>
                </View>
              </>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      {returnListLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={returnOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={NoDataView}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          bounces={true}
          ListFooterComponent={() => <Spacer spacing={25} />}
        />
      )}
    </>
  );
};

export default ConfirmWeightList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5,
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
    padding: 16,
    marginRight: 10,
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
