import {login_body} from './BodyTypes';
import instance from './interceptors';
import {login_response} from './ResponseTypes';

export const login_api = async (data: login_body): Promise<login_response> => {
  try {
    const response: login_response = await instance.post(`login/mobile`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const otp_verification_api = async (
  data: login_body,
): Promise<login_response> => {
  try {
    const response: login_response = await instance.post(`login/mobile/verify`);
    return response;
  } catch (error) {
    throw error;
  }
};
