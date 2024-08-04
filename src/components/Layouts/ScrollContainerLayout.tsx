import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { colors } from "../../globals/colors";
import GradientBackground from "../GradientBackground";

interface Props {
  style?: any;
  contentStyle?: any;
  children: React.ReactNode;
  refresh?: any;
  topBgColor?: any;
  btmBgColor?: any;
  scrollBgColor?: any;
}

export const ScrollContainerLayout = ({
  children,
  refresh,
  style,
  contentStyle,
  topBgColor = colors.backgroundColor,
  btmBgColor = colors.backgroundColor,
  scrollBgColor = colors.backgroundColor,
}: Props) => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle={"light-content"} />
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: topBgColor }} /> */}
      <GradientBackground>
        <SafeAreaView style={{ flex: 0 }} />
      </GradientBackground>
      <SafeAreaView style={{ flex: 1, backgroundColor: btmBgColor }}>
        <ScrollView
          style={[styles.container, { backgroundColor: scrollBgColor }, style]}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={contentStyle}
          refreshControl={refresh}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
