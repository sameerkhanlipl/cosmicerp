export type UserState = {
  name?: string | undefined;
  id?: number | undefined;
  mobile?: string | undefined;
  token?: string | null;
};

export type AppState = {
  user?: null | UserState;
};
