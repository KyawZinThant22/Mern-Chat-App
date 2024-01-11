import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: any;
  name: string;
  email: string;
  pic: any;
}

const JWTToken = localStorage.getItem('token');

interface initializeData {
  user: IUser | null; 
  token: string;
  authSuccess: boolean;
}

interface UserPayload {
  user: IUser | null
  token: string | '';
}

const initialState: initializeData = {
  user: null, // Initialize with null for the absence of user data
  token: JWTToken || '',
  authSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<UserPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authSuccess = true;
    },
    setUnAuth(state) {
      state.user = null; // Set user to null when unauthenticating
      state.token = '';
      state.authSuccess = false;
      localStorage.removeItem("token")
    },
  },
});

export const { setAuthUser, setUnAuth } = authSlice.actions;
export default authSlice.reducer;
