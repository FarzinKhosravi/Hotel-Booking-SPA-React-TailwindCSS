import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";
import currentHotelReducer from "./currentHotel/currentHotelSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    currentHotel: currentHotelReducer,
  },
});

export default store;
