import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, memo, useCallback} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {images} from '../../assets/images';
import {Font400, Font600} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import OtpInput from '../../components/styles/OtpInput';
import {colors} from '../../constants/colors';
import {AuthStackParamList} from '../../stacks/StackTypes';
import {login} from '../../store/appSlice';
import {AppDispatch} from '../../store/store';

type OtpVerificationProps = NativeStackScreenProps<
  AuthStackParamList,
  'OtpVerification'
>;

const OtpVerification: FC<OtpVerificationProps> = ({
  navigation,
  route,
}: OtpVerificationProps) => {
  const {top} = useSafeAreaInsets();

  const {phone_number, country_code} = route?.params;

  const onResendOtpHandler = useCallback(() => {}, []);

  const dispatch = useDispatch<AppDispatch>();

  const onNavigateSelectRole = useCallback(() => {
    dispatch(login({mobile: '7896541236', name: 'Aaftab Shekh', id: 1}));
  }, []);

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <ScrollView contentContainerStyle={styles.scrollRoot}>
        <Pressable onPress={navigation.goBack}>
          <Image
            source={images.back}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </Pressable>
        <Font600 style={styles.title}>{'Enter your 6-digit code'}</Font600>
        <Font400
          style={
            styles.subTitle
          }>{`Code sent to +${country_code} ${phone_number} unless you already have an account`}</Font400>
        <OtpInput />
        <View style={styles.otpFooter}>
          <Pressable onPress={onResendOtpHandler}>
            <Font400 style={styles.otpFooterText}>{'Resend OTP'}</Font400>
          </Pressable>
          <Font400 style={styles.otpFooterText}>{'03:00'}</Font400>
        </View>
        <Button
          onPress={onNavigateSelectRole}
          buttonContainerStyle={styles.button}>
          {'Continue'}
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(OtpVerification);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
    paddingHorizontal: 27,
  },
  backIcon: {
    height: 28,
    width: 28,
  },
  title: {
    marginTop: 40,
    fontSize: 30,
  },
  subTitle: {
    marginVertical: 28,
    color: colors.transparent_black_7,
  },
  otpFooter: {
    marginTop: 17,
    marginBottom: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpFooterText: {
    color: colors.transparent_black_7,
  },
  button: {},
});
