import React, {FC, memo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';

type OtpInputProps = {
  onChangeTextHandler?: (otpCode: string) => void;
};

const OtpInput: FC<OtpInputProps> = ({onChangeTextHandler = () => {}}) => {
  const otpRef = useRef<OtpInputsRef>(null);

  return (
    <View>
      <OtpInputs
        ref={otpRef}
        clearTextOnFocus
        numberOfInputs={6}
        keyboardType="phone-pad"
        style={styles.otpStyle}
        autofillFromClipboard={false}
        handleChange={onChangeTextHandler}
        inputStyles={styles.otpInputStyle}
        inputContainerStyles={styles.otpInputContainer}
      />
    </View>
  );
};

export default memo(OtpInput);

const styles = StyleSheet.create({
  otp: {
    flex: 1,
  },
  otpStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInputStyle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.Font500,
  },
  otpInputContainer: {
    width: 50,
    height: 58,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3,
  },
});
