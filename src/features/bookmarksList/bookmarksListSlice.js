import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getBookmarksList from "./../../services/getBookmarksListService";
import removeBookmark from "./../../services/removeBookmarkService";
import createBookmark from "../../services/createBookmarkService";
import updateBookmark from "../../services/updateBookmarkService";

export const getAsyncBookmarksList = createAsyncThunk(
  "bookmarksList/getAsyncBookmarksList",
  async (payload, { rejectWithValue }) => {
    try {
      const { loggedInUser } = payload;

      // *** Convert to createUserBookmarks Function ***

      const { data: bookmarksList } = await getBookmarksList();

      console.log("bookmarksList:", bookmarksList);

      const userBookmarksList = bookmarksList.filter(
        (bookmark) => bookmark.user.username === loggedInUser.username
      );

      console.log("USER_BOOKMARKS_SLICE:", userBookmarksList);

      return userBookmarksList;
    } catch (error) {
      toast.error(`404 ERROR 🧐`);

      return rejectWithValue(error.message);
    }
  }
);

export const removeAsyncBookmark = createAsyncThunk(
  "bookmarksList/removeAsyncBookmark",
  async (payload, { rejectWithValue }) => {
    try {
      const { bookmarkId, loggedInUser } = payload;

      await removeBookmark(bookmarkId);

      // *** Convert to createUserBookmarks Function ***

      const { data: bookmarksList } = await getBookmarksList();

      console.log("bookmarksList:", bookmarksList);

      const userBookmarksList = bookmarksList.filter(
        (bookmark) => bookmark.user.username === loggedInUser.username
      );

      console.log("USER_BOOKMARKS_SLICE:", userBookmarksList);

      return userBookmarksList;
    } catch (error) {
      toast.error(`404 ERROR 🧐`);

      return rejectWithValue(error.message);
    }
  }
);

export const createAsyncBookmark = createAsyncThunk(
  "bookmarksList/createAsyncBookmark",
  async (payload, { rejectWithValue }) => {
    try {
      const { userBookmark, loggedInUser } = payload;

      await createBookmark(userBookmark);

      // *** Convert to createUserBookmarks Function ***

      const { data: updatedBookmarksList } = await getBookmarksList();

      console.log("updatedBookmarksList:", updatedBookmarksList);

      const userBookmarksList = updatedBookmarksList.filter(
        (bookmark) => bookmark.user.username === loggedInUser.username
      );

      console.log("USER_BOOKMARKS_SLICE:", userBookmarksList);

      return userBookmarksList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAsyncBookmark = createAsyncThunk(
  "bookmarksList/updateAsyncBookmark",
  async (payload, { rejectWithValue }) => {
    try {
      const { updatedBookmarkId, updatedBookmark, loggedInUser } = payload;

      await updateBookmark(updatedBookmarkId, updatedBookmark);

      // *** Convert to createUserBookmarks Function ***

      const { data: bookmarksList } = await getBookmarksList();

      console.log("bookmarksList:", bookmarksList);

      const userBookmarksList = bookmarksList.filter(
        (bookmark) => bookmark.user.username === loggedInUser.username
      );

      console.log("USER_BOOKMARKS_SLICE:", userBookmarksList);

      return userBookmarksList;
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
      .addCase(createAsyncBookmark.fulfilled, (state, action) => {
        state.bookmarksList = action.payload;
      })
      .addCase(updateAsyncBookmark.fulfilled, (state, action) => {
        state.bookmarksList = action.payload;
      });
  },
});

export default bookmarksListSlice.reducer;
