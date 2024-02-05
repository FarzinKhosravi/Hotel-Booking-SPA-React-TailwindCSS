import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "./../../localStorage/getLocalStorage";

const USER_DATA = "USER_DATA";

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: {
    loggedInUser: getLocalStorage(USER_DATA) || null,
  },

  reducers: {
    createLoggedInUserData: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { createLoggedInUserData } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
