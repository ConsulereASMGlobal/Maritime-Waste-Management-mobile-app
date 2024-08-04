import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { LoginScreen } from "../features/Auth/loginScreen/LoginScreen";
import { RegisterScreen } from "../features/Auth/register";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import MenuIcon from "../assets/others/menu-3-line.svg";
import Bell from "../assets/others/bell.svg";
import { styles } from "../features/SupplyFlow/StockScreen/styles";
import { colors } from "../globals/colors";
import { navigationRef } from "./navigationService";
import { useSelector } from "react-redux";
import { selectNotificationCount } from "../redux/selectors";
import { CollectionInformation } from "../features/Auth/register/CollectionInformation";
import { PickupLocation } from "../features/Auth/register/PickupLocation";
import { WalletInformation } from "../features/Auth/register/WalletInformation";
import { WalletDetailInformation } from "../features/Auth/register/WalletDetailInformation";
import { LastStep } from "../features/Auth/register/LastStep";
import { ApplicationSubmitted } from "../features/Auth/register/ApplicationSubmitted";
import { ForgotPasword } from "../features/Auth/ForgotPasword/index";
import { SendOTP } from "../features/Auth/VerificationScreens/SendOTP";
import { VerifyOTP } from "../features/Auth/VerificationScreens/VerifyOTP";
import { PDFViewer } from "../features/Auth/register/PDFViewer";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { UploadInfo } from "@src/features/Auth/register/UploadInfo";
import { BankDetails } from "@src/features/Auth/register/BankDetails";
import { PasswordSet } from "@src/features/Auth/register/PasswordSet";
import { SelectUserType } from "@src/features/Auth/register/SelectUserType";
import GradientBackground from "@src/components/GradientBackground";

const StackNavigation = createNativeStackNavigator();

export const HeaderRight = ({ navigation }: any) => {
  const notificationCount = useSelector(selectNotificationCount);
  return (
    <View style={styles.headerBackgroundStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.notificaion.list)}
      >
        <Bell height={22} width={22} fill={colors.primary} />
        {notificationCount > 0 && (
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const HeaderLeft = ({ navigation }: any) => {
  return (
    <View style={styles.headerBackgroundStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <MenuIcon
          height={22}
          width={22}
          fill={colors.primary}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};
export const HeaderBackBtn = ({ navigation, bgColor, backbtnColor }: any) => {
  return (
    <View
      style={[
        // styles.headerBackgroundStyle,
        {
          // backgroundColor: bgColor,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <DynamicIcon
          iconFamily="AntDesign"
          iconName={Platform.OS === "ios" ? "left" : "arrowleft"}
          iconColor={backbtnColor ?? colors.primary}
          iconSize={22}
        />
      </TouchableOpacity>
    </View>
  );
};

export const headerTitleStyle = {
  fontSize: 22,
  lineHeight: 28,
  textAlign: "center",
};

const stackOptions = { headerShown: false, title: "" };
export const options = (title: string) => {
  const options: any = navigationRef.getCurrentOptions();
  return ({ navigation }) => {
    return {
      title: options?.title ?? title,
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitleAlign: "center",
      headerTintColor: colors.primary,
      headerTitleStyle,
      headerRight,
      headerStatusBarHeight: 0,
      safeAreaInsets: { top: 0 },
      headerShadowVisible: false,
    };
  };
};

export function AuthStack() {
  return (
    <StackNavigation.Navigator
      initialRouteName={"login"}
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <StackNavigation.Screen
        name="login"
        component={LoginScreen}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="register"
        component={RegisterScreen}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="collectionInformation"
        component={CollectionInformation}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="pickupLocation"
        component={PickupLocation}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="walletInformation"
        component={WalletInformation}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="walletDetailInformation"
        component={WalletDetailInformation}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="uploadStep"
        component={UploadInfo}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="bankDetails"
        component={BankDetails}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="passwordSet"
        component={PasswordSet}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="lastStep"
        component={LastStep}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="applicationSubmitted"
        component={ApplicationSubmitted}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="forgotPassword"
        component={ForgotPasword}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="selectUserType"
        component={SelectUserType}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="sendOtp"
        component={SendOTP}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="verifyOtp"
        component={VerifyOTP}
        options={stackOptions}
      />
      <StackNavigation.Screen
        name="pdfViewer"
        component={PDFViewer}
        options={{
          title: "PDF Viewer",
          headerTitleAlign: "center",
        }}
      />
    </StackNavigation.Navigator>
  );
}
