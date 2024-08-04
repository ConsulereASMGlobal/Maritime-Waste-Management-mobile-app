import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../../globals/colors";
import { DynamicIcon } from "../../utils/Dynamic/DynamicIcon";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/TextField/TextField";
import { Fonts, REGULAR_PADDING_SIZE } from "../../globals/themes";
import { Spacer } from "../../components/common/Spacer";
import GreenWorldImageSVG from "../../assets/onBoardingImages/GreenWorldImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onBoradActions } from "../../redux/actions/combineAction";
import RippleButton from "../../components/Button/RippleButton";
import { useAppDispatch } from "../../redux/store";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import MainWrapper from "./Components/MainWrapper";
import ImageBox from "./Components/ImageBox";
import StepIndicator from "./Components/StepIndicator";
import TitleView from "./Components/TitleView";
import TwoButtons from "./Components/TwoButtons";

export const ThirdScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  // onPress={async () => {
  //   await AsyncStorage.setItem("onboard", "Completed");
  //   dispatch(onBoradActions.onboard({ onboard: "Completed" }));
  // }}
  return (
    <ScrollContainerLayout>
      <MainWrapper>
        <ImageBox iconName="thirdSvg" />
        <StepIndicator step="three" />
        <TitleView
          heading="Malaysian Recycling Alliance"
          subHeading="By 2025, we aim to reach a minimum recycling rate of 25% of members’ packaging volumes."
        />
        <TwoButtons
          navigation={navigation}
          screen="finished"
          firstBtnTitle="Login to your account"
          secondBtnTitle="Sign up"
        />
      </MainWrapper>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({});
