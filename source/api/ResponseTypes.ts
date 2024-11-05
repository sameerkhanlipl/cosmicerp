export type login_response = {
  requestCode: number;
  status: number;
  verification_code?: number;
  message: string;
};

export type otp_verification_response = {
  requestCode: number;
  status: number;
  message: string;
  user?: {
    id: number;
    name: string;
    mobile: string;
  };
  token?: string;
};
