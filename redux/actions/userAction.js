import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    try {
      return await userService.signUp(data);
    } catch (error) {
      console.error(error);

      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (data, thunkAPI) => {
    try {
      return await userService.signIn(data);
    } catch (error) {
      console.error(error.response.data);

      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
  
    try {
      const token = thunkAPI.getState().user.token;

      return await userService.getUser(userId, token);
    } catch (error) {
      console.log(error.response.data);

      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({userId, data}, thunkAPI) => {
    
    try {
      const token = thunkAPI.getState().user.token;

      return await userService.updateUser(userId, data, token);
    } catch (error) {
      console.error(error.response.data.message);
      console.log(userId);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async ({userId, data}, thunkAPI) => {
    
    try {
      const token = thunkAPI.getState().user.token;

      return await userService.updateAvatar(userId, data, token);
    } catch (error) {
      console.error(error.response.data.message);
      console.log(userId);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
