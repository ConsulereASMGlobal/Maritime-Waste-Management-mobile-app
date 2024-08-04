import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { Path, Ellipse, Mask, G, SvgProps } from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ToBeConfirmedSVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 50}
    height={props?.size ?? 50}
    fill={"#fff"}
    viewBox="0 0 50 50"
    {...props}
  >
    <Path d="M15.264 2.078A24.722 24.722 0 0 0 2.078 15.264l1.844.773A22.749 22.749 0 0 1 16.037 3.922l-.773-1.844zM25 4C13.414 4 4 13.414 4 25s9.414 21 21 21 21-9.414 21-21S36.586 4 25 4zm0 2c10.505 0 19 8.495 19 19s-8.495 19-19 19S6 35.505 6 25 14.495 6 25 6zm-1 4v13.271A2 2 0 0 0 23 25a2 2 0 0 0 2 2 2 2 0 0 0 .518-.068l5.775 5.775 1.414-1.414-5.777-5.777A2 2 0 0 0 27 25a2 2 0 0 0-1-1.73V10h-2zm22.084 23.951c-2.377 5.458-6.687 9.848-12.121 12.127l.773 1.844c5.932-2.487 10.607-7.263 13.18-13.172l-1.832-.799z" />
  </Svg>
);
export default ToBeConfirmedSVG;
