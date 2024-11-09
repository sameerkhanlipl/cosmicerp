export type login_body = {
  mobile: string | undefined;
  device_token: string;
};

export type otp_verification_body = {
  mobile: string | undefined;
  code: string | undefined;
  device_token: string;
};
