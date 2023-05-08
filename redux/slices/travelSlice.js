import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./userSlice";
import { getAllTravelAdventure } from "../actions/travelAction";

export const initialState = {
  travel: {},
  travels: [],
  status: STATUSES.IDLE,
};

export const travelSlice = createSlice({
  name: "travel",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTravelAdventure.pending, (state) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(getAllTravelAdventure.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travels = action.payload.travels;
      })

      .addCase(getAllTravelAdventure.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const travelState = (state) => state.travel;

export default travelSlice.reducer;
