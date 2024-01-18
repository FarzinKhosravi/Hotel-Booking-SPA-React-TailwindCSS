import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "./../../localStorage/getLocalStorage";

const CURRENT_HOTEL = "CURRENT_HOTEL";

const currentHotelSlice = createSlice({
  name: "currentHotel",
  initialState: {
    currentHotel: getLocalStorage(CURRENT_HOTEL) || null,
  },

  reducers: {
    createCurrentHotel: (state, action) => {
      state.currentHotel = action.payload;
    },
  },
});

export const { createCurrentHotel } = currentHotelSlice.actions;

export default currentHotelSlice.reducer;
