import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { otp_verification } from "../../api/apis";
import { otp_verification_body } from "../../api/BodyTypes";
import { otp_verification_response } from "../../api/ResponseTypes";
import { images } from "../../assets/images";
import { Font400, Font600 } from "../../components/fonts/Fonts";
import Button from "../../components/styles/Button";
import OtpInput from "../../components/styles/OtpInput";
import { colors } from "../../constants/colors";
import { AuthStackParamList } from "../../stacks/StackTypes";
import { login } from "../../store/appSlice";
import { AppDispatch } from "../../store/store";
import { checkInput } from "../../utils/CheckInput";
import { error } from "../../utils/ErrorHandler";

type OtpVerificationProps = NativeStackScreenProps<
  AuthStackParamList,
  "OtpVerification"
>;

const OtpVerification: FC<OtpVerificationProps> = ({
  navigation,
  route
}: OtpVerificationProps) => {
  const { top } = useSafeAreaInsets();

  const [loader, setLoader] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>();

  const { phone_number, verification_code } = route?.params;

  const onResendOtpHandler = useCallback(() => {}, []);

  const dispatch = useDispatch<AppDispatch>();

  const onVerificationCode = useCallback(async () => {
    if (checkInput(otp, "OTP Is Require")) {
      return;
    }
    if (
      checkInput(otp && otp?.length < 6 ? "" : "true", "Enter 6 Digits of OTP")
    ) {
      return;
    }
    if (checkInput(otp != verification_code ? "" : "true", "Invalid OTP")) {
      return;
    }
    try {
      setLoader(true);
      const body: otp_verification_body = {
        code: otp,
        device_token: "777",
        mobile: phone_number?.toString()
      };
      console.log("body",body)
      const response: { data: otp_verification_response } =
        await otp_verification(body);
         dispatch(
        login({
          mobile: phone_number?.toString(),
          id: response?.data?.user?.id,
          token: response?.data?.token,
          name: response?.data?.user?.name
        })
      );
      setLoader(false);
    } catch (err) {
      error(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }, [otp, dispatch, phone_number]);

  useEffect(() => {
    if (otp?.toString()?.trim()?.length === 6) {
      onVerificationCode();
    }
  }, [otp, onVerificationCode]);

  return (
    <View style={[styles.root, { paddingTop: top }]}>
      <ScrollView contentContainerStyle={styles.scrollRoot}>
        <Pressable onPress={navigation.goBack}>
          <Image
            source={images.back}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </Pressable>
        <Font600 style={styles.title}>{"Enter your 6-digit code"}</Font600>
        <Font400
          style={styles.subTitle}
        >{`Code sent to ${phone_number} and your otp is ${verification_code}`}</Font400>
        <OtpInput onChangeTextHandler={setOtp} />
        <View style={styles.otpFooter}>
          <Pressable onPress={onResendOtpHandler}>
            <Font400 style={styles.otpFooterText}>{"Resend OTP"}</Font400>
          </Pressable>
          <Font400 style={styles.otpFooterText}>{"03:00"}</Font400>
        </View>
        <Button
          loader={loader}
          onPress={onVerificationCode}
          buttonContainerStyle={styles.button}
        >
          {"Continue"}
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(OtpVerification);

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scrollRoot: {
    flexGrow: 1,
    paddingHorizontal: 27
  },
  backIcon: {
    height: 28,
    width: 28
  },
  title: {
    marginTop: 40,
    fontSize: 30
  },
  subTitle: {
    marginVertical: 28,
    color: colors.transparent_black_7
  },
  otpFooter: {
    marginTop: 17,
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  otpFooterText: {
    color: colors.transparent_black_7
  },
  button: {}
});
