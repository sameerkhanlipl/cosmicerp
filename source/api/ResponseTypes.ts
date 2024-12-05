import {ExtruderOrderHistoryItemType} from '../screens/Extruder/ExtruderOrderHistoryItems';
import {ExtrudersItemType} from '../screens/Extruder/ExtrudersItems';
import {LaminationItemType} from '../screens/Lamination/LaminationItems';
import {LaminationMaterialInItemType} from '../screens/Lamination/LaminationMaterialInItems';
import {LaminationMaterialOutItemType} from '../screens/Lamination/LaminationMaterialOutItems';
import {LaminationOrderHistoryItemType} from '../screens/Lamination/LaminationOrderHistoryItems';
import {PackingItemType} from '../screens/Packing/PackingItems';
import {PackingOrderHistoryItemType} from '../screens/Packing/PackingOrderHistoryItems';
import {RewindingItemType} from '../screens/Rewinding/RewindingItems';
import {RewindingOrderHistoryItemType} from '../screens/Rewinding/RewindingOrderHistoryItems';
import {StitchingItemType} from '../screens/Stitching/StitchingItems';
import {StitchingOrderHistoryItemType} from '../screens/Stitching/StitchingOrderHistoryItems';

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

export type material_in_response = {
  success: string;
  message: string;
  data: {material_in: LaminationMaterialInItemType[]};
  status: number;
};

export type material_out_response = {
  success: string;
  message: string;
  data: {material_in: LaminationMaterialOutItemType[]};
  status: number;
};

export type material_in_listing_response = {
  success: boolean | string;
  data: LaminationMaterialInItemType[] | [];
};

export type material_out_listing_response = {
  success: boolean | string;
  data: LaminationMaterialOutItemType[] | [];
};

export type material_type_listing_response = {
  success: boolean | string;
  data: [
    {
      id: number | string;
      name: string;
      status: string;
      created_at: string;
      updated_at: string;
    },
  ];
};

export type sub_categories_listing_response = {
  success: boolean | string;
  data: [
    {
      id: number | string;
      parent_category_id: number | string;
      sub_cat_name: string;
      status: string;
      created_at: string;
      updated_at: string;
    },
  ];
};

export type material_name_listing_response = {
  data: [
    {
      category_id: number | string;
      created_at: string;
      id: number | string;
      material_name: string;
      material_product_image: null | string;
      quantity: string;
      remark: string;
      sub_category: number | string;
      unit: string;
      updated_at: string;
    },
  ];
  success: boolean | string;
};

export type get_unit_label_response = {
  success: boolean | string;
  unit1Label: string;
  unit2Label: string;
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

export type stitching_order_history_listing_response = {
  success: string;
  data: StitchingOrderHistoryItemType[];
};

export type stitching_complete_orders_response = {
  status: number;
  requestCode: number;
  message: string;
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

export type signout_response = {message: string; status: number | string};
