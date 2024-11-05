// reducers/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState, UserState} from './StoreTypes';

const initialState: AppState = {
  user: null,
  token: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state: AppState, action: PayloadAction<UserState>) => {
      state.user = action?.payload;
    },
    logout: (state: AppState) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {login, logout} = appSlice.actions;
export default appSlice.reducer;
