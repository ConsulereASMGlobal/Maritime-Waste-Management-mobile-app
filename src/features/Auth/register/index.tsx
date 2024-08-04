import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { RegisterFormContainer } from "@src/container/formContainer/RegisterFormContainer";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import TitleLogoView from "../Components/TitleLogoView";
import ImageBg from "../Components/ImageBg";
import HorizontalCount from "../Components/HorizontalCount";

interface Props {
  navigation?: any;
  route?: any;
}

export const RegisterScreen = ({ navigation, route }: Props) => {
  const { mobile, prefix, country, userType, aggregatorID } = route.params;
  return (
    <ScrollContainerLayout
      topBgColor={colors.primaryLight2}
      btmBgColor={colors.primaryLight2}
      // contentStyle={{ flex: 1 }}
      scrollBgColor={colors.primaryLight2}
    >
      <ImageBg />
      {/* <LogoContainer /> */}
      {/* <View
        style={{
          backgroundColor: colors.secondary,
          height: 75,
        }}
      /> */}
      <TitleLogoView
        title={"Create an account"}
        desc={"Enter your information to start your eco-journey now!"}
        titleSize={24}
      />
      <View>
        <CardLayout
          style={{
            top: 0,
            marginHorizontal: REGULAR_PADDING_SIZE / 2,
            paddingHorizontal: REGULAR_PADDING_SIZE,
            paddingVertical: REGULAR_PADDING_SIZE,
          }}
        >
          <View style={styles.rootContainer}>
            <View style={styles.mainContainer}>
              <HorizontalCount text={1} />
              <Spacer spacing={10} />

              <View style={{ alignSelf: "flex-start" }}>
                <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                  {userType === "PICKUP_POINT"
                    ? "Aggregator's"
                    : userType === "RECYCLER"
                    ? "Recycler's"
                    : "Collection Agent's"}
                  {`\nInformation`}
                </TextBold>
                <Spacer spacing={3} />
              </View>

              <RegisterFormContainer
                mobile={mobile}
                country={country}
                prefix={prefix}
                userType={userType}
                aggregatorID={aggregatorID}
              />
              <Spacer spacing={10} />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TextField style={{ lineHeight: 30 }}>
                  Already have an Account?{" "}
                </TextField>
                <Pressable
                  style={{ marginTop: -3 }}
                  onPress={() => navigation.navigate("login")}
                >
                  <TextField
                    style={{
                      fontWeight: "bold",
                      color: colors.secondary,
                      lineHeight: 22,
                    }}
                  >
                    Login
                  </TextField>
                </Pressable>
              </View>
              <Spacer spacing={10} />
            </View>
          </View>
        </CardLayout>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },

  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
