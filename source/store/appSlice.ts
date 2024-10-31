// reducers/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState, UserState} from './StoreTypes';

const initialState: AppState = {
  user: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state: AppState, action: PayloadAction<UserState>) => {
      state.user = action?.payload;
    },
  },
});

export const {login} = appSlice.actions;
export default appSlice.reducer;
