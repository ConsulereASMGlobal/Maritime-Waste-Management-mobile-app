import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface QrCodeIconSvgProps {
  size?: number;
  color?: string;
}

const QrCodeIcon = (props: QrCodeIconSvgProps & SvgProps) => (
  <Svg
    width={props.size ?? 28}
    height={props.size ?? 28}
    fill="none"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.75 15A2.25 2.25 0 0 1 13 17.25v5.5A2.25 2.25 0 0 1 10.75 25h-5.5A2.25 2.25 0 0 1 3 22.75v-5.5A2.25 2.25 0 0 1 5.25 15h5.5Zm7.585 0v3.333h3.332v3.334h-3.332v3.332H15v-3.333h3.333v-3.333H15V15h3.334ZM25 21.666V25h-3.333v-3.333H25ZM10.75 16.5h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75Zm-1.25 2v3h-3v-3h3ZM25 15v3.333h-3.333V15H25ZM10.75 3A2.25 2.25 0 0 1 13 5.25v5.5A2.25 2.25 0 0 1 10.75 13h-5.5A2.25 2.25 0 0 1 3 10.75v-5.5A2.25 2.25 0 0 1 5.25 3h5.5Zm12 0A2.25 2.25 0 0 1 25 5.25v5.5A2.25 2.25 0 0 1 22.75 13h-5.5A2.25 2.25 0 0 1 15 10.75v-5.5A2.25 2.25 0 0 1 17.25 3h5.5Zm-12 1.5h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75Zm12 0h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75ZM9.5 6.5v3h-3v-3h3Zm12 0v3h-3v-3h3Z"
      fill={props.color ?? '#212121'}
    />
  </Svg>
);

export default QrCodeIcon;
