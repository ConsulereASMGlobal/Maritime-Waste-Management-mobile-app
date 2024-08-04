import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes } from "./routes";
import { colors } from "../globals/colors";
import { Text } from "react-native";
import HomeSvgIcon from "../assets/tabIcons/HomeSvgIcon";
import { styles } from "../features/SupplyFlow/StockScreen/styles";
import { isIOS } from "../globals/globalStyles";
import { headerRight, headerTitleStyle } from "./RootNavigation";
import { MEDIUM_PADDING_SIZE } from "../globals/themes";
import { useSelector } from "react-redux";
import { selectProfile, selectUserType } from "../redux/selectors";
import MoreSvgIcon from "@src/assets/tabIcons/MoreSvgIcon";
import Dashboard from "@src/features/MoreScreens/Dashboard/Dashboard";
import DashboardSvg from "@src/assets/MoreScreenIcons/DashboardSvg";
import { MoreStack } from "./MoreStack";
import HomeScreen2 from "@src/features/HomeScreen/HomeScreen";
import MapSVGIcon from "@src/assets/tabIcons/MapSVGIcon";
import { Map } from "@src/features/Map/Map";
// import HomeScreen from "@src/features/HomeScreen/HomeScreen";
import { StockScreen } from "@src/features/SupplyFlow/StockScreen/StockScreen";
import { Stocks } from "@src/features/Stock/Stocks";
import StocksSvgIcon from "@src/assets/tabIcons/StocksSvgIcon";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const profileData = useSelector(selectProfile);

  const userType = profileData?.userType;
  const seletedUserType = useSelector(selectUserType);
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      // initialRouteName={'Home'}
      screenOptions={({ route, navigation }) => ({
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text style={styles.tabBarLevelStyle({ focused, color })}>
              {route.name}
            </Text>
          );
        },
        headerShown: false,
        headerTransparent: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.dark,
        tabBarStyle: {
          height: isIOS ? 70 : 56,
          paddingTop: 6,
          paddingBottom: isIOS ? 20 : 5,
        },
        headerTitleAlign: "center",
        headerTintColor: colors.dark,
        headerTitleStyle,
        headerShadowVisible: false,
        // headerLeft: () => (
        //   <View style={{ paddingTop: MEDIUM_PADDING_SIZE }}>
        //     <HeaderLeft navigation={navigation} />
        //   </View>
        // ),
        headerRightContainerStyle: {
          paddingRight: 20,
          justifyContent: "center",
          paddingBottom: 10,
          paddingTop: MEDIUM_PADDING_SIZE,
        },
        headerLeftContainerStyle: {
          paddingLeft: 20,
          justifyContent: "center",
          paddingBottom: 12,
        },
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
      })}
    >
      <Tab.Screen
        name={t("Home")}
        component={HomeScreen2}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeSvgIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: t("Home"),

          headerRight,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={t(routes.bottomTabs.map)}
        component={Map}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <MapSVGIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: "Map",
        })}
      />
      {seletedUserType === "PICKUP_POINT" && (
        <Tab.Screen
          name={t(routes.bottomTabs.dashboard)}
          component={Dashboard}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <DashboardSvg color={focused ? colors.primary : colors.dark} />
            ),
            title: t("Dashboard"),
          })}
        />
      )}
      {seletedUserType === "PICKUP_POINT" && (
        <Tab.Screen
          name={t(routes.bottomTabs.entry)}
          component={Stocks}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <StocksSvgIcon color={focused ? colors.primary : colors.dark} />
            ),
            title: t("Stocks"),
          })}
        />
      )}
      <Tab.Screen
        name={t(routes.bottomTabs.more)}
        component={MoreStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MoreSvgIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: "More",
        }}
      />
    </Tab.Navigator>
  );
};
