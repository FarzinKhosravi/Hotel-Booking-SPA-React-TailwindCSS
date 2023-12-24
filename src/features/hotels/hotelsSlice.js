import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getAsyncHotels = createAsyncThunk(
  "hotels/getAsyncHotels",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/hotels");

      return data;
    } catch (error) {
      toast.error(`404 ERROR 🧐`);

      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  hotels: null,
  error: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    filterHotels: (state, action) => {
      const { hotelsData, destination, rooms } = action.payload;

      const filteredHotels = hotelsData.filter((hotel) => {
        return (
          hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.accommodates >= Number(rooms)
        );
      });

      state.hotels = filteredHotels;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncHotels.pending, (state) => {
        state.loading = true;
        state.hotels = null;
        state.error = "";
      })
      .addCase(getAsyncHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
        state.error = "";
      })
      .addCase(getAsyncHotels.rejected, (state, action) => {
        state.loading = false;
        state.hotels = null;
        state.error = action.payload;
      });
  },
});

export const { filterHotels } = hotelsSlice.actions;

export default hotelsSlice.reducer;
