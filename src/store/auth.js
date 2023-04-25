import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  payload: null,
  userId: null,
  isBiz: false,
  isAdmin: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (!action || !action.payload) {
        return;
      }
      state.isLoggedIn = true;
      state.payload = action.payload;
      state.userId = action.payload._id;
      state.isBiz = action.payload.biz;
      state.isAdmin = action.payload.isAdmin;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.payload = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
