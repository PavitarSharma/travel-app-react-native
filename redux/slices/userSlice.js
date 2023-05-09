import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  signIn,
  signUp,
  updateAvatar,
  updateUser,
} from "../actions/userAction";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  user: {},
  users: [],
  message: "",
  token: null,
  status: STATUSES.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = STATUSES.IDLE;
      state.message = "";
      state.token = null;
    },

    logout: (state) => {
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = STATUSES.IDLE;
        state.message = action.payload?.message;
      })

      .addCase(signUp.rejected, (state, action) => {
        state.user = null;
        state.message = action.payload.message || "Sign up failed";
        state.status = STATUSES.ERROR;
      })

      .addCase(signIn.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = STATUSES.IDLE;
        state.message = action.payload.message;
        state.token = action.payload.token;
      })

      .addCase(signIn.rejected, (state, action) => {
        state.user = null;
        state.message = action.payload.message;
        state.token = null;
        state.status = STATUSES.ERROR;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = STATUSES.IDLE;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.status = STATUSES.IDLE;
      })

      .addCase(updateUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.status = STATUSES.IDLE;
      })

      .addCase(updateAvatar.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { reset, logout } = userSlice.actions;

export const userState = (state) => state.user;

export default userSlice.reducer;
