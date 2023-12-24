import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
});

export default store;
