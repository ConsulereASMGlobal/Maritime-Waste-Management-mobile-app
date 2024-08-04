import { StyleSheet } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import TitleView from "./Components/TitleView";
import ImageBox from "./Components/ImageBox";
import StepIndicator from "./Components/StepIndicator";
import TwoButtons from "./Components/TwoButtons";
import MainWrapper from "./Components/MainWrapper";

export const FirstScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <ScrollContainerLayout>
      <MainWrapper>
        <ImageBox iconName="firstSvg" />
        <StepIndicator step="one" />
        <TitleView
          heading="Malaysian Recycling Alliance"
          subHeading="Industry-led Extended Producer Responsibility platform for post-consumer packaging recycling."
        />
        <TwoButtons navigation={navigation} screen="second" />
      </MainWrapper>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({});
