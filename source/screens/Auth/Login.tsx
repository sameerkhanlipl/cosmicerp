import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {login} from '../../api/apis';
import {login_body} from '../../api/BodyTypes';
import {images} from '../../assets/images';
import {Font400, Font600} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import Input, {InputRef} from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {AuthStackParamList} from '../../stacks/StackTypes';
import {checkInput} from '../../utils/CheckInput';
import {error, ShowToast} from '../../utils/ErrorHandler';
import {login_response} from '../../api/ResponseTypes';

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login: FC<LoginProps> = ({navigation}: LoginProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const phone_number = useRef<InputRef>(null);

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    phone_number?.current?.set(__DEV__ ? '8866222412' : '');
  }, []);

  const onNavigateOtpVerification = useCallback(async () => {
    if (
      checkInput(phone_number?.current?.get(), 'Phone Number Require for Login')
    ) {
      return;
    }
    if (
      checkInput(
        phone_number?.current?.get(),
        'Enter Valid Phone Number',
        'MobileNumber',
      )
    ) {
      return;
    }

    try {
      setLoader(true);
      const data: login_body = {
        mobile: phone_number?.current?.get(),
        device_token: '777',
      };

      const response: {data: login_response} = await login(data);

      navigation.navigate('OtpVerification', {
        phone_number: phone_number?.current?.get(),
        verification_code: response?.data?.verification_code,
      });

      ShowToast('Your Otp is ' + response?.data?.verification_code);

      setLoader(false);
    } catch (err: any) {
      console.log('err', err);
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [navigation]);

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
            config={{
              maxLength: 10,
              keyboardType: 'number-pad',
              placeholder: 'Enter Your Registered Phone Number',
            }}
          />
          <Button
            loader={loader}
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
