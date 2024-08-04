import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const StreakSVG = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#DBDBE1"
      d="M8.707 22.44a.75.75 0 0 1-.45-.803l1.365-8.887H6a.75.75 0 0 1-.75-.922l2.25-9.75a.75.75 0 0 1 .75-.578h7.5a.75.75 0 0 1 .735.915L15.187 8.25h3.563a.75.75 0 0 1 .675.42.75.75 0 0 1-.083.75l-9.75 12.75A.75.75 0 0 1 9 22.5a.825.825 0 0 1-.293-.06Z"
    />
  </Svg>
);
export default StreakSVG;
