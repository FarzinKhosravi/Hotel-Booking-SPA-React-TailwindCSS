import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Map from "./../Map/Map";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterHotels } from "../../features/hotels/hotelsSlice";
import Message from "../../common/Message";
import nothingImage from "../../assets/images/nothingImg.png";
import Loader from "./../Loader";
import separator from "../../assets/images/separator.png";

function Hotels() {
  const { hotelId } = useParams();
  const location = useLocation();

  const hotelsData = location.state;

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { hotels } = useSelector((state) => state.hotels);

  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const number = JSON.parse(searchParams.get("number"));
  const date = JSON.parse(searchParams.get("date"));

  useEffect(() => {
    if (location.pathname === "/hotels-results") {
      dispatch(filterHotels({ destination, number, date, hotelsData }));

      setLoading(false);
    }
  }, [hotelsData]);

  console.log("render Hotels Component...");

  return (
    <section className="px-4">
      {loading && location.pathname === "/hotels-results" ? (
        <Loader />
      ) : !hotels?.length && location.pathname === "/hotels-results" ? (
        <Message>
          <img
            className="ml-1 block w-32"
            src={nothingImage}
            alt="nothingImage"
          />
        </Message>
      ) : (
        <div className="mb-4 flex min-h-screen flex-col lg:h-[calc(100vh-160px)] lg:min-h-0 lg:flex-row-reverse lg:items-stretch lg:justify-between">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <Map />
          </div>

          <div className="mb-8 flex items-center justify-center lg:hidden">
            <img className="block w-48" src={separator} alt="separator" />
          </div>

          <div
            className={`scrollbarStyle overflow-y-auto rounded-xl lg:w-1/2 lg:pr-4 ${
              location.pathname === `/hotels-results/${hotelId}`
                ? "pr-0"
                : "pr-4"
            }`}
          >
            <Outlet />
          </div>
        </div>
      )}
    </section>
  );
}

export default Hotels;
