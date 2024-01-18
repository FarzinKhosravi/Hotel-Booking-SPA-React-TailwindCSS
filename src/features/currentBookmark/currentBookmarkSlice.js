import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "./../../localStorage/getLocalStorage";

const CURRENT_BOOKMARK = "CURRENT_BOOKMARK";

const currentBookmarkSlice = createSlice({
  name: "currentBookmark",
  initialState: {
    currentBookmark: getLocalStorage(CURRENT_BOOKMARK) || null,
  },

  reducers: {
    createCurrentBookmark: (state, action) => {
      state.currentBookmark = action.payload;
    },
  },
});

export const { createCurrentBookmark } = currentBookmarkSlice.actions;

export default currentBookmarkSlice.reducer;
