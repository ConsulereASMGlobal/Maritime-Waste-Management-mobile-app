import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import type { ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ChangePasswordSVGIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    viewBox="0 0 512 512"
    {...props}>
    <Path
      fill={props.color ?? colors.primary}
      d="M464.433 147.54a9.899 9.899 0 0 0-17.56 9.14 214.264 214.264 0 0 1-38.769 251.42c-83.856 83.848-220.315 83.875-304.207-.008a9.896 9.896 0 0 0-16.893 7.005v56.9a9.896 9.896 0 0 0 19.793 0v-34.55A234.95 234.95 0 0 0 464.433 147.54ZM103.897 103.902c83.882-83.874 220.341-83.865 304.207-.009a9.89 9.89 0 0 0 16.892-6.996v-56.9a9.896 9.896 0 0 0-19.793 0v34.55C313.023-1.356 176.055 3.751 89.904 89.901a233.956 233.956 0 0 0-42.337 274.553 9.899 9.899 0 0 0 17.56-9.14 214.249 214.249 0 0 1 38.77-251.412Z"
    />
    <Path
      fill={props.color ?? colors.primary}
      d="M126.4 254.555v109.44a27.08 27.08 0 0 0 27 27h205.2a27.077 27.077 0 0 0 27-27v-109.44a27.078 27.078 0 0 0-27-27H153.4a27.08 27.08 0 0 0-27 27ZM328 288.13a21.146 21.146 0 1 1-21.146 21.146A21.167 21.167 0 0 1 328 288.13Zm-72 0a21.146 21.146 0 1 1-21.146 21.146A21.167 21.167 0 0 1 256 288.13Zm-72 0a21.146 21.146 0 1 1-21.146 21.146A21.167 21.167 0 0 1 184 288.13ZM343.653 207.756v-36.002a87.653 87.653 0 0 0-175.306 0v36.002h19.793v-36.002a67.86 67.86 0 0 1 135.72 0v36.002Z"
    />
  </Svg>
);

export default ChangePasswordSVGIcon;
