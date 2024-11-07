import {ColorValue} from 'react-native';

export enum colors {
  error = '#B82222',
  white = '#FFFFFF',
  transparent_white_8 = 'rgba(255, 255, 255, 0.8)',
  transparent_white_6 = 'rgba(255, 255, 255, 0.6)',
  off_white = '#E9FBf9',
  black = '#000000',
  transparent_black = 'rgba(0, 0, 0, 0.5)',
  transparent_black_4 = 'rgba(0, 0, 0, 0.4)',
  transparent_black_2 = 'rgba(0, 0, 0, 0.2)',
  transparent_black_7 = 'rgba(0, 0, 0, 0.7)',
  transparent = 'rgba(255, 255, 255, 0)',
  gray = '#808080',
  darkGray = '#484848',
  darkLightGray = '#969696',
  lightGray = '#D3D3D3',
  lighterGray = '#EEEEEE',
  mediumGray = '#E8E5E5',
  color_22534F = '#22534F',
  color_D5E4E3 = '#D5E4E3',
  color_F4F8F7 = '#F4F8F7',
  color_F3FAF9 = '#F3FAF9',
  color_777777 = '#777777',
  color_0B2624 = '#0B2624',
  color_0B2624_5 = 'rgba(11, 38, 36, 5)',
  color_EBECEC = '#EBECEC',
  color_E8DBDF = '#E8DBDF',
  color_42958F = '#42958F',
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
