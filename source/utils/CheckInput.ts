import {ShowToast} from './ErrorHandler';

export const checkInput = (
  string: string | undefined,
  message: string,
  key?: string,
) => {
  if (!string || string?.toString()?.trim().length === 0) {
    ShowToast(message);
    return true;
  }
  if (key === 'MobileNumber' && string.toString()?.trim().length < 10) {
    ShowToast(message);
    return true;
  }
  if (key === 'MobileNumber' && !string?.toLowerCase()?.match(/^\d{10}$/)) {
    ShowToast(message);
    return true;
  }
  if (
    key === 'Email' &&
    !string
      ?.toLowerCase()
      ?.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    ShowToast(message);
    return true;
  }
  if (
    key === 'Password' &&
    !string?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
  ) {
    ShowToast(message);
    return true;
  }
  return false;
};
