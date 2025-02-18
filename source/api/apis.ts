import {
  exruder_delete_order_body,
  exruder_search_order_body,
  extruder_delete_order_body,
  extruder_order_history_body,
  extruder_set_make_order_complete_body,
  extruder_set_order_complete_body,
  get_material_name_body,
  get_material_sub_categories_listing_body,
  get_unit_label_body,
  lamination_delete_order_body,
  lamination_order_history_body,
  lamination_search_order_body,
  lamination_set_make_order_complete_body,
  lamination_set_order_complete_body,
  login_body,
  material_in_body,
  material_out_body,
  otp_verification_body,
  packing_delete_order_body,
  packing_order_history_body,
  packing_search_order_body,
  packing_set_make_order_complete_body,
  packing_set_order_complete_body,
  rewinding_delete_order_body,
  rewinding_order_history_body,
  rewinding_search_order_body,
  rewinding_set_make_order_complete_body,
  rewinding_set_order_complete_body,
  stitching_delete_order_body,
  stitching_order_history_body,
  stitching_search_order_body,
  stitching_set_make_order_complete_body,
  stitching_set_order_complete_body,
} from './BodyTypes';
import instance from './interceptors';

export const login = async (data: login_body) => {
  try {
    const response = await instance.post('login/mobile', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const otp_verification = async (data: otp_verification_body) => {
  try {
    const response = await instance.post('login/mobile/verify', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const lamination_search_orders = async (data:any) => {
  try {
    const response = await instance.post(
      '/lamination/orders/searchOrder',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const lamination_pending_orders = async () => {
  try {
    const response = await instance.post(
      'lamination/orders/getOrdersByStatus',
      {
        status: 'pending',
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const lamination_complete_orders = async () => {
  try {
    const response = await instance.post(
      'lamination/orders/getOrdersByStatus',
      {
        status: 'completed',
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const lamination_order_history = async (
  data: lamination_order_history_body,
) => {
  try {
    const response = await instance.post(
      'lamination/orders/getOrderByLaminationId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const lamination_set_make_order_complete = async (
  data: lamination_set_make_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'lamination/orders/makeItComplete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const lamination_delete_order = async (
  data: lamination_delete_order_body,
) => {
  try {
    const response = await instance.post(
      'lamination/orders/laminationOrderHistoryDelete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const lamination_set_order_complete = async (
  data: lamination_set_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'lamination/orders/setOrderCompleted',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const material_in = async (data: material_in_body) => {
  try {
    const response = await instance.post('materialin/store', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const material_out = async (data: material_out_body) => {
  try {
    const response = await instance.post('materialout/store', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const material_in_listing = async () => {
  try {
    const response = await instance.post('materialin/get');
    return response;
  } catch (error) {
    throw error;
  }
};

export const material_out_listing = async () => {
  try {
    const response = await instance.post('materialout/get');
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_material_type_listing = async () => {
  try {
    const response = await instance.post('getMaterialCategories');
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_material_sub_categories_listing = async (
  data: get_material_sub_categories_listing_body,
) => {
  try {
    const response = await instance.post(
      'getMaterialSubCategoriesByCategoryId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_material_name_listing = async (
  data: get_material_name_body,
) => {
  try {
    const response = await instance.post(
      'getMaterialByCategoryAndSubCategoryId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_unit_label = async (data: get_unit_label_body) => {
  try {
    const response = await instance.post('getUnitsByMaterialId', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const extruder_pending_orders = async () => {
  try {
    const response = await instance.post('extruder/orders/getOrdersByStatus', {
      status: 'pending',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const extruder_search_orders = async (data : exruder_search_order_body) => {
  try {
    const response = await instance.post(
      '/extruder/orders/searchOrder',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const extruder_complete_orders = async () => {
  try {
    const response = await instance.post('extruder/orders/getOrdersByStatus', {
      status: 'completed',
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const extruder_set_make_order_complete = async (
  data: extruder_set_make_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'extruder/orders/makeItComplete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const extruder_order_history = async (
  data: extruder_order_history_body,
) => {
  try {
    const response = await instance.post(
      'extruder/orders/getOrderByExtruderOrderId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const extruder_set_order_complete = async (
  data: extruder_set_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'extruder/orders/setOrderCompleted',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const extruder_delete_order = async (
  data: extruder_delete_order_body,
) => {
  try {
    const response = await instance.post(
      'extruder/orders/extruderOrderHistoryDelete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const rewinding_search_orders = async (data : rewinding_search_order_body) => {
  try {
    const response = await instance.post(
      '/rewinding/orders/searchOrder',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const rewinding_pending_orders = async () => {
  try {
    const response = await instance.post('rewinding/orders/getOrdersByStatus', {
      status: 'pending',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const rewinding_complete_orders = async () => {
  try {
    const response = await instance.post('rewinding/orders/getOrdersByStatus', {
      status: 'completed',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const rewinding_order_history = async (
  data: rewinding_order_history_body,
) => {
  try {
    const response = await instance.post(
      'rewinding/orders/getOrderByRewindingOrderId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const rewinding_set_order_complete = async (
  data: rewinding_set_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'rewinding/orders/setOrderCompleted',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const rewinding_set_make_order_complete = async (
  data: rewinding_set_make_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'rewinding/orders/makeItComplete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const rewinding_delete_order = async (
  data: rewinding_delete_order_body,
) => {
  try {
    const response = await instance.post(
      'rewinding/orders/rewindingOrderHistoryDelete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const stitching_search_orders = async (data : stitching_search_order_body) => {
  try {
    const response = await instance.post(
      '/stitching/orders/searchOrder',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const stitching_pending_orders = async () => {
  try {
    const response = await instance.post('stitching/orders/getOrdersByStatus', {
      status: 'pending',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const stitching_complete_orders = async () => {
  try {
    const response = await instance.post('stitching/orders/getOrdersByStatus', {
      status: 'completed',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const stitching_order_history = async (
  data: stitching_order_history_body,
) => {
  try {
    const response = await instance.post(
      'stitching/orders/getOrderByStitchingOrderId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const stitching_set_order_complete = async (
  data: stitching_set_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'stitching/orders/setOrderCompleted',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const stitching_set_make_order_complete = async (
  data: stitching_set_make_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'stitching/orders/makeItComplete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const stitching_delete_order = async (
  data: stitching_delete_order_body,
) => {
  try {
    const response = await instance.post(
      'stitching/orders/stitchingOrderHistoryDelete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};



export const packing_search_orders = async (data : packing_search_order_body) => {
  try {
    const response = await instance.post(
      '/packing/orders/searchOrder',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const packing_pending_orders = async () => {
  try {
    const response = await instance.post('packing/orders/getOrdersByStatus', {
      status: 'pending',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const packing_complete_orders = async () => {
  try {
    const response = await instance.post('packing/orders/getOrdersByStatus', {
      status: 'completed',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const packing_order_history = async (
  data: packing_order_history_body,
) => {
  try {
    const response = await instance.post(
      'packing/orders/getOrderByPackingOrderId',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const packing_set_order_complete = async (
  data: packing_set_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'packing/orders/setOrderCompleted',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const packing_set_make_order_complete = async (
  data: packing_set_make_order_complete_body,
) => {
  try {
    const response = await instance.post(
      'packing/orders/makeItComplete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const packing_delete_order = async (
  data: packing_delete_order_body,
) => {
  try {
    const response = await instance.post(
      'packing/orders/packingOrderHistoryDelete',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const signout = async () => {
  try {
    const response = await instance.post('logout');
    return response;
  } catch (error) {
    throw error;
  }
};
