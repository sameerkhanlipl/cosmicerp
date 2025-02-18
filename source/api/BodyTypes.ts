export type login_body = {
  mobile: string | undefined;
  device_token: string;
};

export type otp_verification_body = {
  mobile: string | undefined;
  code: string | undefined;
  device_token: string;
};

export type lamination_search_order_body = {
  search: number | string;
};

export type lamination_set_order_complete_body = {
  lamination_production_order_id: number | string | undefined;
  machine?: string | undefined;
  date: string | undefined;
  meter: number | string | undefined;
};

export type lamination_set_make_order_complete_body = {
  lamination_production_order_id: number | string | undefined;
};


export type lamination_delete_order_body = {
  id: number | string | undefined;
};

export type lamination_order_history_body = {
  lamination_production_order_id: number | string | undefined;
};

export type material_in_body = {
  date: string | undefined;
  machine: number | string | undefined;
  material_category_type: number | string | undefined;
  material_sub_category: number | string | undefined;
  material_name: number | string | undefined;
  unit1: string | undefined;
  unit1_value: number | string | undefined;
  unit2?: string | undefined;
  unit2_value?: number | string | undefined;
  user_id: number | string | undefined;
};

export type material_out_body = {
  date: string | undefined;
  machine: number | string | undefined;
  material_category_type: number | string | undefined;
  material_sub_category: number | string | undefined;
  material_name: number | string | undefined;
  unit1: string | undefined;
  unit1_value: number | string | undefined;
  unit2?: string | undefined;
  unit2_value?: number | string | undefined;
  user_id: number | string | undefined;
};

export type extruder_set_order_complete_body = {
  extruder_production_order_id: number | string | undefined;
  machine: string | undefined;
  date: string | undefined;
  shift: string | undefined;
  qty: number | string | undefined;
  size: number | string | undefined;
};


export type extruder_set_make_order_complete_body = {
  extruder_production_order_id: number | string | undefined;
};

export type extruder_order_history_body = {
  extruder_production_order_id: number | string | undefined;
};

export type exruder_search_order_body = {
  search: number | string;
};

export type extruder_delete_order_body = {
  id: number | string | undefined;
};


export type rewinding_order_history_body = {
  rewinding_production_order_id: number | string | undefined;
};

export type rewinding_search_order_body = {
  search: number | string;
};

export type rewinding_set_order_complete_body = {
  rewinding_production_order_id: number | string | undefined;
  contractor: string | undefined;
  date: string | undefined;
  rolls: number | string | undefined;
  remark: string | undefined;
};
export type rewinding_set_make_order_complete_body = {
  rewinding_production_order_id: number | string | undefined;
};

export type rewinding_delete_order_body = {
  id: number | string | undefined;
};



export type stitching_search_order_body = {
  search: number | string;
};

export type stitching_order_history_body = {
  stitching_production_order_id: number | string | undefined;
};

export type stitching_set_order_complete_body = {
  stitching_production_order_id: number | string | undefined;
  labour_name: string | undefined;
  date: string | undefined;
  bdl_qty: number | string | undefined;
  qty_per_bdl: number | string | undefined;
  remark: string | undefined;
};

export type stitching_set_make_order_complete_body = {
  stitching_production_order_id: number | string | undefined;
};

export type stitching_delete_order_body = {
  id: number | string | undefined;
};



export type packing_search_order_body = {
  search: number | string;
};

export type packing_order_history_body = {
  packing_production_order_id: number | string | undefined;
};

export type packing_set_order_complete_body = {
  packing_production_order_id: number | string | undefined;
  labour_name: string | undefined;
  date: string | undefined;
  bags_per_box_qty: number | string | undefined;
  steping_required: string | undefined;
  remark: string | undefined;
};

export type packing_set_make_order_complete_body = {
  packing_production_order_id: number | string | undefined;
};

export type packing_delete_order_body = {
  id: number | string | undefined;
};

export type material_type_listing_body = {
  data: [
    {
      created_at: string;
      id: number | string;
      name: string;
      status: string;
      updated_at: string;
    },
  ];
  success: boolean | string;
};

export type get_material_sub_categories_listing_body = {
  parent_category_id: number | string | undefined;
};

export type get_material_name_body = {
  sub_category_id: number | string | undefined;
  parent_category_id: number | string | undefined;
};

export type get_unit_label_body = {
  material_id: number | string | undefined;
};
