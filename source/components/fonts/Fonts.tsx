/* eslint-disable react/react-in-jsx-scope */
import {FC, ReactNode} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';

type FontProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  config?: TextProps;
};

export const Font400: FC<FontProps> = ({children, style, config}) => (
  <Text
    style={[{fontFamily: fontFamily.Font400}, styles.text, style]}
    {...config}>
    {children}
  </Text>
);

export const Font500: FC<FontProps> = ({children, style, config}) => (
  <Text
    style={[{fontFamily: fontFamily.Font500}, styles.text, style]}
    {...config}>
    {children}
  </Text>
);

export const Font600: FC<FontProps> = ({children, style, config}) => (
  <Text
    style={[{fontFamily: fontFamily.Font600}, styles.text, style]}
    {...config}>
    {children}
  </Text>
);

export const Font700: FC<FontProps> = ({children, style, config}) => (
  <Text
    style={[{fontFamily: fontFamily.Font700}, styles.text, style]}
    {...config}>
    {children}
  </Text>
);

export const Font800: FC<FontProps> = ({children, style, config}) => (
  <Text
    style={[{fontFamily: fontFamily.Font800}, styles.text, style]}
    {...config}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.black,
    includeFontPadding: false,
  },
});
