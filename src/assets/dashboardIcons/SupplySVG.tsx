import { colors } from "@src/globals/colors";
import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const SupplySVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 40}
    height={props?.size ?? 40}
    viewBox="0 0 64 64"
    fill={props.color ?? colors.primary}
    {...props}
  >
    <Path d="M17 8a3 3 0 0 0-3 3v27H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a3 3 0 0 0 2.816-2h25.872a8.937 8.937 0 0 0 6.363-2.637l6.484-6.484A4.969 4.969 0 0 0 62 41.344V41a5.006 5.006 0 0 0-5-5h-.172a2.978 2.978 0 0 0-2.121.879l-3.414 3.414a1 1 0 0 0 1.414 1.414l3.414-3.414a1 1 0 0 1 .707-.293H57a3 3 0 0 1 3 3v.344a2.984 2.984 0 0 1-.879 2.12l-6.484 6.485A6.956 6.956 0 0 1 47.687 52H22V42h4.537a1 1 0 0 0 .744-.332 4.99 4.99 0 0 1 7.446 0 1 1 0 0 0 .746.334H46a2 2 0 0 1 0 4H33a1 1 0 0 0 0 2h13a4 4 0 0 0 0-8H35.9a6.987 6.987 0 0 0-9.787 0h-4.3A3 3 0 0 0 19 38h-3V11a1 1 0 0 1 1-1h10v11a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V10h10a1 1 0 0 1 1 1v26a1 1 0 0 0 2 0V11a3 3 0 0 0-3-3H17zm12 2h6v11a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V10zm8 22a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-8zm1 2h6v2h-6v-2zM4 40h12v3a1 1 0 0 0 2 0v-3h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-1v-7a1 1 0 0 0-2 0v7H4V40z" />
  </Svg>
);
export default SupplySVG;
