import { View, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

import CollectSVG from "@src/assets/dashboardIcons/CollectSVG";
import ProcessSVG from "@src/assets/dashboardIcons/ProcessSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";
import { selectProfile, selectUserId } from "@src/redux/selectors";
import { ProfileAPI } from "@src/services/api";
import toast from "@src/services/toast";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { Spacer } from "@src/components/common/Spacer";

const components: any = {
  collect: CollectSVG,
  process: ProcessSVG,
  supply: SupplySVG,
  receive: ReceiveSVG,
};
const CustomIcon = (iconName: any) => {
  const IconComponent = components[iconName];
  return <IconComponent color={colors.white} />;
};

const HomeScreen = ({ navigation }: any) => {
  const userId = useSelector(selectUserId);
  const soreFcmToServer = async () => {
    let fcmToken = await AsyncStorage.getItem("@fcmToken");
    ProfileAPI.setFirebaseToken({
      firebaseToken: fcmToken,
      userId,
    }).then(() => console.log("Setting Fcm Token"));
  };

  const profileData = useSelector(selectProfile);

  useEffect(() => {
    soreFcmToServer();
  }, []);

  const functionalities = [
    {
      title: "Collect",
      description: "Collect recyclables from depositors",
      icon: "collect",
      navigateTo: "CollectScreen",
      permission: "PICKUP_POINT",
    },
    {
      title: "Process",
      description: "Process the recyclables",
      icon: "process",
      navigateTo: "ProcessScreen",
      permission: "PICKUP_POINT",
    },
    {
      title: "Supply",
      description: "Supply recyclables to diverters",
      icon: "supply",
      navigateTo: "StockScreen",
      permission: "PICKUP_POINT",
    },
    {
      title: "Receive",
      description: "Receive recyclables from suppliers",
      icon: "receive",
      navigateTo: "receiveStack",
      // permission: 'PICKUP_POINT'
      permission: "RECYCLER",
    },
  ];

  const authNavigate = (screen: string, permission: string) => {
    const userType = profileData?.userType;
    if (userType !== permission) {
      toast.danger({
        message: "This functionality is not applicable for your user type!",
      });
      return;
    }
    navigation.navigate(screen);
  };
  return (
    <ScrollContainerLayout
      contentStyle={{ paddingBottom: 25 }}
      topBgColor={colors.secondary}
      style={styles.mainContainer}
    >
      {/* <TextBold>Choose to collect or return materials</TextBold> */}
      <Spacer spacing={20} />
      {functionalities?.map((each, index) => (
        <Pressable
          key={index}
          onPress={() => authNavigate(each.navigateTo, each.permission)}
          style={{
            marginHorizontal: 1,
            marginTop: 2,
          }}
        >
          <View style={styles.card}>
            <View>
              <TextField style={styles.textStyle}>{each.title}</TextField>
              <TextField style={styles.descTxt}>{each.description}</TextField>
            </View>
            <View style={styles.circleView}>{CustomIcon(each?.icon)}</View>
          </View>
        </Pressable>
      ))}
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
  card: {
    height: 100,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  textStyle: {
    fontSize: 24,
    lineHeight: 27,
    color: colors.primary,
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
