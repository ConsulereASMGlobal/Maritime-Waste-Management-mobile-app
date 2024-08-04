import { StyleSheet, View } from "react-native";
import React from "react";
import { Spacer } from "@src/components/common/Spacer";
import Button from "@src/components/Button/Button";
import { colors } from "@src/globals/colors";
import { useAppDispatch } from "@src/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onBoradActions } from "@src/redux/actions/combineAction";
import { BORDER_RADIUS_SIZE } from "@src/globals/themes";

const TwoButtons = ({
  navigation,
  screen,
  firstBtnTitle = "Next",
  secondBtnTitle = "Skip",
}: any) => {
  const dispatch = useAppDispatch();
  const secondBtnAction = async (condition: any) => {
    if (condition === "Sign up") {
      await AsyncStorage.setItem("onboard", "Completed");
      // dispatch(onBoradActions.onboard({ onboard: "Completed" }));
      navigation.navigate("authStack", {
        screen: "selectUserType",
        params: {
          heading: "Create an account",
          subheading: "Create an account to get started on your journey.",
          routeFrom: "register",
        },
      });
    } else {
      dispatch(onBoradActions.onboard({ onboard: "Completed" }));
      await AsyncStorage.setItem("onboard", "Completed");
    }
  };
  return (
    <View>
      <Spacer spacing={5} />
      <Button
        title={firstBtnTitle}
        onPress={
          screen === "finished"
            ? async () => {
                dispatch(onBoradActions.onboard({ onboard: "Completed" }));
                await AsyncStorage.setItem("onboard", "Completed");
              }
            : () => navigation.navigate(screen)
        }
        textStyle={{ marginRight: -BORDER_RADIUS_SIZE }}
      />
      <Button
        title={secondBtnTitle}
        onPress={
          () => secondBtnAction(secondBtnTitle)
          // secondBtnTitle === "Sign up"
          //   ? async () => {
          //       await AsyncStorage.setItem("onboard", "Completed");
          //       dispatch(onBoradActions.onboard({ onboard: "Completed" }));
          //     }
          //   :
          //   navigation.navigate("second")
        }
        style={{
          backgroundColor: colors.white,
          borderColor: colors.primary,
          borderWidth: 1,
        }}
        textStyle={{ color: colors.primary, marginRight: -BORDER_RADIUS_SIZE }}
      />
    </View>
  );
};

export default TwoButtons;

const styles = StyleSheet.create({});
