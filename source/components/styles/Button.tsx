import React, {FC, ReactNode} from 'react';
import {Pressable, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Font600} from '../fonts/Fonts';
import {colors} from '../../constants/colors';

export type ButtonProps = {
  loader?: boolean;
  onPress?: () => void;
  buttonContainerStyle?: ViewStyle | ViewStyle[];
  buttonTextStyle?: TextStyle;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({
  loader,
  onPress,
  buttonContainerStyle,
  buttonTextStyle = {},
  children,
}) => {
  return (
    <Pressable
      disabled={loader}
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonContainer,
        buttonContainerStyle,
        {opacity: pressed || loader ? 0.8 : 1},
      ]}>
      <Font600 style={[styles.buttonText, buttonTextStyle]}>
        {loader ? 'Processing...' : children}
      </Font600>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color_22534F,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});
