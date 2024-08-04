import { colors } from "@src/globals/colors";
import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ApproveSignupSVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 40}
    height={props?.size ?? 40}
    viewBox="0 0 50 50"
    fill={props.color ?? colors.primary}
    {...props}
  >
    <Path d="M25 2C12.304 2 2 12.36 2 24a1 1 0 0 0 .545.893L17 33.93V48h16V33.93l14.516-9.073A1 1 0 0 0 48 24C48 12.36 37.696 2 25 2zm-2.78 2.207c-3.43 3.874-5.644 10.249-6.116 17.066C14.567 19.87 12.416 19 10 19c-2.19 0-4.143.743-5.658 1.908C5.823 12.574 13.067 5.435 22.22 4.207zm5.56 0c9.153 1.228 16.397 8.367 17.878 16.701A9.248 9.248 0 0 0 40 19c-2.416 0-4.567.87-6.104 2.273-.472-6.817-2.686-13.192-6.117-17.066zM25 4.283c3.512 2.983 6.308 9.699 6.883 16.988C30.148 19.856 27.723 19 25 19c-2.724 0-5.148.856-6.883 2.271.575-7.29 3.371-14.005 6.883-16.988zM10 21c2.89 0 5.257 1.516 6.084 3.402a1 1 0 0 0 .098.174L21.234 33h-1.947L4.342 23.66C5.402 22.135 7.502 21 10 21zm15 0c3.124 0 5.707 1.349 6.828 3.012L26.434 33h-2.868l-5.394-8.988C19.293 22.349 21.876 21 25 21zm15 0c2.498 0 4.598 1.135 5.658 2.66L30.713 33h-1.947l5.072-8.453a1 1 0 0 0 .078-.145C34.743 22.516 37.109 21 40 21zM19 35h12v11H19V35zm4 2a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z" />
  </Svg>
);
export default ApproveSignupSVG;
