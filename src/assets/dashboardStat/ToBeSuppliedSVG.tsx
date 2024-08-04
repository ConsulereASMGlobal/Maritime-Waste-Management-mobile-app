import * as React from "react";
import { ColorValue } from "react-native";
import Svg, {
  Path,
  Ellipse,
  Mask,
  G,
  SvgProps,
  Circle,
} from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ToBeSuppliedSVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 50}
    height={props?.size ?? 50}
    fill={"#fff"}
    viewBox="0 0 50 50"
    {...props}
  >
    <Path
      d="m18.891 15.666 8.47-8.471 8.473 8.471"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
    <Path
      d="m31.359 11.198 4.002-4.003 8.473 8.471"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
    <Circle
      cx={26}
      cy={46}
      r={3}
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <Circle cx={2} cy={4} r={2} />
    <Path
      d="M31 43h-5.291c-3.42 0-3.922-1.744-4.523-4.025L13.191 6.696C12.472 4.273 11.459 3 8.664 3H2M32 35H20.609"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 1.9868,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
    <Path
      d="M16 16h31l-5.677 15"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 1.9868,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
    <Path
      fill={"#fff"}
      d="M40 50c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0-18c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 8.5V34h-2v5.5l-3.6 2.7 1.2 1.6 4.4-3.3z"
    />
  </Svg>
);
export default ToBeSuppliedSVG;
