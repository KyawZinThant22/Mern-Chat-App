import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
    id : any
   name: string;
   email: string;
   pic: any;
}
const JWTToken = localStorage.getItem('token');

interface initializeData {
   user: User | {};
   token: string;
   authSuccess: boolean;
}

interface UserPayload {
    user: User | {};
    token: string;
}

const initialState = { user: {}, token: JWTToken || '', authSuccess: false } as initializeData;

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setAuthUser(state, action: PayloadAction<UserPayload>) {
         (state.user = action.payload.user), (state.token = action.payload.token);
         state.authSuccess = true;
      },
      setUnAuth(state) {
         state.user = {};
         (state.token = ''), (state.authSuccess = false);
      },
   },
});

export const { setAuthUser, setUnAuth } = authSlice.actions;
export default authSlice.reducer;
