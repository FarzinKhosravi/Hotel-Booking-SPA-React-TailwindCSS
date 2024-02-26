import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getHotels from "../../services/getHotelsService";
import getLocalStorage from "../../localStorage/getLocalStorage";
import saveLocalStorage from "../../localStorage/saveLocalStorage";

const HOTELS_RESERVED_LIST = "HOTELS_RESERVED_LIST";

const HOTELS = "HOTELS";

export const getAsyncHotels = createAsyncThunk(
  "hotels/getAsyncHotels",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getHotels();

      saveLocalStorage(HOTELS, data);

      return data;
    } catch (error) {
      toast.error(`Not Found List of Hotels 🧐`);

      return rejectWithValue({
        title: "ERROR",
        description: "The Page You are Looking for Not Available!",
      });
    }
  }
);

const initialState = {
  loading: false,
  hotels: getLocalStorage(HOTELS_RESERVED_LIST) || getLocalStorage(HOTELS),
  error: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    filterHotels: (state, action) => {
      const { hotelsData, destination, date, number } = action.payload;

      const filteredHotels = hotelsData.filter((hotel) => {
        return (
          hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.accommodates >= Number(number.rooms) ||
          hotel.number_of_adult >= Number(number.adult) ||
          hotel.number_of_children >= Number(number.children) ||
          (date[0].startDate >= hotel.duration_of_stay.startDate &&
            hotel.duration_of_stay.endDate >= date[0].endDate)
        );
      });

      state.hotels = filteredHotels;
    },

    createHotelsListReserved: (state, action) => {
      state.hotels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncHotels.pending, (state) => {
        state.loading = true;
        state.hotels = null;
        state.error = null;
      })
      .addCase(getAsyncHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
        state.error = null;
      })
      .addCase(getAsyncHotels.rejected, (state, action) => {
        state.loading = false;
        state.hotels = null;
        state.error = action.payload;
      });
  },
});

export const { filterHotels, createHotelsListReserved } = hotelsSlice.actions;

export default hotelsSlice.reducer;
