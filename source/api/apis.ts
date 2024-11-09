import {login_body, otp_verification_body} from './BodyTypes';
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
