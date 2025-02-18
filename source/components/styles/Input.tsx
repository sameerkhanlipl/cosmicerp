// import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
// import {
//   Image,
//   ImageRequireSource,
//   ImageStyle,
//   Pressable,
//   StyleSheet,
//   TextInput,
//   TextInputProps,
//   TextStyle,
//   View,
//   ViewStyle,
// } from 'react-native';
// import {colors} from '../../constants/colors';
// import {fontFamily} from '../../constants/fontFamily';
// import {Font500} from '../fonts/Fonts';
// import { images } from '../../assets/images';
// // import KeyboardManager from 'react-native-keyboard-manager';

// // if (Platform.OS === 'ios') {
// //   KeyboardManager.setEnable(true);
// //   KeyboardManager.setKeyboardDistanceFromTextField(10);
// //   KeyboardManager.setEnableAutoToolbar(false);
// // }

// export type InputRef = {
//   set: (value: string) => void;
//   get: () => string;
// };

// type InputProps = {
//   label?: string;
//   labelStyle?: TextStyle;
//   inputStyle?: TextStyle;
//   default_value?: string;
//   onReturn?: () => void;
//   config?: TextInputProps;
//   leftIconStyle?: ImageStyle;
//   secureTextEntry?: boolean;
//   leftIconPress?: () => void;
//   rightIconPress?: () => void;
//   rightIconStyle?: ImageStyle;
//   leftIcon?: ImageRequireSource;
//   rightIcon?: ImageRequireSource;
//   inputContainerStyle?: ViewStyle;
//   rootStyle?: ViewStyle | ViewStyle[];
//   keyboardType?:string;
// };

// const Input = forwardRef<InputRef, InputProps>(
//   (
//     {
//       label,
//       config,
//       leftIcon,
//       rightIcon,
//       rootStyle,
//       labelStyle = {},
//       inputStyle,
//       default_value,
//       leftIconStyle = {},
//       leftIconPress,
//       rightIconPress,
//       rightIconStyle,
//       inputContainerStyle,
//       onReturn = () => {},
//       keyboardType,
//     },
//     ref,
//   ) => {
//     const [input, setInput] = useState<string>(
//       default_value && default_value?.length !== 0 ? default_value : '',
//     );

//     useImperativeHandle(
//       ref,
//       () => {
//         return {
//           set: (value: string) => {
//             setInput(value);
//           },
//           get: (): string => input,
//         };
//       },
//       [input],
//     );

//     const onChangHandler = (value: string) => setInput(value);

//     return (
//       <View style={rootStyle}>
//         {label ? (
//           <Font500 style={[styles.label, labelStyle]}>{label}</Font500>
//         ) : null}
//         <View style={[styles.inputContainer, inputContainerStyle]}>
//           {leftIcon ? (
//             <Pressable onPress={leftIconPress}>
//               <Image
//                 source={leftIcon}
//                 style={[styles.icon, leftIconStyle]}
//                 resizeMode="contain"
//               />
//             </Pressable>
//           ) : null}

//           <TextInput
//             value={input}
//             autoComplete={'off'}
//             onSubmitEditing={onReturn}
//             onChangeText={onChangHandler}
//             style={[styles.input, inputStyle]}
//             cursorColor={colors.transparent_black_4}
//             selectionColor={colors.transparent_black_4}
//             placeholderTextColor={colors.transparent_black_2}
//             keyboardType={keyboardType}
//            {...config}
//           />

//           {rightIcon ? (
//             <Pressable onPress={rightIconPress}>
//               <Image
//                 source={images.search}
//                 style={[styles.icon, rightIconStyle]}
//                 resizeMode="contain"
//               />
//             </Pressable>
//           ) : null}
//         </View>
//       </View>
//     );
//   },
// );

// export default memo(Input);

// const styles = StyleSheet.create({
//   label: {
//     fontSize: 14,
//     paddingVertical: 4,
//   },
//   inputContainer: {
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 6,
//     backgroundColor: colors.white,
//     borderColor: colors.color_D5E4E3,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 13,
//     includeFontPadding: false,
//     fontFamily: fontFamily.Font500,
//     color: colors.transparent_black,
//   },
//   icon: {
//     width: 16,
//     height: 16,
//     marginHorizontal: 14,
//     tintColor:"#000000"
//   },
// });


import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamily } from '../../constants/fontFamily';
import { Font500 } from '../fonts/Fonts';
import { images } from '../../assets/images';

export type InputRef = {
  set: (value: string) => void;
  get: () => string;
};

type InputProps = {
  label?: string;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  default_value?: string;
  onReturn?: () => void;
  config?: TextInputProps;
  leftIconStyle?: ImageStyle;
  secureTextEntry?: boolean;
  leftIconPress?: () => void;
  rightIconPress?: () => void;
  onChangHandler?: () => void;
  rightIconStyle?: ImageStyle;
  leftIcon?: ImageRequireSource;
  rightIcon?: ImageRequireSource;
  inputContainerStyle?: ViewStyle;
  rootStyle?: ViewStyle | ViewStyle[];
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'url';
};

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      label,
      config,
      leftIcon,
      rightIcon,
      rootStyle,
      labelStyle = {},
      inputStyle,
      default_value,
      leftIconStyle = {},
      leftIconPress,
      rightIconPress,
      rightIconStyle,
      inputContainerStyle,
      onReturn = () => {},
      keyboardType,
      onChangHandler = (value:any) => {},
    },
    ref,
  ) => {
    const [input, setInput] = useState<string>(default_value || '');

    useImperativeHandle(
      ref,
      () => ({
        set: (value: string) => setInput(value),
        get: () => input,
      }),
      [input],
    );

    const handleInputChange = (value: string) => {
      setInput(value);
      onChangHandler(value);
    };

    return (
      <View style={rootStyle}>
        {label && <Font500 style={[styles.label, labelStyle]}>{label}</Font500>}
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {leftIcon && (
            <Pressable onPress={leftIconPress}>
              <Image
                source={leftIcon}
                style={[styles.icon, leftIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}
          <TextInput
            value={input}
            autoComplete="off"
            onSubmitEditing={onReturn}
            onChangeText={handleInputChange}
            style={[styles.input, inputStyle]}
            cursorColor={colors.transparent_black_4}
            selectionColor={colors.transparent_black_4}
            placeholderTextColor={colors.transparent_black_2}
            keyboardType={keyboardType}
            {...config}
          />
          {rightIcon && (
            <Pressable onPress={rightIconPress}>
              <Image
                source={rightIcon}
                style={[styles.icon, rightIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

export default memo(Input);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    paddingVertical: 4,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 13,
    includeFontPadding: false,
    fontFamily: fontFamily.Font500,
    color: colors.transparent_black,
  },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 14,
    tintColor: '#000000',
  },
});