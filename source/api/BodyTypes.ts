export type login_body = {
  mobile: string;
  device_token: string;
};

export type otp_verification_body = {
  mobile: number;
  code: number;
  device_token: number;
};
