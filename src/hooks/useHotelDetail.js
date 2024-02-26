import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import getHotelDetail from "../services/getHotelDetailService";

const initialState = {
  loading: false,
  hotelDetail: null,
};

const hotelDetailReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };

    case "HOTEL_DETAIL":
      return { ...state, loading: false, hotelDetail: action.payload };

    default:
      return state;
  }
};

export default function useHotelDetail() {
  const { hotelId } = useParams();

  const [hotelDetail, dispatch] = useReducer(hotelDetailReducer, initialState);

  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        dispatch({ type: "LOADING" });

        const { data: hotelDetailData } = await getHotelDetail(hotelId);

        console.log("hotelDetailData:", hotelDetailData);

        dispatch({ type: "HOTEL_DETAIL", payload: hotelDetailData });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchHotelDetail();
  }, [hotelId]);

  return hotelDetail;
}
