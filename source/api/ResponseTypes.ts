import {ExtruderOrderHistoryItemType} from '../screens/Extruder/ExtruderOrderHistoryItems';
import {ExtrudersItemType} from '../screens/Extruder/ExtrudersItems';
import {LaminationItemType} from '../screens/Lamination/LaminationItems';
import {LaminationOrderHistoryItemType} from '../screens/Lamination/LaminationOrderHistoryItems';
import {PackingItemType} from '../screens/Packing/PackingItems';
import {PackingOrderHistoryItemType} from '../screens/Packing/PackingOrderHistoryItems';
import {RewindingItemType} from '../screens/Rewinding/RewindingItems';
import {RewindingOrderHistoryItemType} from '../screens/Rewinding/RewindingOrderHistoryItems';
import {StitchingItemType} from '../screens/Stitching/StitchingItems';

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

export type lamination_complete_orders_response = {
  status: number;
  requestCode: number;
  message: string;
};

export type lamination_order_history_listing_response = {
  success: string;
  data: LaminationOrderHistoryItemType[];
};

export type extruder_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: ExtrudersItemType[];
};

export type extruder_complete_orders_response = {
  status: number;
  requestCode: number;
  message: string;
};

export type extruder_order_history_listing_response = {
  success: string;
  data: ExtruderOrderHistoryItemType[];
};

export type rewinding_order_listing_response = {
  status: number;
  requestCode: number;
  message: string;
  data: RewindingItemType[];
};

export type rewinding_complete_orders_response = {
  status: number;
  requestCode: number;
  message: string;
};



export type rewinding_order_history_listing_response = {
  success: string;
  data: RewindingOrderHistoryItemType[];
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

export type packing_order_history_listing_response = {
  success: string;
  data: PackingOrderHistoryItemType[];
};

export type packing_complete_orders_response = {
  status: number;
  requestCode: number;
  message: string;
};
