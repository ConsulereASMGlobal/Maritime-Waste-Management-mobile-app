import { colors } from "@src/globals/colors";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

const GradientBackground = ({
  children,
  style = {},
}: {
  children?: any;
  style?: any;
}) => {
  if (!children)
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.primary, colors.primaryLight2]}
        style={style}
      />
    );

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.primary, colors.primaryLight2]}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
