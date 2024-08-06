import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import {
  selectOrderList,
  selectProfile,
  selectProfileLoading,
  selectReturnList,
  selectUserId,
  selectUserType,
} from "@src/redux/selectors";
import { ProfileAPI, users } from "@src/services/api";
import { TextField } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { Spacer } from "@src/components/common/Spacer";
import InfoContainer from "./Components/InfoContainer";
import ViewOrders from "./Components/ViewOrders";
import ViewMap from "./Components/ViewMap";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";
import ProfileBox from "./Components/ProfileBox";
import { routes } from "@src/navigation/routes";
import StreakContainer from "./Components/StreakContainer";
import { orderActions, returnActions } from "@src/redux/actions/combineAction";
import { FastImage } from "@src/components/image";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import HowItWorks from "./Components/HowItWorks";
import Videos from "./Components/Videos";
import { useTranslation } from "react-i18next";

const HomeScreen = ({ navigation }: any) => {
  const userId = useSelector(selectUserId);
  const selectedUserType = useSelector(selectUserType);
  const soreFcmToServer = async () => {
    let fcmToken = await AsyncStorage.getItem("@fcmToken");
    ProfileAPI.setFirebaseToken({
      firebaseToken: fcmToken,
      userId,
    }).then(() => console.log("Setting Fcm Token"));
  };
  const [refresh, setRefresh] = useState();

  const profileData = useSelector(selectProfile);
  const profileLoading = useSelector(selectProfileLoading);
  console.log(profileLoading, "-----");
  useEffect(() => {
    soreFcmToServer();
  }, []);

  const dispatch = useDispatch();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    console.log(selectedUserType);
    selectedUserType === "PICKUP_POINT" &&
      dispatch(orderActions.getOrder("CREATED"));

    selectedUserType === "PICKUP_POINT" &&
      dispatch(returnActions.getReturn("ACCEPTED"));

    selectedUserType === "RECYCLER" &&
      dispatch(returnActions.getReturn("CREATED"));

    selectedUserType === "PICKUP_POINT" &&
      users.getCUSTOMER("INACTIVE").then((res) => {
        setCustomerList(res?.data);
      });
  }, []);

  const orders = useSelector(selectOrderList);
  const returnOrders = useSelector(selectReturnList);

  const userType = profileData?.userType;

  const { t } = useTranslation();

  const functionalities = [
    {
      id: "1",
      title: "Accept\nSupply",
      description: "Collect recyclables from depositors",
      navigateTo: "acceptedMaterialList",
      icon: "receive",
      permission: "PICKUP_POINT",
      showDot: orders?.length > 0,
    },

    {
      id: "4",
      // title: "Approve\nsign up",
      title: "Add\nSupply",
      description: "Receive recyclables from suppliers",
      icon: "acceptMaterail",

      navigateTo: "categoryScreen",
      permission: "RECYCLER",
      showDot: customerList?.length > 0,
    },
    {
      id: "5",
      title: "Transaction\nHistory",
      description: "Supply recyclables to diverters",
      icon: "history",
      navigateTo: routes.bottomTabs.allHistory,
      permission: userType,
    },

    {
      id: "2",
      title: "Waste\nGeneration",
      description: "Process the recyclables",
      icon: "process",
      navigateTo: "ProcessScreen",
      permission: "PICKUP_POINT",
    },

    {
      id: "3",
      title: "Waste\nDisposal",
      description: "Supply recyclables to diverters",
      icon: "supply",
      navigateTo: "StockScreen",
      permission: "PICKUP_POINT",
    },
    {
      id: "7",
      title: "Weight\nConfirmation",
      description: "Collect recyclables from depositors",
      navigateTo: "confirmWeightList",
      icon: "weightConfirmation",
      permission: "PICKUP_POINT",
      showDot: returnOrders?.length > 0,
    },
  ];

  const RecyclerFunctionalities = [
    {
      id: "1",
      title: "Accept\nWaste",
      description: "Collect recyclables from depositors",
      navigateTo: "acceptedMaterialList",
      icon: "receive",
      permission: "PICKUP_POINT",
      showDot: returnOrders?.length > 0,
    },

    {
      id: "5",
      title: "Transaction\nHistory",
      description: "Supply recyclables to diverters",
      icon: "recyclerHistorySVG",
      navigateTo: routes.history.receiveHistory,
      permission: userType,
    },
    {
      id: "6",
      title: "Certified\nMaterials",
      description: "",
      icon: "certifiedMaterialsSVG",
      navigateTo: "certifiedList",
      permission: userType,
    },
  ];

  const CollectionAgentFunctionalities = [
    {
      id: "1",
      title: "Supply Material",
      description: "Collect recyclables from depositors",
      icon: "supplyMaterialSVG",
      navigateTo: "categoryScreen",
      permission: "",
    },

    {
      id: "4",
      title: "History",
      description: "Receive recyclables from suppliers",
      icon: "customerHistorySVG",
      navigateTo: "transactionHistory",
      permission: "RECYCLER",
    },
    {
      id: "5",
      title: "Trend",
      description: "Trend",
      icon: "trendSVG",
      navigateTo: "trend",
      permission: userType,
    },
  ];

  const authNavigate = (screen: string, permission: string) => {
    // if (userType !== permission) {
    //   toast.danger({
    //     message: "This functionality is not applicable for your user type!",
    //   });
    //   return;
    // }
    navigation.navigate(screen);
  };

  console.log(userType, "________");
  return (
    <>
      {profileData && <ProfileBox />}
      <ScrollContainerLayout
        contentStyle={{ paddingBottom: 25 }}
        topBgColor={colors.primary}
        style={styles.mainContainer}
        refresh={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setRefresh((pre) => !pre);
            }}
            tintColor={colors.primary}
          />
        }
      >
        {/* {selectedUserType === "CUSTOMER" ? (
          <StreakContainer />
        ) : (
          <InfoContainer />
        )} */}

        <InfoContainer />

        <Spacer spacing={10} />
        {profileLoading ? (
          <View style={{ height: 120 }}>
            <LoadingIndicator />
          </View>
        ) : (
          userType && (
            <View>
              <FlatList
                data={
                  userType === "CUSTOMER"
                    ? CollectionAgentFunctionalities
                    : userType === "RECYCLER"
                    ? RecyclerFunctionalities
                    : functionalities
                }
                renderItem={({ item, index }) => {
                  return (
                    // <Pressable
                    //   key={index}
                    //   onPress={() =>
                    //     authNavigate(item.navigateTo, item.permission)
                    //   }
                    //   style={{
                    //     marginTop: 2,
                    //     marginHorizontal: 3,
                    //   }}
                    //   disabled={item?.navigateTo ? false : true}
                    // >
                    //   <View style={styles.card}>
                    //     {item?.icon ? (
                    //       CustomIcon(item?.icon, 40)
                    //     ) : (
                    //       <View style={{ width: 40, height: 40 }} />
                    //     )}
                    //   </View>
                    //   {item?.title && (
                    //     <TextField style={styles.textStyle}>
                    //       {t(item.title)}
                    //     </TextField>
                    //   )}
                    //   {item?.showDot && (
                    //     <View
                    //       style={{
                    //         width: 15,
                    //         height: 15,
                    //         borderRadius: 100,
                    //         position: "absolute",
                    //         top: 7,
                    //         right: 7,
                    //       }}
                    //     >
                    //       <FastImage
                    //         source={require("../../assets/img/attention.gif")}
                    //         style={{ width: 15, height: 15 }}
                    //       />
                    //     </View>
                    //   )}
                    // </Pressable>

                    <View
                      style={{
                        width: "31%",
                      }}
                    >
                      <View
                        key={index}
                        style={{
                          width: "100%",
                          aspectRatio: 1,
                          // borderWidth: 1,
                        }}
                      >
                        <Pressable
                          style={styles.card}
                          onPress={() =>
                            authNavigate(item.navigateTo, item.permission)
                          }
                          disabled={item?.navigateTo ? false : true}
                        >
                          {item?.icon ? (
                            CustomIcon(item?.icon, 40)
                          ) : (
                            <View style={{ width: 40, height: 40 }} />
                          )}
                        </Pressable>
                      </View>
                      <Spacer spacing={3} />
                      {item?.title && (
                        <TextField style={styles.textStyle}>
                          {item.title}
                        </TextField>
                      )}
                      {item?.showDot && (
                        <View
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: 100,
                            position: "absolute",
                            top: 7,
                            right: 7,
                          }}
                        >
                          <FastImage
                            source={require("../../assets/img/attention.gif")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                      )}
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Spacer spacing={5} />}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              />
            </View>
          )
        )}
        <View>
          <View>
            <Spacer spacing={10} />
            <ViewMap
              text={
                userType === "PICKUP_POINT"
                  ? t(
                      "Looking for the waste management companies in your area?"
                    )
                  : userType === "RECYCLER"
                  ? t("Looking for the shipping companies in your area?")
                  : t(
                      "Click here to view the ongoing special price for various materials"
                    )
              }
              btnTxt={userType === "CUSTOMER" ? "" : t("View Map")}
              userType={userType}
            />
          </View>
          <View>
            <Spacer spacing={15} />
            <ViewOrders refresh={refresh} />
            <Spacer spacing={10} />
            <HowItWorks />
            <Spacer spacing={10} />
            {userType === "CUSTOMER" && (
              <>
                <Videos />
                <Spacer spacing={10} />
              </>
            )}
          </View>
        </View>
      </ScrollContainerLayout>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: MEDIUM_PADDING_SIZE,
    padding: 32,
    height: "100%",
  },
  textStyle: {
    fontSize: 14,
    color: colors.neutral,
    fontWeight: "600",
    textAlign: "center",
  },
  circleView: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  descTxt: {
    fontSize: 11,
    color: colors.primary,
  },
});

export default HomeScreen;
