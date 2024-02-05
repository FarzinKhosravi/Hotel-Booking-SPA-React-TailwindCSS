import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";
import currentHotelReducer from "./currentHotel/currentHotelSlice";
import bookmarksListReducer from "./bookmarksList/bookmarksListSlice";
import currentBookmarkReducer from "./currentBookmark/currentBookmarkSlice";
import selectedLocationReducer from "./selectedLocation/selectedLocationSlice";
import loggedInUserReducer from "./loggedInUser/loggedInUserSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    currentHotel: currentHotelReducer,
    bookmarksList: bookmarksListReducer,
    currentBookmark: currentBookmarkReducer,
    selectedLocation: selectedLocationReducer,
    loggedInUser: loggedInUserReducer,
  },
});

export default store;
