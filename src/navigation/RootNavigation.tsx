import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { CatalogueScreen } from "../features/CollectFlow/CategoryScreen";
import { QualitySelection } from "../features/CollectFlow/qualitySelection";
import { OrderSummery } from "../features/CollectFlow/orderSummery";
import { BottomTabNavigator } from "./BottomTabNavigation";
import { OrderConformation } from "../features/orderConformation";
import { PickUpDate } from "../features/SupplyFlow/pickUpSheduling/pickUpDate";
import { LoginScreen } from "../features/Auth/loginScreen/LoginScreen";
import { RegisterScreen } from "../features/Auth/register";
import { Text, TouchableOpacity, View } from "react-native";
import MenuIcon from "../assets/others/menu-3-line.svg";
import Bell from "../assets/others/bell.svg";
import { CollectScreen } from "../features/CollectFlow/CollectScreen/CollectScreen";
import CongratulationScreen from "../features/CongratulationScreen/CongratulationScreen";
import { styles } from "../features/SupplyFlow/StockScreen/styles";
import { StockScreen } from "../features/SupplyFlow/StockScreen/StockScreen";
import OrderDetailsScreen from "../features/OrderDetailsScreen/OrderDetailsScreen";
import { colors } from "../globals/colors";
import { navigationRef, navigate } from "./navigationService";
import NotificationScreen from "../features/notification/Notification";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectNotificationCount } from "../redux/selectors";
import { BillOfSupplyScreen } from "../features/CollectFlow/orderSummery/BillOfSupply";
import { QuantitySubmit } from "../features/CollectFlow/qualitySelection/QuantitySubmit";
import { DynamicIcon } from "../utils/Dynamic/DynamicIcon";

import { SelectProcess } from "../features/ProcessScreen/Screens/SelectProcess/SelectProcess";
import { SelectedProcess } from "../features/ProcessScreen/Screens/SelectedProcess/index";
import { SelectedProcessSummary } from "../features/ProcessScreen/Screens/SelectedProcessSummary/index";
import Receive from "../features/ReceiveSection/Receive/Receive";
import { OrderConfirmation } from "../features/ReceiveSection/OrderConfirmation/OrderConfirmation";
import { DeliveryConfirmation } from "../features/ReceiveSection/DeliveryConfirmation/DeliveryConfirmation";
import { DeliveryQRScan } from "../features/ReceiveSection/DeliveryConfirmation/DeliveryQRScan";
import { History } from "../features/AllHistory/ReceiveHistory/History";
import { HistoryDetails } from "../features/AllHistory/ReceiveHistory/HistoryDetail";
import { MoreStack } from "./MoreStack";
import { OrderDetailsCard } from "@src/features/AllHistory/orderList/components/OrderDetailsCard";
import { HistoryStack } from "./HistoryStack";
import { ProductionDetailsScreen } from "@src/features/AllHistory/ProductionReport/ProductionDetailsScreen";
import { HeaderBackBtn } from "./AuthStack";
import HomeScreen from "@src/features/HomeScreen/HomeScreen";
import AllHistory from "@src/features/AllHistory/AllHistory";
import { Stocks } from "@src/features/Stock/Stocks";
import { CategoryScreen } from "@src/features/CollectionAgent/CategoryList/Category";
import { TransactionHistory } from "@src/features/CollectionAgent/TransactionHistory/TransactionHistory";
import { TransportationInfo } from "@src/features/SupplyFlow/TransportationInfo/TransportationInfo";
import { UploadDocument } from "@src/features/SupplyFlow/UploadDocument/UploadDocument";
import { Receipt } from "@src/features/SupplyFlow/Receipt/Receipt";
import CollectReceipt from "@src/features/CollectFlow/CollectReceipt/CollectReceipt";
import AcceptedMaterialList from "@src/features/AcceptedMaterial/AcceptedMaterialList/AcceptedMaterialList";
import DetailScreen from "@src/features/AcceptedMaterial/DetailScreen/DetailScreen";
import PendingSignupList from "@src/features/ApproveSignUp/PendingSignupList/PendingSignupList";
import ApproveDetailScreen from "@src/features/ApproveSignUp/ApproveDetailScreen/ApproveDetailScreen";
import ConfirmWeightList from "@src/features/ConfirmWeight/ConfirmWeightList/ConfirmWeightList";
import ConfirmWeightDetailScreen from "@src/features/ConfirmWeight/ConfirmWeightDetailScreen/ConfirmWeightDetailScreen";
import { CertifiedMaterialsList } from "@src/features/CertifiedMaterials/CertifiedMaterialsList";
import { CertifiedMaterialsDetail } from "@src/features/CertifiedMaterials/CertifiedMaterialsDetail";
import Deals from "@src/features/HomeScreen/Components/Deals";
import Trend from "@src/features/Trend/Trend";
import { useTranslation } from "react-i18next";
import { AcceptQRScan } from "@src/features/AcceptedMaterial/DetailScreen/AcceptQRScan";

const StackNavigation = createNativeStackNavigator();

export const headerRight = () => {
  const navigation = useNavigation();

  const notificationCount = useSelector(selectNotificationCount);
  return (
    <View style={styles.headerBackgroundStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.notificaion.list)}
      >
        <Bell height={22} width={22} fill={colors.dark} />
        {notificationCount > 0 && (
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const HeaderLeft = ({ navigation, iconColor }) => {
  return (
    <View style={{ borderColor: "none" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <MenuIcon height={22} width={22} fill={iconColor ?? colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

export const headerTitleStyle = {
  lineHeight: 28,
  textAlign: "center",
  color: colors.dark,
};

const stackOptions = { headerShown: true, title: "" };
export const options = (title: string) => {
  const options: any = navigationRef.getCurrentOptions();
  return ({ navigation }) => {
    return {
      title: options?.title ?? title,
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitleAlign: "center",
      headerTintColor: colors.dark,
      headerTitleStyle,
      headerRight,
      headerStatusBarHeight: 0,
      safeAreaInsets: { top: 0 },
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colors.backgroundColor,
      },
    };
  };
};

export const optionsWithoutHeaderLeft = (title: string) => () => ({
  title,
  headerTitleAlign: "center",
  headerTitleStyle,
  // headerStatusBarHeight: 0,
  safeAreaInsets: { top: 10 },
  headerShadowVisible: false,
  headerTintColor: colors.primary,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: colors.backgroundColor,
  },
});

export function RootNavigation() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <StackNavigation.Navigator
      initialRouteName={routes.bottomTabs.default}
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerLeft: () => <HeaderBackBtn navigation={navigation} />,
      }}
    >
      <StackNavigation.Screen
        name={routes.bottomTabs.default}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* <StackNavigation.Screen
        name={routes.bottomTabs.default}
        component={BottomTabNavigator}
        options={{
          headerShown: false
        }}
      /> */}
      <StackNavigation.Screen
        name="CollectScreen"
        component={CollectScreen}
        options={optionsWithoutHeaderLeft("Enter Depositor Info")}
      />
      <StackNavigation.Screen
        name="acceptedMaterialList"
        component={AcceptedMaterialList}
        options={optionsWithoutHeaderLeft(t("Accept Material"))}
      />
      <StackNavigation.Screen
        name="acceptedDetails"
        component={DetailScreen}
        options={optionsWithoutHeaderLeft(t("Accept Material"))}
      />
      <StackNavigation.Screen
        name="confirmWeightList"
        component={ConfirmWeightList}
        options={optionsWithoutHeaderLeft(t("Weight Confirmation"))}
      />
      <StackNavigation.Screen
        name="confirmWeightDetailScreen"
        component={ConfirmWeightDetailScreen}
        options={optionsWithoutHeaderLeft("Weight Confirmation")}
      />

      <StackNavigation.Screen
        name="pendingSignupList"
        component={PendingSignupList}
        options={optionsWithoutHeaderLeft(t("Approve sign up"))}
      />
      <StackNavigation.Screen
        name="deals"
        component={Deals}
        options={optionsWithoutHeaderLeft(t("Deals"))}
      />
      <StackNavigation.Screen
        name="trend"
        component={Trend}
        options={optionsWithoutHeaderLeft(t("Trend"))}
      />
      <StackNavigation.Screen
        name="approveDetailScreen"
        component={ApproveDetailScreen}
        options={optionsWithoutHeaderLeft(t("Approve sign up"))}
      />

      <StackNavigation.Screen
        name={routes.bottomTabs.allHistory}
        component={AllHistory}
        options={optionsWithoutHeaderLeft(t("History"))}
      />
      <StackNavigation.Screen
        name={routes.history.receiveHistory}
        component={History}
        options={optionsWithoutHeaderLeft(t("History"))}
      />
      <StackNavigation.Screen
        name={"certifiedList"}
        component={CertifiedMaterialsList}
        options={optionsWithoutHeaderLeft(t("Certified Materials"))}
      />
      <StackNavigation.Screen
        name={"certifiedDetails"}
        component={CertifiedMaterialsDetail}
        options={optionsWithoutHeaderLeft(t("Certified Materials"))}
      />
      <StackNavigation.Screen
        name={routes.bottomTabs.entry}
        component={Stocks}
        options={optionsWithoutHeaderLeft("Stocks")}
      />

      <StackNavigation.Screen
        name="StockScreen"
        component={StockScreen}
        options={optionsWithoutHeaderLeft(t("Create Supply"))}
      />
      <StackNavigation.Screen
        name="MoreStack"
        component={MoreStack}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.process.process}
        component={SelectProcess}
        options={optionsWithoutHeaderLeft(t("Process"))}
      />
      <StackNavigation.Screen
        name={routes.process.selectProcess}
        component={SelectProcess}
        options={optionsWithoutHeaderLeft("Select Process")}
      />
      <StackNavigation.Screen
        name={routes.process.preSort}
        component={SelectedProcess}
        options={optionsWithoutHeaderLeft("Sortings")}
      />

      <StackNavigation.Screen
        name={routes.process.preSortingSummary}
        component={SelectedProcessSummary}
        options={optionsWithoutHeaderLeft("Summary")}
      />
      {/* <StackNavigation.Screen
        name="receive"
        component={ReceiveStack}
        options={{ headerShown: false }}
      /> */}
      <StackNavigation.Screen
        name={"receiveStack"}
        component={Receive}
        options={optionsWithoutHeaderLeft("Receive")}
      />
      <StackNavigation.Screen
        name={"orderConfirmation"}
        component={OrderConfirmation}
        options={optionsWithoutHeaderLeft("Order Confirmation")}

        // options={{
        //   headerShown: true,
        //   headerTitle: "Order Confirmation",
        // }}
      />
      <StackNavigation.Screen
        name={"deliveryConfirmation"}
        component={DeliveryConfirmation}
        options={optionsWithoutHeaderLeft("Delivery Confirmation")}

        // options={{
        //   headerShown: true,
        //   headerTitle: "Delivery Confirmation",
        // }}
      />
      <StackNavigation.Screen
        name={"deliveryQRScan"}
        component={DeliveryQRScan}
        options={optionsWithoutHeaderLeft("Delivery Confirmation")}

        // options={{
        //   headerShown: true,
        //   headerTitle: "Delivery Confirmation",
        // }}
      />

      <StackNavigation.Screen
        name={"acceptQRScan"}
        component={AcceptQRScan}
        options={optionsWithoutHeaderLeft("Acccept Material")}
      />

      <StackNavigation.Screen
        name={"history"}
        component={History}
        options={optionsWithoutHeaderLeft(t("History"))}

        // options={{
        //   headerShown: true,
        //   headerTitle: "History",
        // }}
      />
      <StackNavigation.Screen
        name={"historyDetails"}
        component={HistoryDetails}
        options={optionsWithoutHeaderLeft(t("Order Details"))}

        // options={{
        //   headerShown: true,
        //   headerTitle: "History",
        // }}
      />
      <StackNavigation.Screen
        name="CongratulationScreen"
        component={CongratulationScreen}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="HistoryStack"
        component={HistoryStack}
        options={{ headerShown: false }}
      />

      <StackNavigation.Screen
        name="SupplyOrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{
          title: "Supply Order Details",
          headerTitleAlign: "center",
          headerTintColor: colors.dark,
        }}
      />
      <StackNavigation.Screen
        name="OrderDetailsCard"
        component={OrderDetailsCard}
        options={{
          title: t("Order Details"),
          headerTitleAlign: "center",
          headerTintColor: colors.dark,
        }}
      />
      <StackNavigation.Screen
        name="register"
        component={RegisterScreen}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="catalogue"
        component={CatalogueScreen}
        options={optionsWithoutHeaderLeft(t("Collect"))}
      />
      <StackNavigation.Screen
        name="categoryScreen"
        component={CategoryScreen}
        options={optionsWithoutHeaderLeft(t("Select Category"))}
      />
      <StackNavigation.Screen
        name="transactionHistory"
        component={TransactionHistory}
        options={optionsWithoutHeaderLeft(t("Transaction History"))}
      />
      <StackNavigation.Screen
        name={"TransportationInfo"}
        component={TransportationInfo}
        options={optionsWithoutHeaderLeft(t("Transportation Info"))}
      />

      <StackNavigation.Screen
        name={"UploadDocument"}
        component={UploadDocument}
        options={optionsWithoutHeaderLeft("Proof of Dispatch")}
      />

      <StackNavigation.Screen
        name={"Receipt"}
        component={Receipt}
        options={optionsWithoutHeaderLeft("Receipt")}
      />
      <StackNavigation.Screen
        name={routes.user.login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.dateTimePicker.datePicker}
        component={PickUpDate}
        options={optionsWithoutHeaderLeft("Schedule Supply")}
      />
      <StackNavigation.Screen
        name={routes.orderConformation.default}
        component={OrderConformation}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name={routes.orderSummery.default}
        component={OrderSummery}
        options={optionsWithoutHeaderLeft("Collection Summary")}
      />
      <StackNavigation.Screen
        name={"collectReceipt"}
        component={CollectReceipt}
        options={{
          title: t("Collection Receipt"),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.bottomTabs.default);
              }}
            >
              <DynamicIcon
                iconName={"arrow-back-outline"}
                iconSize={25}
                iconColor={colors.dark}
                iconFamily={"Ionicons"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.quality.default}
        component={QualitySelection}
        options={optionsWithoutHeaderLeft(t("Select Item"))}
      />
      <StackNavigation.Screen
        name={routes.quality.selection}
        component={QuantitySubmit}
        options={optionsWithoutHeaderLeft("Upload Image")}
      />
      <StackNavigation.Screen
        name={routes.notificaion.list}
        component={NotificationScreen}
        options={optionsWithoutHeaderLeft(t("Notifications"))}
      />
      <StackNavigation.Screen
        name={routes.bill.default}
        component={BillOfSupplyScreen}
        options={{
          title: t("Collection Receipt"),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.bottomTabs.default);
              }}
            >
              <DynamicIcon
                iconName={"arrow-back-outline"}
                iconSize={25}
                iconColor={colors.dark}
                iconFamily={"Ionicons"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.production.productionDetails}
        component={ProductionDetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Production Details",
        })}
      />
    </StackNavigation.Navigator>
  );
}
