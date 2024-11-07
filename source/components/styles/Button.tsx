import React, {FC, memo, ReactNode} from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {colors} from '../../constants/colors';
import {Font600} from '../fonts/Fonts';

export type ButtonProps = {
  loader?: boolean;
  onPress?: () => void;
  buttonContainerStyle?: ViewStyle | ViewStyle[];
  buttonTextStyle?: TextStyle;
  children: ReactNode;
  iconStyle?: ImageStyle;
  icon?: ImageRequireSource;
};

const Button: FC<ButtonProps> = ({
  loader,
  onPress,
  buttonContainerStyle,
  buttonTextStyle = {},
  children,
  iconStyle,
  icon,
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
      <Image source={icon} resizeMode="contain" style={iconStyle} />
      <Font600 style={[styles.buttonText, buttonTextStyle]}>
        {loader ? 'Processing...' : children}
      </Font600>
    </Pressable>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.color_22534F,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});
