export type UserState = {
  name?: string;
  role?: string;
  phone_number?: string;
  mail?: string;
};

export type AppState = {
  user: null | UserState;
};
