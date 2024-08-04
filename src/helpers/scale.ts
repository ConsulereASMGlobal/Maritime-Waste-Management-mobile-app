import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size: number) =>
  (width / guidelineBaseWidth) * size; //for width
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size; //for height
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor; //for fonts
