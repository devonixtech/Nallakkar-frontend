// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("authToken") || null,
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },

    // ✅ Merge updated fields and persist automatically
    updateUser: (state, action) => {
      const updatedUser = { ...state.user, ...action.payload };
      state.user = updatedUser;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
