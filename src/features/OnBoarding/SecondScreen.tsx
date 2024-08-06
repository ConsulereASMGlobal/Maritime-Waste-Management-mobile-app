import { StyleSheet, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import MainWrapper from "./Components/MainWrapper";
import ImageBox from "./Components/ImageBox";
import StepIndicator from "./Components/StepIndicator";
import TitleView from "./Components/TitleView";
import TwoButtons from "./Components/TwoButtons";

export const SecondScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <ScrollContainerLayout>
      <MainWrapper>
        <ImageBox iconName="secondSvg" />
        <StepIndicator step="two" />
        <TitleView
          heading="Matitime Waste Management"
          subHeading={`To promote separation and collection at source and avoid post-consumer packaging materials leakage into the environment`}
        />
        <TwoButtons navigation={navigation} screen="third" />
      </MainWrapper>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({});
