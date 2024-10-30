import {ColorValue} from 'react-native';

export enum colors {
  white = 'rgba(255, 255, 255, 1)',
  off_white = 'rgba(233, 251, 249, 1)',
  black = 'rgba(0, 0, 0, 1)',
  transparent_black = 'rgba(0, 0, 0, 0.5)',
  transparent_black_4 = 'rgba(0, 0, 0, 0.4)',
  transparent_black_7 = 'rgba(0, 0, 0, 0.7)',
  transparent = 'rgba(255, 255, 255, 0)',
  gray = 'rgba(128, 128, 128, 1)',
  darkGray = 'rgba(72, 72, 72, 1)',
  darkLightGray = 'rgba(150, 150, 150, 1)',
  lightGray = 'rgba(211, 211, 211, 1)',
  lighterGray = 'rgba(238, 238, 238, 1)',
  lightestGray = 'rgba(255, 255, 255, 1)',
  mediumGray = 'rgba(232, 229, 229, 1)',
  color_22534F = 'rgba(34, 83, 79, 1)',
  color_D5E4E3 = 'rgba(213, 228, 227, 1)',
  color_F4F8F7 = 'rgba(244, 248, 247, 1)',
  color_F3FAF9 = 'rgba(243, 250, 249, 1)',
}

export const setOpacity = (rgbaColor: ColorValue, opacity: number) => {
  const regex = /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([01](?:\.\d+)?)\)$/;
  const match = rgbaColor?.toString().match(regex);

  if (!match) {
    throw new Error('Invalid color format. Use rgba(r, g, b, a).');
  }

  const red = match[1];
  const green = match[2];
  const blue = match[3];

  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be a value between 0 and 1.');
  }

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};
