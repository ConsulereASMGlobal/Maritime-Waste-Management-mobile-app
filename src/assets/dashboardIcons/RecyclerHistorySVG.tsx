import { colors } from "@src/globals/colors";
import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const RecyclerHistorySVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 50}
    height={props?.size ?? 50}
    viewBox="0 0 64 64"
    fill={props.color ?? colors.primary}
    {...props}
  >
    <Path
      fill={props.color ?? colors.primary}
      d="M32 9a1 1 0 0 0-1 1v15H12a1 1 0 0 0-1 1v19H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3h19v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3h19v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6V26a1 1 0 0 0-1-1h-3V10a1 1 0 0 0-1-1H32zm1 2h4v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3h4v14H33V11zm6 0h2v2h-2v-2zm2.959 10A1 1 0 0 0 42 23h2a1 1 0 0 0 0-2h-2a1 1 0 0 0-.041 0zM13 27h6v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h6v18H13V27zm8 0h2v4h-2v-4zm12 0h6v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h6v18H33V27zm8 0h2v4h-2v-4zM25.959 41A1 1 0 0 0 26 43h2a1 1 0 0 0 0-2h-2a1 1 0 0 0-.041 0zm20 0A1 1 0 0 0 46 43h2a1 1 0 0 0 0-2h-2a1 1 0 0 0-.041 0zM6 47h52v6h-2v-3a1 1 0 0 0-1-1H34a1 1 0 0 0-1 1v3h-2v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3H6v-6z"
    />
  </Svg>
);
export default RecyclerHistorySVG;
