import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";
import { colors } from "@src/globals/colors";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const LogoutSVGIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 25}
    viewBox="0 0 64 64"
    {...props}
  >
    {/* <Path
      fill={props.color ?? colors.primary}
      d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z"
    /> */}
    {/* <Path
      fill="none"
      stroke={props.color ?? colors.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M7.5 29V11.5c0-2.2 1.8-4 4-4h18c2.2 0 4 1.8 4 4M33.5 36.5c0 2.2-1.8 4-4 4h-18c-2.2 0-4-1.8-4-4v-1.9M15.5 24h23M33.5 31l7-7-7-7"
    /> */}
    <Path
      fill={props.color ?? colors.primary}
      d="M22 9c-3.31 0-6 2.69-6 6v34c0 3.31 2.69 6 6 6h20c3.31 0 6-2.69 6-6v-6.98c-.368.368-1.635 1.962-4 1.98v5c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2V15c0-1.1.9-2 2-2h20c1.1 0 2 .9 2 2v5c2.371.018 3.643 1.623 4 1.98V15c0-3.31-2.69-6-6-6H22zm21.941 13.998a2.002 2.002 0 0 0-1.4 3.422L46.146 30H30.95a2 2 0 0 0 0 4h15.197l-3.605 3.58a2 2 0 0 0 2.818 2.84l7.05-7a2.002 2.002 0 0 0 0-2.84l-7.05-7a1.997 1.997 0 0 0-1.418-.582z"
    />
  </Svg>
);

export default LogoutSVGIcon;
