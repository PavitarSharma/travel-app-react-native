import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./userSlice";
import {
  bookedAdventure,
  favoriteAdventureTrip,
  getAllTravelAdventure,
  getFavoriteAdventure,
  getUserAdventureTrip,
  postTravelAdventure,
} from "../actions/travelAction";

export const initialState = {
  travel: {},
  travels: [],
  status: STATUSES.IDLE,
};

export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    favoriteTrip: (state, action) => {
      state.travels = state.travels.filter((travel) =>
        travel?._id === action.payload.id
          ? { ...travel, favorite: action.payload.favorite }
          : travel
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTravelAdventure.pending, (state) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(postTravelAdventure.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travel = action.payload.travel;
      })

      .addCase(postTravelAdventure.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getAllTravelAdventure.pending, (state) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(getAllTravelAdventure.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travels = action.payload.travels;
      })

      .addCase(getAllTravelAdventure.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(favoriteAdventureTrip.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travel = action.payload.travel;
      })

      .addCase(favoriteAdventureTrip.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(getFavoriteAdventure.pending, (state) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(getFavoriteAdventure.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travels = action.payload.travels;
      })

      .addCase(getFavoriteAdventure.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(bookedAdventure.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travel = action.payload.travel;
      })

      .addCase(bookedAdventure.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(getUserAdventureTrip.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getUserAdventureTrip.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.travels = action.payload.travels;
      })

      .addCase(getUserAdventureTrip.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
  },
});

export const { favoriteTrip } = travelSlice.actions;

export const travelState = (state) => state.travel;

export default travelSlice.reducer;
