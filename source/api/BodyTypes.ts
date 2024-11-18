export type login_body = {
  mobile: string | undefined;
  device_token: string;
};

export type otp_verification_body = {
  mobile: string | undefined;
  code: string | undefined;
  device_token: string;
};

export type lamination_set_order_complete_body = {
  lamination_production_order_id: number | string | undefined;
  machine: string | undefined;
  date: string | undefined;
  meter: number | string | undefined;
};

export type lamination_order_history_body = {
  lamination_production_order_id: number | string | undefined;
};

export type extruder_set_order_complete_body = {
  extruder_production_order_id: number | string | undefined;
  machine: string | undefined;
  date: string | undefined;
  shift: string | undefined;
  qty: number | string | undefined;
  size: number | string | undefined;
};

export type extruder_order_history_body = {
  extruder_production_order_id: number | string | undefined;
};
