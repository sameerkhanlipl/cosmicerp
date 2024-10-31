import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, memo, useCallback, useRef} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../assets/images';
import {Font400, Font600} from '../components/fonts/Fonts';
import Button from '../components/styles/Button';
import Input, {InputRef} from '../components/styles/Input';
import {colors} from '../constants/colors';

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login: FC<LoginProps> = ({navigation}: LoginProps) => {
  const phone_number = useRef<InputRef>(null);

  const {top} = useSafeAreaInsets();

  const onNavigateOtpVerification = useCallback(
    () =>
      navigation.navigate('OtpVerification', {
        phone_number: '738377096',
        country_code: '91',
      }),
    [],
  );

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <ScrollView contentContainerStyle={styles.scrollRoot}>
        <View style={styles.header}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Font600 style={styles.title}>
            {'Enter your details to Login'}
          </Font600>
          <Font400 style={styles.subTitle}>
            {'reach out to admin for login issue'}
          </Font400>
        </View>
        <View style={styles.container}>
          <Input
            ref={phone_number}
            label="Phone Number"
            config={{keyboardType: 'number-pad'}}
          />
          <Button
            onPress={onNavigateOtpVerification}
            buttonContainerStyle={styles.button}>
            {'Login'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Login);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.color_22534F,
  },
  scrollRoot: {
    flexGrow: 1,
    paddingTop: 47,
  },
  header: {
    paddingHorizontal: 27,
  },
  logo: {
    width: 174,
    height: 49,
  },
  title: {
    fontSize: 24,
    marginTop: 77,
    marginBottom: 17,
    color: colors.white,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 49,
    color: colors.white,
  },
  container: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.color_F4F8F7,
  },
  button: {
    marginTop: 33,
  },
});
