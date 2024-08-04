import React from 'react';
import { View } from 'react-native';
import { colors } from '../globals/colors';

export const HorizontalLine = ({ color }) => (
  <View
    style={{
      borderBottomWidth: 1,
      borderColor: color || colors.gray,
      width: '100%'
    }}
  />
);
