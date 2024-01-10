import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";
import currentHotelReducer from "./currentHotel/currentHotelSlice";
import bookmarksListReducer from "./bookmarksList/bookmarksListSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    currentHotel: currentHotelReducer,
    bookmarksList: bookmarksListReducer,
  },
});

export default store;
