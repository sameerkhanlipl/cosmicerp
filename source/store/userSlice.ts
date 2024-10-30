// reducers/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './StoreTypes';

const initialState: UserState = {
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: UserState, action: PayloadAction<null>) => {
            state.user = action?.payload
        }
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;