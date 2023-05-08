import { createAsyncThunk } from "@reduxjs/toolkit";
import { travelService } from "../../services";

export const getAllTravelAdventure = createAsyncThunk(
  "travel/getAll",
  async ({ title, category }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      return await travelService.getAllTravelAdventure(title, category, token);
    } catch (error) {
      console.error(error.response.data.message);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const favoriteAdventureTrip = createAsyncThunk(
  "travel/favorite",
  async ({ id, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      console.log(token);
      return await travelService.favoriteAdventureTrip(id, body, token);
    } catch (error) {
      console.error(error);

      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFavoriteAdventure = createAsyncThunk(
  "travel/getFavorite",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      return await travelService.getFavoriteAdventure(token);
    } catch (error) {
      console.error(error.response.data.message);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookedAdventure = createAsyncThunk(
  "travel/booked",
  async ({ id, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      return await travelService.bookAdventureTrip(id, body, token);
    } catch (error) {
      console.error(error.message);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postTravelAdventure = createAsyncThunk(
  "travel/postTravelAdventure",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      return await travelService.postTravelAdventure(data, token);
    } catch (error) {
      console.error(error.response.data.message);

      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getUserAdventureTrip = createAsyncThunk(
  "travel/getUserAdventureTrip",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      return await travelService.getUserAdventureTrip(token);
    } catch (error) {
      console.error(error.response.data.message);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
