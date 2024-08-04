import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";
import { colors } from "@src/globals/colors";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ProfileSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    {/* <Path
      d="M12.75 2A10 10 0 0 0 5.4 18.76a10.001 10.001 0 0 0 14.7 0A10 10 0 0 0 12.75 2Zm0 18a8 8 0 0 1-5.55-2.25 6 6 0 0 1 11.1 0A8 8 0 0 1 12.75 20Zm-2-10a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm8.91 6a8 8 0 0 0-3.91-3.38 4 4 0 1 0-6 0A8 8 0 0 0 5.84 16a7.92 7.92 0 0 1-1.09-4 8 8 0 1 1 16 0 7.92 7.92 0 0 1-1.09 4Z"
      fill={props.color ?? colors.primary}
      /> */}

    <Path
      fill={props.color ?? colors.primary}
      d="M12 3C9.803 3 8 4.803 8 7s1.803 4 4 4 4-1.803 4-4-1.803-4-4-4zm0 2c1.116 0 2 .884 2 2s-.884 2-2 2-2-.884-2-2 .884-2 2-2zm0 9c-1.745 0-3.813.41-5.55 1.096-.87.343-1.655.75-2.284 1.273C3.537 16.892 3 17.6 3 18.5V21h18v-2.5c0-.9-.537-1.608-1.166-2.13-.629-.524-1.414-.931-2.283-1.274C15.813 14.41 13.745 14 12 14zm0 2c1.414 0 3.346.374 4.818.955.737.29 1.359.637 1.737.951.377.315.445.529.445.594v.5H5v-.5c0-.065.068-.28.445-.594.378-.314 1-.66 1.737-.95C8.654 16.373 10.586 16 12 16z"
    />
  </Svg>
);

export default ProfileSvgIcon;
