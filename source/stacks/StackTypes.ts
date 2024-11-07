import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';
import {ExtrudersItemType} from '../screens/Extruder/ExtrudersItems';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    phone_number: number | string;
    country_code: number | string;
  };
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
  ExtruderOrderHistory: {data: ExtrudersItemType};
  ExtruderAddCompletedOrder: {data: ExtrudersItemType};
};

export type AppNavigationProp = NavigationProp<AppStackParamList>;
