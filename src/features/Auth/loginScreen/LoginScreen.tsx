import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Keyboard } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { TextBold, TextMedium } from "@src/components/TextField/TextField";
import { LoginFormContainer } from "@src/container/formContainer/LoginFormContainer";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import TitleLogoView from "../Components/TitleLogoView";
import ImageBg from "../Components/ImageBg";
import { FastImage } from "@src/components/image";

export const LoginScreen = ({ navigation }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <ScrollContainerLayout
        topBgColor={colors.primaryLight2}
        btmBgColor={colors.primaryLight2}
        contentStyle={{ flex: 1 }}
        scrollBgColor={colors.primaryLight2}
      >
        <ImageBg />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TitleLogoView
            title={`Matitime Waste Management`}
            desc={`Making a difference in Ocean and Maritime Waste`}
          />
          <View style={styles.rootContainer}>
            <View style={{ width: "100%" }}>
              <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                Login
              </TextBold>
              <Spacer spacing={5} />
              <LoginFormContainer />
              <Spacer spacing={15} />

              <View style={styles.registerRow}>
                <TextMedium>Don't have an account? </TextMedium>

                <Pressable
                  style={styles.registerBtn}
                  onPress={() =>
                    navigation.navigate("selectUserType", {
                      heading: "Create an account",
                      subheading:
                        "Create an account to get started on your journey.",
                      routeFrom: "register",
                    })
                  }
                >
                  <TextMedium
                    style={{
                      color: colors.primary,
                    }}
                  >
                    Register
                  </TextMedium>
                </Pressable>
              </View>

              {/* {!keyboardOpen && (
              )} */}
            </View>
            <Spacer spacing={10} />
            <View style={styles.row}>
              <FastImage
                source={require("../../../assets/others/poweredbyasm.png")}
                resizeMode="contain"
                style={styles.poweredbyImage}
              />
            </View>
          </View>
        </View>
      </ScrollContainerLayout>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 1,
  },

  rootContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: REGULAR_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    paddingVertical: REGULAR_PADDING_SIZE,
    backgroundColor: colors.white,
    borderRadius: 20,
  },

  poweredbyImage: {
    height: 30,
    width: 160,
  },

  row: {
    alignItems: "center",
    // position: "absolute",
    // bottom: 15,
    // left: 0,
    // right: 0,
  },
  registerRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  registerBtn: { justifyContent: "center", alignItems: "center" },
});
