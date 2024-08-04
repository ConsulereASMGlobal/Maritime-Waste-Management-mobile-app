import * as React from "react";
import Svg, { SvgProps, G, Circle, Path } from "react-native-svg";
import type { ColorValue } from "react-native";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const StepTwoSVGIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <Path
      fill={props.color ?? "#000"}
      d="M20 0a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9v10H17a3 3 0 0 0-3 3v20a2.966 2.966 0 0 0 .184 1H11a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h3a1 1 0 0 0 0-2H11a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h42a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H27a1 1 0 0 0 0 2h17v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-3.184A2.966 2.966 0 0 0 50 51V31a3 3 0 0 0-3-3H35V18h9a3 3 0 0 0 3-3V9a1 1 0 0 0-2 0v6a1 1 0 0 1-1 1H20a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h24a1 1 0 0 1 1 1v2a1 1 0 0 0 2 0V3a3 3 0 0 0-3-3H20zm2 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-8zm12 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zM23 6h6v6h-6V6zm11 2a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm-8 4a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm-11 6h2v10h-2V18zM17 30h10v7a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-7h10a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1V31a1 1 0 0 1 1-1zm12 0h6v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-7zm8 14a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-8zm1 2h6v2h-6v-2zM14 60h4v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1zm32 0h4v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1z"
    />
  </Svg>
);

export default StepTwoSVGIcon;
