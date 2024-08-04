import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { colors } from "../globals/colors";
import Dashboard from "@src/features/MoreScreens/Dashboard/Dashboard";
import { HeaderBackBtn } from "./AuthStack";
import { useNavigation } from "@react-navigation/native";
import { OrderStack } from "./OrderStack";
import { ProductionStack } from "./ProductionStack";
import ContactUs from "@src/features/MoreScreens/contactUs/ContactUs";
import { PrivacyPolicy } from "@src/features/MoreScreens/PrivacyPolicy/PrivacyPolicy";
import { FaqScreen } from "@src/features/MoreScreens/FAQ";
import { ChangePasword } from "@src/features/MoreScreens/ChangePasword";
import { MyProfile } from "@src/features/MyProfile/MyProfile";
import { MoreScreen } from "@src/features/MoreScreens/MoreScreen";
import GradientBackground from "@src/components/GradientBackground";
import LinearGradient from "react-native-linear-gradient";
import { SwitchLanguage } from "@src/features/SwitchLanguage";
import { useTranslation } from "react-i18next";

const StackNavigation = createNativeStackNavigator();

export function MoreStack() {
  const { t } = useTranslation();

  const navigation = useNavigation();
  return (
    <StackNavigation.Navigator
      initialRouteName={routes.more.default}
      screenOptions={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        // headerStyle: {
        //   backgroundColor: colors.backgroundColor,
        // },
        // headerLeft: () => <HeaderBackBtn navigation={navigation} />,
        // headerBackground: () => (
        //   <LinearGradient
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 0 }}
        //     colors={[colors.primary, colors.primaryLight2]}
        //     style={{ flex: 1 }}
        //   />
        // ),
        headerLeft: () => (
          <HeaderBackBtn navigation={navigation} backbtnColor={colors.white} />
        ),
        headerTintColor: colors.white,
      })}
    >
      <StackNavigation.Screen
        name={routes.more.default}
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.more.dashboard}
        component={Dashboard}
        options={{
          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.more.profile}
        component={MyProfile}
        options={{
          title: t(routes.more.profile),
          // headerBackground: () => <GradientBackground />,
          // headerStyle: {
          //   backgroundColor: colors.primary,
          // },

          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.more.collectOrder}
        component={OrderStack}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.more.production}
        component={ProductionStack}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.more.contactUs}
        component={ContactUs}
        options={{
          title: t(routes.more.contactUs),
          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.more.privacyPolicy}
        component={PrivacyPolicy}
        options={{
          title: t(routes.more.privacyPolicy),
          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.more.faq}
        component={FaqScreen}
        options={{
          title: t(routes.more.faq),
          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.more.changePassword}
        component={ChangePasword}
        options={{
          title: t(routes.more.changePassword),
          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
      <StackNavigation.Screen
        name={routes.more.switchLanguage}
        component={SwitchLanguage}
        options={{
          title: t(routes.more.switchLanguage),
          headerBackground: () => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primaryLight2]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
    </StackNavigation.Navigator>
  );
}
