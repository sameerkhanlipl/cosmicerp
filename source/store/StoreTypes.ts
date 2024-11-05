export type UserState = {
  id: number;
  name: string;
  mobile: string;
};

export type AppState = {
  user: null | UserState;
  token: string | null;
};
