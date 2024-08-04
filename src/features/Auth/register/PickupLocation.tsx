import React from "react";
import { View, StyleSheet } from "react-native";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import LogoContainer from "../Components/LogoContainer";
import TopShadowView from "../Components/TopShadowView";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import TitleLogoView from "../Components/TitleLogoView";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import { PickupFormContainer } from "@src/container/formContainer/PickupFormContainer";
import Button from "@src/components/Button/Button";
import ImageBg from "../Components/ImageBg";
import HorizontalCount from "../Components/HorizontalCount";

interface Props {
  navigation?: any;
  route?: any;
}

export const PickupLocation = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata, "nextstep");
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
        {/* <TopShadowView topMar={-85} /> */}
        <CardLayout style={{ top: 0 }}>
          <View style={styles.rootContainer}>
            <View style={styles.mainContainer}>
              <HorizontalCount text={2} />
              <Spacer spacing={10} />

              <View style={{ alignSelf: "flex-start" }}>
                <TextBold style={{ fontSize: 32, lineHeight: 40 }}>
                  {regdata?.userType === "PICKUP_POINT"
                    ? "Collection Point\n"
                    : regdata?.userType === "RECYCLER"
                    ? "Business\n"
                    : ""}
                  {`Address`}
                </TextBold>
                <Spacer spacing={3} />
              </View>
              <PickupFormContainer regdata={regdata} />
              <Button
                onPress={() => navigation.goBack()}
                title={"Back"}
                style={{
                  width: "100%",
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1,
                  marginTop: MEDIUM_PADDING_SIZE,
                }}
                textStyle={{ color: colors.primary, lineHeight: 18 }}
              />
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
  },
});
