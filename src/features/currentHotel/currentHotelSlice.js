import { createSlice } from "@reduxjs/toolkit";

const currentHotelSlice = createSlice({
  name: "currentHotel",
  initialState: {
    currentHotel: null,
  },

  reducers: {
    createCurrentHotel: (state, action) => {
      state.currentHotel = action.payload;
    },
  },
});

export const { createCurrentHotel } = currentHotelSlice.actions;

export default currentHotelSlice.reducer;
