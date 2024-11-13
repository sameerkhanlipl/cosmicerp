import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import {images} from '../../assets/images';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {Font400, Font500} from '../fonts/Fonts';

export type DropDownType = {
  title: string;
  value: string;
};

export type DropDownRef = {
  set: (value: DropDownType) => void;
  get: () => DropDownType;
};

type DropDownProps = {
  data: DropDownType[];
  onSelect?: (value: DropDownType) => void;
  config?: Partial<SelectDropdownProps>;
  label?: string;
  labelStyle?: TextStyle;
  default_value?: string;
  leftIconStyle?: ImageStyle;
  secureTextEntry?: boolean;
  leftIconPress?: () => void;
  rightIconPress?: () => void;
  rightIconStyle?: ImageStyle;
  leftIcon?: ImageRequireSource;
  rightIcon?: ImageRequireSource;
  inputContainerStyle?: ViewStyle;
  rootStyle?: ViewStyle | ViewStyle[];
};

const DropDown = forwardRef<DropDownRef, DropDownProps>(
  (
    {
      data,
      onSelect,
      config,
      label,
      labelStyle = {},
      leftIconStyle,
      leftIconPress,
      rightIconPress,
      rightIconStyle,
      leftIcon,
      rightIcon,
      inputContainerStyle,
      rootStyle,
    },
    ref,
  ) => {
    const [selectedOption, setSelectedOption] = useState<DropDownType>(data[0]);

    useImperativeHandle(
      ref,
      () => {
        return {
          set: (value: DropDownType) => {
            setSelectedOption(value);
          },
          get: (): DropDownType => selectedOption,
        };
      },
      [selectedOption],
    );

    useEffect(() => {
      if (data?.[0]) {
        setSelectedOption(data[0]);
      }
    }, [data]);

    useEffect(() => {
      if (onSelect && selectedOption) {
        onSelect(selectedOption);
      }
    }, [onSelect, selectedOption]);

    return (
      <View style={rootStyle}>
        {label ? (
          <Font500 style={[styles.label, labelStyle]}>{label}</Font500>
        ) : null}
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {leftIcon ? (
            <Pressable onPress={leftIconPress}>
              <Image
                source={leftIcon}
                style={[styles.icon, leftIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          ) : null}

          <SelectDropdown
            data={data}
            defaultValue={data[0]}
            searchInputTxtColor={colors.black}
            searchInputTxtStyle={{
              fontFamily: fontFamily.Font500,
            }}
            onSelect={selectedItem => {
              setSelectedOption(selectedItem);
            }}
            renderButton={selectedItem => {
              return (
                <View style={styles.renderButtonStyle}>
                  <Text style={styles.input}>
                    {(selectedItem && selectedItem.title) ||
                      selectedOption?.title}
                  </Text>
                  <Image
                    style={styles.dropDownIcon}
                    source={images.arrow_down}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: colors.color_22534F}),
                  }}>
                  <Font400
                    style={{color: isSelected ? colors.white : colors.black}}>
                    {item.title}
                  </Font400>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            {...config}
          />
          {rightIcon ? (
            <Pressable onPress={rightIconPress}>
              <Image
                source={rightIcon}
                style={[styles.icon, rightIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  },
);

export default DropDown;

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
  },
  renderButtonStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 14,
  },
  dropdownItemStyle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
