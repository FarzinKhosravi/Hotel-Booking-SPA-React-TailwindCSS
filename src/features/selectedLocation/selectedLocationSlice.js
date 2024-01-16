import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_LOCATION_DATA_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const getAsyncSelectedLocation = createAsyncThunk(
  "selectedLocation/getAsyncSelectedLocation",
  async (payload, { rejectWithValue }) => {
    try {
      const { latitude, longitude, price, locationName } = payload;

      const { data: locationData } = await axios.get(
        `${BASE_LOCATION_DATA_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      return { ...locationData, price, locationName };
    } catch (error) {
      toast.error(`The Page Not Available 🧐`);

      return rejectWithValue({
        title: "Not Available",
        description: "The Page You are Looking for Not Available!",
      });
    }
  }
);

const initialState = {
  loading: false,
  selectedLocation: null,
  error: null,
};

const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncSelectedLocation.pending, (state) => {
        state.loading = true;
        state.selectedLocation = null;
        state.error = null;
      })
      .addCase(getAsyncSelectedLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLocation = action.payload;
        state.error = null;
      })
      .addCase(getAsyncSelectedLocation.rejected, (state, action) => {
        state.loading = false;
        state.selectedLocation = null;
        state.error = action.payload;
      });
  },
});

export default selectedLocationSlice.reducer;
