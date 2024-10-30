type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    phone_number: number | string;
    country_code: number | string;
  };
  SelectRole: undefined;
};
