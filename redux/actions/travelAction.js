import { createAsyncThunk } from "@reduxjs/toolkit";
import { travelService } from "../../services";

export const getAllTravelAdventure = createAsyncThunk(
  "travel/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      return await travelService.getAllTravelAdventure(token);
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
