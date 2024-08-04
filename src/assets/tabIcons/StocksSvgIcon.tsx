import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const StocksSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <Path
      fill={props.color ?? "#000"}
      d="M25.021 3a1 1 0 0 0-.337.05l-21 7A1 1 0 0 0 3 11v35a1 1 0 0 0 1 1h5.832a1 1 0 0 0 .326 0h29.674a1 1 0 0 0 .326 0H46a1 1 0 0 0 1-1V11a1 1 0 0 0-.684-.95l-21-7a1 1 0 0 0-.295-.05zM25 5.055l20 6.666V45h-4V17a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v28H5V11.72l20-6.665zM11 18h28v27h-3v-9a1 1 0 0 0-1-1h-4v-9a1 1 0 0 0-1-1H20a1 1 0 0 0-1 1v9h-4a1 1 0 0 0-1 1v9h-3V18zm10 9h8v8h-8v-8zm-5 10h8v8h-8v-8zm10 0h8v8h-8v-8z"
    />
  </Svg>
);

export default StocksSvgIcon;
