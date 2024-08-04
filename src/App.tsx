import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { navigationRef } from "./navigation/navigationService";
import { RootState } from "./redux/store";
import { RootContainer } from "./RootContainer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toast } from "./services/toast/ToastComponent";
import {
  notificationListener,
  requestUserPermission,
} from "./services/notification/notificationService";
import dayjs from "dayjs";
import { customParseFormat } from "./utils/dateUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStack } from "./navigation/AuthStack";
import { OnBoardingStack } from "./navigation/OnBoardingStack";
import { RootNavigation } from "./navigation/RootNavigation";
import { Alert, AppState, Linking, Platform, View } from "react-native";
import { screenHeight, screenWidth } from "./globals/themes";
import LottieView from "lottie-react-native";
import { colors } from "./globals/colors";
import i18next from "i18next";
import "./i18n/i18n";
import VersionCheck from "react-native-version-check";

const Stack = createNativeStackNavigator();

const Splash = () => (
  <View style={{ backgroundColor: colors.primary }}>
    <LottieView
      source={require("../src/assets/gifs/splash.json")}
      style={{ width: screenWidth, height: screenHeight }}
      autoPlay
      loop
      resizeMode="cover"
    />
  </View>
);

const App = () => {
  const [selectedLng, setSelectedLng] = useState("en");
  const getLng = async () => {
    let storedLangugage = await AsyncStorage.getItem("storedLng");
    // console.log(storedLangugage, "================+");
    setSelectedLng(storedLangugage);
  };

  const { onBoardStatus } = useSelector((state: RootState) => state?.onBoard);

  const [showBoard, setShowBoard] = useState(false);

  const getBoard = async () => {
    const getonboard = await AsyncStorage.getItem("onboard");
    if (getonboard !== "Completed" || onBoardStatus?.onboard !== "Completed") {
      setShowBoard(true);
    } else {
      setShowBoard(false);
    }
  };

  useEffect(() => {
    getBoard();
  }, [showBoard, onBoardStatus]);

  const { token } = useSelector((state: RootState) =>
    state?.auth?.currentUser ? state?.auth?.currentUser : ""
  );

  useEffect(() => {
    // SplashScreen.hide();
    requestUserPermission();
    notificationListener();
    getLng();
    i18next.changeLanguage(selectedLng);
  }, [selectedLng]);

  useEffect(() => {
    getLng();
    i18next.changeLanguage(selectedLng);
  }, [selectedLng]);

  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 3500);
  }, []);

  useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

  useEffect(() => {
    dayjs.extend(customParseFormat);
  }, []);

  //HANDLE VERSION CHECK AND FORCE UPDATE

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        checkVersion();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Initial check when the app loads
    checkVersion();

    return () => {
      subscription.remove();
    };
  }, []);

  const checkVersion = async () => {
    try {
      const latestVersion = await VersionCheck.getLatestVersion();
      const currentVersion = VersionCheck.getCurrentVersion();
      if (latestVersion > currentVersion) {
        showAlert();
      }
    } catch (error) {
      console.error("Error checking version:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const url =
        Platform.OS === "ios"
          ? await VersionCheck.getAppStoreUrl({ appID: "6502573874" })
          : await VersionCheck.getPlayStoreUrl({
              packageName: "com.maritime",
            });
      if (url) {
        Linking.openURL(url);
      }
    } catch (error) {
      console.error("Error handling update:", error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Update Available",
      "A new version of the app is available. Please update to the latest version to continue.",
      [{ text: "Update Now", onPress: handleUpdate }],
      { cancelable: false }
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <RootContainer />
          <Toast />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hideSplash ? (
              <Stack.Screen name="splash" component={Splash} />
            ) : showBoard ? (
              <Stack.Screen name="onboard" component={OnBoardingStack} />
            ) : !token ? (
              <Stack.Screen name="auth" component={AuthStack} />
            ) : (
              <Stack.Screen name="Root" component={RootNavigation} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
