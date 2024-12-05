import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';
import {ExtrudersItemType} from '../screens/Extruder/ExtrudersItems';
import {RewindingItemType} from '../screens/Rewinding/RewindingItems';
import {PackingItemType} from '../screens/Packing/PackingItems';
import {LaminationItemType} from '../screens/Lamination/LaminationItems';
import {StitchingItemType} from '../screens/Stitching/StitchingItems';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    phone_number: number | string | undefined;
    verification_code: number | string | undefined;
  };
};

export type MainParamList = {
  Extruder: undefined;
  Packing: undefined;
  Stitching: undefined;
  Rewinding: undefined;
  Lamination: undefined;
};

export type AppStackParamList = {
  ExtruderSearchOrders: undefined;
  PackingSearchOrders: undefined;
  StitchingSearchOrders: undefined;
  RewindingSearchOrders: undefined;
  LaminationSearchOrders: undefined;
  MainStack: NavigatorScreenParams<MainParamList>;
  ProfileDetail: undefined;
  LaminationMaterialIn: undefined;
  LaminationMaterialOut: undefined;
  LaminationOrderHistory: {data: LaminationItemType};
  LaminationAddCompletedOrder: {data: LaminationItemType};
  ExtruderMaterialOut: undefined;
  ExtruderOrderHistory: {data: ExtrudersItemType};
  ExtruderAddCompletedOrder: {data: ExtrudersItemType};
  PackingOrderHistory: {data: PackingItemType};
  PackingAddCompletedOrder: {data: PackingItemType};
  RewindingOrderHistory: {data: RewindingItemType};
  RewindingAddCompletedOrder: {data: RewindingItemType};
  StitchingOrderHistory: {data: StitchingItemType};
  StitchingAddCompletedOrder: {data: StitchingItemType};
};

export type AppNavigationProp = NavigationProp<AppStackParamList>;
