import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const MapSVGIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 24}
    height={props?.size ?? 24}
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <Path
      fill={props?.color ?? "#000"}
      d="M10.75 2.125a1.875 1.875 0 0 0-1.704 2.659l1.704 3.341 1.704-3.341a1.875 1.875 0 0 0-1.704-2.659Zm0 3a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25zm.561 3.55.683 1.365-1.731.865-.58-2.902.097-.098.01-.01-.357-.703-.183.183L7 5.875l-2.25 1.5-1.5-1.5-2.25 4.5 3 1.5 3-1.5 3 1.5 3-1.5-1.266-2.53-.423.83zm-7.575 2.23-1.73-.865 1.45-2.9.764.765.097.098-.58 2.902zm2.889-1.181-2.098 1.049.542-2.71L5.166 8l1.459-.973v2.698zm.75 0V7.026L8.834 8l.096.065.542 2.709-2.097-1.05Z"
    />
  </Svg>
);
export default MapSVGIcon;
