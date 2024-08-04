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
  selectOrderListLoading,
  selectReturnList,
  selectReturnListLoading,
  selectUserType,
} from "@src/redux/selectors";
import { orderActions, returnActions } from "@src/redux/actions/combineAction";
import { NoDataView } from "@src/components/NoDataView";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { useTranslation } from "react-i18next";

const AcceptedMaterialList = () => {
  const [status, setStatus] = useState("Pending");
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const seletedUserType = useSelector(selectUserType);
  useEffect(() => {
    dispatch(orderActions.getOrder("CREATED"));
    dispatch(returnActions.getReturn("CREATED"));
  }, []);
  const orders = useSelector(selectOrderList);
  const returnOrders = useSelector(selectReturnList);
  const orderListLoading = useSelector(selectOrderListLoading);
  const returnListLoading = useSelector(selectReturnListLoading);
  // console.log(returnListLoading, ":::::::::::::::::::");

  const { t } = useTranslation();

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.mainContainer}
        onPress={() =>
          navigation.navigate("acceptedDetails", { item, weightSlip: false })
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
                      item?.status === "Completed" ||
                      item?.status === "COMPLETED" ||
                      item?.status === "ACCEPTED" ||
                      item?.status === "Accepted"
                        ? colors.green
                        : item?.status === "Created" ||
                          item?.status === "CREATED"
                        ? colors.yellow
                        : colors.primary,
                  },
                ]}
              >
                <TextField
                  style={{
                    color:
                      item?.status === "Completed" ||
                      item?.status === "COMPLETED" ||
                      item?.status === "ACCEPTED" ||
                      item?.status === "Accepted"
                        ? colors.white
                        : item?.status === "Created" ||
                          item?.status === "CREATED"
                        ? colors.dark
                        : colors.white,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  {seletedUserType !== "CUSTOMER" &&
                  (item?.status === "CREATED" || item?.status === "Created")
                    ? "In transit"
                    : item?.status}
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
                  <TextField>
                    {seletedUserType == "RECYCLER"
                      ? t("Aggregator Name")
                      : t("Collection Agent Name")}
                  </TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {seletedUserType === "RECYCLER"
                      ? item?.pickupInfo?.name.trim(" ")
                      : item?.customerInfo?.name.trim(" ")}
                  </TextField>
                </View>
                <Spacer spacing={5} />
              </>
              {seletedUserType === "RECYCLER" && (
                <>
                  <View style={styles.rowContainer}>
                    <TextField>{t("Contact")}</TextField>
                    <TextField style={{ width: "50%", textAlign: "right" }}>
                      {item?.pickupInfo?.agentMobile}
                    </TextField>
                  </View>
                  <Spacer spacing={5} />
                  <View style={styles.rowContainer}>
                    <TextField>{t("Address")}</TextField>
                    <TextField style={{ width: "50%", textAlign: "right" }}>
                      {item?.pickupInfo?.address?.street},{" "}
                      {item?.pickupInfo?.address?.city}
                    </TextField>
                  </View>
                  <Spacer spacing={5} />
                </>
              )}
              {seletedUserType === "PICKUP_POINT" && (
                <>
                  <View style={styles.rowContainer}>
                    <TextField>{t("Quantity")}</TextField>
                    <TextField style={{ width: "50%", textAlign: "right" }}>
                      {item?.orderDetails[0]?.items[0]?.quantity}{" "}
                      {item?.orderDetails[0]?.items[0]?.unit}
                    </TextField>
                  </View>
                  <Spacer spacing={5} />
                </>
              )}
              <>
                <View style={styles.rowContainer}>
                  <TextField>
                    {seletedUserType == "RECYCLER"
                      ? t("Dispatch Date")
                      : t("Collection Date")}
                  </TextField>
                  <TextField style={{ width: "50%", textAlign: "right" }}>
                    {seletedUserType === "RECYCLER"
                      ? epochToHumanReadable(item?.createdAt)
                      : epochToHumanReadable(item?.collectionDate)}
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
      {/* <Pressable
        style={styles.mainContainer}
        onPress={() =>
          navigation.navigate("acceptedDetails", { weightSlip: false })
        }
      >
        <View style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <TextField>t("Order ID") : 12133223</TextField>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={[
                  styles.statusView,
                  {
                    backgroundColor:
                      status === "Completed"
                        ? colors.green
                        : status === "Pending"
                        ? colors.primaryLight2
                        : colors.secondary2,
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
                  {status}
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
              {list.map((each, index) => (
                <>
                  <View style={styles.rowContainer} key={index}>
                    <TextField>{each[0]}</TextField>
                    <TextField style={{ width: "50%", textAlign: "right" }}>
                      {each[1]}
                    </TextField>
                  </View>
                  <Spacer spacing={5} />
                </>
              ))}

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
                    View Details
                  </TextMedium>
                </View>
              </>
            </View>
          </View>
        </View>
      </Pressable> */}
      {orderListLoading || returnListLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={seletedUserType === "RECYCLER" ? returnOrders : orders}
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
      {/* {seletedUserType === "PICKUP_POINT" && (
        <Pressable
          style={styles.mainContainer}
          onPress={() =>
            navigation.navigate("acceptedDetails", { weightSlip: true })
          }
        >
          <View style={styles.card}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <TextField>t("Order ID") : 12133223</TextField>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <View
                  style={[
                    styles.statusView,
                    {
                      backgroundColor:
                        status === "Completed"
                          ? colors.green
                          : status === "Pending"
                          ? colors.primaryLight2
                          : colors.secondary2,
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
                    Weight confirmation
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
                {list.map((each, index) => (
                  <>
                    <View style={styles.rowContainer} key={index}>
                      <TextField>{each[0]}</TextField>
                      <TextField style={{ width: "50%", textAlign: "right" }}>
                        {each[1]}
                      </TextField>
                    </View>
                    <Spacer spacing={5} />
                  </>
                ))}

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
                      View Details
                    </TextMedium>
                  </View>
                </>
              </View>
            </View>
          </View>
        </Pressable>
      )} */}
    </>
  );
};

export default AcceptedMaterialList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
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
    elevation: 3,
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
