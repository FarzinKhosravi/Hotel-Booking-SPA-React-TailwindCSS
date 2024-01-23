import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import getBookmarkDetail from "../services/getBookmarkDetailService";

const initialState = {
  loading: false,
  bookmarkDetail: null,
};

const bookmarkDetailReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };

    case "BOOKMARK_DETAIL":
      return { ...state, loading: false, bookmarkDetail: action.payload };

    default:
      return state;
  }
};

export default function useBookmarkDetail() {
  const { bookmarkId } = useParams();

  const [bookmarkDetail, dispatch] = useReducer(
    bookmarkDetailReducer,
    initialState
  );

  useEffect(() => {
    const fetchBookmarkDetail = async () => {
      try {
        dispatch({ type: "LOADING" });

        const { data: bookmarkDetailData } =
          await getBookmarkDetail(bookmarkId);

        console.log("bookmarkDetailData:", bookmarkDetailData);

        dispatch({ type: "BOOKMARK_DETAIL", payload: bookmarkDetailData });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBookmarkDetail();
  }, [bookmarkId]);

  return bookmarkDetail;
}
