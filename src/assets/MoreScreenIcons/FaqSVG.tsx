import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";
import { colors } from "@src/globals/colors";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const FaqSVGIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    // fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    // fillRule="evenodd"
    // clipRule="evenodd"
    // imageRendering="optimizeQuality"
    // shapeRendering="geometricPrecision"
    // textRendering="geometricPrecision"
    viewBox="0 0 48 48"
    // viewBox="0 0 512 425.75"
    {...props}
  >
    {/* <Path
      fillRule="nonzero"
      fill={props.color ?? colors.primary}
      d="m105.77 362.14 60.82-58.31c2.08 10.53 5.05 20.9 8.9 31.01l-73.32 70.31a14.327 14.327 0 0 1-10.72 4.81c-7.91 0-14.32-6.41-14.32-14.32v-69.23H34.74c-9.01 0-17.24-3.54-23.42-9.22l-1.1-.99C3.93 309.9 0 301.17 0 291.67V34.74c0-9.49 3.98-18.21 10.25-24.49C16.53 3.98 25.25 0 34.74 0h325.58c9.48 0 18.22 3.94 24.51 10.24 6.25 6.25 10.21 14.95 10.21 24.5v46.68c-9.44-2.12-19.02-3.54-28.64-4.2V34.74c0-1.64-.71-3.16-1.81-4.26-1.11-1.12-2.66-1.84-4.27-1.84H34.74c-1.6 0-3.13.74-4.25 1.85-1.11 1.12-1.85 2.65-1.85 4.25v256.93c0 1.62.71 3.17 1.82 4.29l.4.4c1.05.86 2.42 1.4 3.88 1.4h56.71c7.91 0 14.32 6.42 14.32 14.32v50.06zm296.32-56.12c4.82 3.35 7.98 5.48 9.47 6.34 2.18 1.25 5.19 2.71 8.94 4.38l-10.73 21.7c-5.39-2.62-10.77-5.73-16.07-9.35-5.32-3.62-9.02-6.34-11.13-8.15-8.55 3.72-19.29 5.59-32.19 5.59-19.08 0-34.14-4.97-45.15-14.91-13.02-11.75-19.54-28.25-19.54-49.53 0-20.66 5.69-36.7 17.09-48.14 11.4-11.43 27.28-17.15 47.73-17.15 20.84 0 36.91 5.57 48.25 16.76 11.34 11.17 17 27.18 17 47.97 0 18.54-4.55 33.34-13.67 44.49zm-29.71-19.91c3.1-5.51 4.64-13.79 4.64-24.8 0-12.65-2.37-21.69-7.07-27.12-4.74-5.41-11.21-8.12-19.51-8.12-7.76 0-14.01 2.77-18.8 8.3-4.81 5.53-7.21 14.17-7.21 25.91 0 13.71 2.34 23.31 7 28.84 4.72 5.53 11.15 8.3 19.29 8.3 2.64 0 5.12-.26 7.46-.75-3.27-3.17-8.42-6.12-15.47-8.92l6.09-13.94c3.45.61 6.13 1.4 8.04 2.32 1.93.9 5.66 3.29 11.25 7.18 1.31.9 2.74 1.84 4.29 2.8zm93.06-131.61C496.47 185.65 512 226.28 512 266.86c0 39.95-15.06 79.96-45.12 110.8l-1.41 1.54c-31.14 31.02-71.78 46.55-112.37 46.55-40.67 0-81.34-15.53-112.35-46.54-31.02-31.14-46.54-71.76-46.54-112.35 0-40.65 15.52-81.33 46.53-112.33 31.15-31.04 71.78-46.56 112.36-46.56 39.95 0 79.96 15.06 110.8 45.11l1.54 1.42zm-17.68 17.71c-52.28-52.28-137.05-52.28-189.31 0-52.29 52.27-52.29 137.03 0 189.31 52.26 52.27 137.03 52.27 189.31 0 52.28-52.28 52.28-137.04 0-189.31zM98.27 128.75c-7.91 0-14.32-6.42-14.32-14.32 0-7.91 6.41-14.32 14.32-14.32h163.44a190.334 190.334 0 0 0-39.27 28.64H98.27zm0 84.73c-7.91 0-14.32-6.41-14.32-14.32 0-7.9 6.41-14.32 14.32-14.32h83.27c-4.44 9.31-8.1 18.87-10.94 28.64H98.27z"
    /> */}
    {/* <Path
      fill={props.color ?? colors.primary}
      d="M22 0c-2.21 0-4 1.79-4 4v16c0 2.21 1.79 4 4 4h15.625l7.719 6.75c.297.258.71.316 1.07.156A.996.996 0 0 0 47 30v-6.188c1.715-.449 3-1.957 3-3.812V4c0-2.21-1.79-4-4-4Zm0 2h24c1.191 0 2 .809 2 2v16c0 1.191-.809 2-2 2-.55 0-1 .45-1 1v4.813l-6.344-5.563A.988.988 0 0 0 38 22H22c-1.191 0-2-.809-2-2V4c0-1.191.809-2 2-2Zm11 4.094-2.5 11.5h1.813l.593-3h2.188l.593 3H37.5l-2.406-11.5ZM34 8h.094c.101.8.207 1.895.406 2.594l.5 2.594h-1.906l.5-2.594c.101-.7.304-1.793.406-2.594ZM4 19c-2.21 0-4 1.79-4 4v16c0 1.855 1.285 3.363 3 3.813V49c0 .39.23.746.586.906.36.16.773.102 1.07-.156L12.375 43H28c2.21 0 4-1.79 4-4V25h-2v14c0 1.191-.809 2-2 2H12a.988.988 0 0 0-.656.25L5 46.813V42c0-.55-.45-1-1-1-1.191 0-2-.809-2-2V23c0-1.191.809-2 2-2h13v-2Zm11.594 6C13.293 25 12 27.414 12 30.813c0 3.898 1.305 5.875 3.406 5.875.102 0 .301.117.5.218.7.399 1.883 1.008 2.781 1.407l.625-1.407c-.699-.199-1.519-.511-2.218-.812V36c1.101-.602 1.812-2.313 1.812-5.313 0-3.101-.914-5.687-3.312-5.687Zm-.094 1.5c1.102 0 1.5 1.988 1.5 4.188 0 2.398-.398 4.406-1.5 4.406-1.2 0-1.594-2.008-1.594-4.407 0-2.101.395-4.187 1.594-4.187Z"
    /> */}
    <Path
      fill="none"
      stroke={props.color ?? colors.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M20.3 36.4c-1.1-1.9-1.8-4.1-1.8-6.4 0-6.9 5.6-12.5 12.5-12.5 4.3 0 8.1 2.2 10.4 5.5M43.5 30c0 2.2-.6 4.3-1.6 6.1l1.6 5.6c.1.5-.3 1-.8.8l-5.6-1.6c-1.8 1-3.9 1.6-6.1 1.6-1.4 0-2.7-.2-4-.7M27 10.5c-2.3-3-5.9-5-10-5-6.9 0-12.5 5.6-12.5 12.5 0 2.2.6 4.3 1.6 6.1l-1.6 5.6c-.1.5.3 1 .8.8l5.6-1.6c.9.5 1.9.9 2.9 1.2M12.5 23.5l4.5-11"
    />
    <Path
      fill="none"
      stroke={props.color ?? colors.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M14 20.5h6.3l-3.3-8M31 34.5h0c-1.9 0-3.5-1.6-3.5-3.5v-3c0-1.9 1.6-3.5 3.5-3.5h0c1.9 0 3.5 1.6 3.5 3.5v3c0 1.9-1.6 3.5-3.5 3.5zM31 34.5s1.5 2.5 4 2.5"
    />
  </Svg>
);

export default FaqSVGIcon;
