import {ExtrudersItemType} from '../screens/Extruder/ExtrudersItems';
import {LaminationItemType} from '../screens/Lamination/LaminationItems';
import {PackingItemType} from '../screens/Packing/PackingItems';
import {RewindingItemType} from '../screens/Rewinding/RewindingItems';
import {StitchingItemType} from '../screens/Silai/StitchingItems';

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

export type lamination_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: LaminationItemType[];
};

export type extruder_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: ExtrudersItemType[];
};

export type rewinding_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: RewindingItemType[];
};

export type stitching_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: StitchingItemType[];
};

export type packing_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: PackingItemType[];
};
