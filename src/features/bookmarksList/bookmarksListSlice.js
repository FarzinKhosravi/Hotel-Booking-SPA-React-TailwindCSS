import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getBookmarksList from "./../../services/getBookmarksListService";

export const getAsyncBookmarksList = createAsyncThunk(
  "bookmarksList/getAsyncBookmarksList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getBookmarksList();

      return data;
    } catch (error) {
      toast.error(`404 ERROR 🧐`);

      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  bookmarksList: null,
  error: null,
};

const bookmarksListSlice = createSlice({
  name: "bookmarksList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncBookmarksList.pending, (state) => {
        state.loading = true;
        state.bookmarksList = null;
        state.error = null;
      })
      .addCase(getAsyncBookmarksList.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarksList = action.payload;
        state.error = null;
      })
      .addCase(getAsyncBookmarksList.rejected, (state, action) => {
        state.loading = false;
        state.bookmarksList = null;
        state.error = action.payload;
      });
  },
});

export default bookmarksListSlice.reducer;
