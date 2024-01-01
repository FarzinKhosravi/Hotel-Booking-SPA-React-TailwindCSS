import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getHotels from "../../services/getHotelsService";

export const getAsyncHotels = createAsyncThunk(
  "hotels/getAsyncHotels",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getHotels();

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
      const { hotelsData, destination, number } = action.payload;

      const filteredHotels = hotelsData.filter((hotel) => {
        return (
          hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.accommodates >= Number(number.rooms) ||
          hotel.number_of_adult >= Number(number.adult) ||
          hotel.number_of_children >= Number(number.children)
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
