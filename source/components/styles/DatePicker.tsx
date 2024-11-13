import moment from 'moment';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {images} from '../../assets/images';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {Font500} from '../fonts/Fonts';
import DatePickerModel, {DatePickerModelRef} from '../model/DatePickerModel';

type DatePickerProps = {
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  default_value?: string;
  config?: DatePickerProps;
  rightIconStyle?: ImageStyle;
  inputContainerStyle?: ViewStyle;
  rootStyle?: ViewStyle | ViewStyle[];
};

export type DatePickerRef = {
  set: (value: string) => void;
  get: () => string;
};

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      labelStyle = {},
      inputStyle,
      default_value = '',
      config,
      rightIconStyle,
      inputContainerStyle,
      rootStyle,
    },
    ref,
  ) => {
    const [input, setInput] = useState<string>(default_value);

    const modelRef = useRef<DatePickerModelRef>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          set: (value: string) => {
            setInput(value);
          },
          get: () => input,
        };
      },
      [input],
    );

    const onChangHandler = useCallback(() => {
      setInput(
        moment(modelRef.current?.value()).format('YYYY-MM-DD')?.toString(),
      );
      modelRef.current?.close();
    }, []);

    const onOpenDatePicker = useCallback(() => {
      modelRef.current?.open(null);
    }, []);

    return (
      <View style={rootStyle}>
        <DatePickerModel
          config={{...config, date: new Date(), minimumDate: new Date()}}
          onPress={onChangHandler}
          ref={modelRef}
        />
        <Font500 style={[styles.label, labelStyle]}>{'Date'}</Font500>
        <Pressable
          onPress={onOpenDatePicker}
          style={[styles.inputContainer, inputContainerStyle]}>
          <Text style={[styles.input, inputStyle]}>{input}</Text>

          <Image
            source={images.date}
            style={[styles.icon, rightIconStyle]}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    );
  },
);

export default memo(DatePicker);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.gray,
  },
  inputContainer: {
    height: 42,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: fontFamily.Font400,
  },
  icon: {
    width: 14,
    height: 14,
  },
});
