import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUserFromToken = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
};

export type TUserData = {
  name: string;
  email: string;
  role: string;
  photoURL: string;
};

type TAuthState = {
  user: null | TUserFromToken;
  token: null | string;
  userData: null | TUserData;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, userData } = action.payload;
      state.user = user;
      state.token = token;
      state.userData = userData;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.userData = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const userCurrentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
export const currentUserData = (state: RootState) => state.auth.userData;
