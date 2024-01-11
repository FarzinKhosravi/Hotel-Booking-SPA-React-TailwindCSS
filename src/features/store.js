import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";
import currentHotelReducer from "./currentHotel/currentHotelSlice";
import bookmarksListReducer from "./bookmarksList/bookmarksListSlice";
import currentBookmarkReducer from "./currentBookmark/currentBookmarkSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    currentHotel: currentHotelReducer,
    bookmarksList: bookmarksListReducer,
    currentBookmark: currentBookmarkReducer,
  },
});

export default store;
