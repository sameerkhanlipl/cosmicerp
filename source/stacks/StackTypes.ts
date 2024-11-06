import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    phone_number: number | string;
    country_code: number | string;
  };
  SelectRole: undefined;
};

export type MainParamList = {
  Extruder: undefined;
  Packing: undefined;
  Silai: undefined;
  Rewinding: undefined;
  Lamination: undefined;
};

export type AppStackParamList = {
  MainStack: NavigatorScreenParams<MainParamList>;
  ProfileDetail: undefined;
  ExtruderOrderHistory: undefined;
  ExtruderAddCompletedOrder: undefined;
};

export type AppNavigationProp = NavigationProp<AppStackParamList>;
