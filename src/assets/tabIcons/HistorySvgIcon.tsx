import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const HistorySvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <Path
      fill={props.color ?? "#000"}
      d="M6 2v46h38V2H6zm2 2h34v42H8V4zm5 7v2h24v-2H13zm0 14v2h14v-2H13zm19 0v2h5v-2h-5zm-19 6v2h14v-2H13zm19 0v2h5v-2h-5zm-19 6v2h14v-2H13zm19 0v2h5v-2h-5z"
    />
  </Svg>
);

export default HistorySvgIcon;
