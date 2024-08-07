import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { Path, Ellipse, Mask, G, SvgProps } from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ProcessedSVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 68}
    height={props?.size ?? 68}
    fill={"#fff"}
    viewBox="0 0 68 68"
    {...props}
  >
    <Path d="M40.5 2.5C39.1 2.5 38 3.6 38 5v.3c-5.4 1.6-9.4 6.6-9.4 12.5h-1.1c-.5 0-1 .5-1 1 0 .6.5 1 1 1h1.2c-.2.5-.3 1-.3 1.6 0 1.7 1.1 3.2 2.6 3.7.1 3.4 1.8 6.4 4.3 8.3V37l-1.4 1.9-3.9.6-1.2.3v-.9c0-2.1-1.7-3.7-3.7-3.7H12.3a3.693 3.693 0 0 0-3.7 3.7v11.6c0 .6.2 1.2.4 1.7h-.3a6.7 6.7 0 0 0 0 13.4h50.7c3.7 0 6.6-3 6.6-6.7 0-3.3-2.2-5.9-5.2-6.6v-3.8c0-3.6-2.2-6.9-5.5-8.4-1.6-.7-2.6-.7-5.8-1.3L48.1 37v-3.6c2.5-1.9 4.2-4.9 4.3-8.3 1.5-.6 2.5-2 2.5-3.7 0-.6-.1-1.1-.3-1.6h1.6c.6 0 1-.4 1-1 0-.5-.4-1-1-1H55c-.1-5.9-4-10.9-9.4-12.5V5c0-1.4-1.1-2.5-2.5-2.5h-2.6zm-.1 2H43c.3 0 .5.2.5.5v2.9c-.6-.3-1.2-.5-1.9-.5-.6 0-1.2.1-1.7.3V5c0-.3.2-.5.5-.5zm-2.5 2.9v2.1c-.5.7-.7 1.5-.7 2.4 0 2.4 2 4.4 4.4 4.4 2.4 0 4.4-2 4.4-4.4 0-.7-.2-1.4-.5-1.9V7.4c3.2 1.1 5.8 3.7 6.9 7 .4 1.1.6 2.2.6 3.3H30.5c0-.8.1-1.6.3-2.4.9-3.6 3.6-6.7 7.1-7.9zm-5.1 12.4h17.6v5c0 4.9-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8v-5zm4.2 1.6c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-.9-.7-1.6-1.6-1.6zm9.2 0c-.9 0-1.6.7-1.6 1.6-.1.9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-.9-.7-1.6-1.6-1.6zm-4.6 3.1c-.5 0-.9.4-.9.8v1.6c0 .4.4.8.9.8s.8-.4.8-.8v-1.6c0-.5-.4-.8-.8-.8zm-2.038 4.037A.908.908 0 0 0 39 28.9c-.3.4-.2.9.2 1.2.7.6 1.4.9 2.4.9.9 0 1.7-.4 2.4-.9.4-.3.5-.8.2-1.2-.3-.4-.8-.5-1.2-.2-1 .7-1.9.7-2.8 0a.812.812 0 0 0-.638-.163zM37.1 34.6c1.4.6 2.9 1 4.5 1s3.1-.3 4.5-1v2c-.1.1-4.8 2.4-4.5 2.3-.1-.1-4.8-2.4-4.5-2.3v-2zm-24.8 2.6h2.4v3.3c0 1 1.1 1.6 2 1.1l2-1.3 2 1.3c.9.6 2-.1 2-1.1v-3.3H25c1 0 1.7.8 1.7 1.7v11.6c0 1-.8 1.7-1.7 1.7H12.3c-.9 0-1.7-.8-1.7-1.8V38.9c0-1 .8-1.7 1.7-1.7zm21.1 3.7 7.2 4.3V52h-8.1V41l.9-.1zm16.4 0 .9.2V52h-8.1v-6.8l7.2-4.3zm6 1.7c1.9 1.3 3 3.5 3 5.9V52h-3v-9.4zm-43.3 5.7c-.2 0-.4.2-.4.4v.9c0 .2.2.4.4.4h4.6c.2 0 .4-.2.4-.4v-.9c0-.2-.2-.4-.4-.4h-4.6zm-3.8 5.8h50.7c2.6 0 4.6 2.1 4.6 4.7s-2.1 4.7-4.6 4.7H8.7c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7zm.4 2.1a2.6 2.6 0 0 0 0 5.2 2.6 2.6 0 0 0 0-5.2zm10 0c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6zm9.9 0c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6zm10 0c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6zm9.9 0c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6zm10 0c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6z" />
  </Svg>
);
export default ProcessedSVG;
