import {
  extruder_order_history_body,
  extruder_set_order_complete_body,
  get_material_name_body,
  get_material_sub_categories_listing_body,
  lamination_order_history_body,
  lamination_set_order_complete_body,
  login_body,
  material_in_body,
  otp_verification_body,
  packing_order_history_body,
  packing_set_order_complete_body,
  rewinding_order_history_body,
  rewinding_set_order_complete_body,
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
  console.log('data', data);
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

export const material_in_listing = async () => {
  try {
    const response = await instance.post('materialin/get');
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

export const extruder_complete_orders = async (
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
      'rewinding/orders/getOrderByRewindingOrderId',
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

export const signout = async () => {
  try {
    const response = await instance.post('logout');
    return response;
  } catch (error) {
    throw error;
  }
};
