import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getBookmarksList from "./../../services/getBookmarksListService";
import removeBookmark from "./../../services/removeBookmarkService";
import createBookmark from "../../services/createBookmarkService";

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

export const removeAsyncBookmark = createAsyncThunk(
  "bookmarksList/removeAsyncBookmark",
  async (bookmarkId, { rejectWithValue }) => {
    try {
      await removeBookmark(bookmarkId);

      const { data: updatedBookmarksList } = await getBookmarksList();

      console.log("updatedBookmarksList:", updatedBookmarksList);

      return updatedBookmarksList;
    } catch (error) {
      toast.error(`404 ERROR 🧐`);

      return rejectWithValue(error.message);
    }
  }
);

export const postAsyncBookmark = createAsyncThunk(
  "bookmarksList/postAsyncBookmark",
  async (payload, { rejectWithValue }) => {
    try {
      const { data: createdBookmark } = await createBookmark(payload);

      return createdBookmark;
    } catch (error) {
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
      })
      .addCase(removeAsyncBookmark.pending, (state) => {
        state.loading = true;
        state.bookmarksList = null;
        state.error = null;
      })
      .addCase(removeAsyncBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarksList = action.payload;
        state.error = null;
      })
      .addCase(removeAsyncBookmark.rejected, (state, action) => {
        state.loading = false;
        state.bookmarksList = null;
        state.error = action.payload;
      })
      .addCase(postAsyncBookmark.fulfilled, (state, action) => {
        state.bookmarksList = state.bookmarksList?.push(action.payload);
      });
  },
});

export default bookmarksListSlice.reducer;
