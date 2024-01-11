import { createSlice } from "@reduxjs/toolkit";

const currentBookmarkSlice = createSlice({
  name: "currentBookmark",
  initialState: {
    currentBookmark: null,
  },

  reducers: {
    createCurrentBookmark: (state, action) => {
      state.currentBookmark = action.payload;
    },
  },
});

export const { createCurrentBookmark } = currentBookmarkSlice.actions;

export default currentBookmarkSlice.reducer;
