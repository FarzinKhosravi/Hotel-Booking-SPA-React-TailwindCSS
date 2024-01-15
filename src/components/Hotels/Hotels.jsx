import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Map from "./../Map/Map";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterHotels } from "../../features/hotels/hotelsSlice";
import Message from "../../common/Message";
import nothingImage from "../../assets/images/nothingImg.png";

function Hotels() {
  const { hotelId } = useParams();
  const location = useLocation();

  const hotelsData = location.state;

  const dispatch = useDispatch();

  const { hotels } = useSelector((state) => state.hotels);

  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const number = JSON.parse(searchParams.get("number"));
  const date = JSON.parse(searchParams.get("date"));

  console.log("hotelsData:", hotelsData);

  console.log("location:", location.pathname);

  useEffect(() => {
    if (location.pathname === "/hotels-results")
      dispatch(filterHotels({ destination, number, date, hotelsData }));
  }, []);

  console.log("render Hotels Component...");

  return (
    <section className="px-4">
      {!hotels?.length && location.pathname === "/hotels-results" ? (
        <Message>
          <img
            className="ml-1 block w-32"
            src={nothingImage}
            alt="nothingImage"
          />
        </Message>
      ) : (
        <div className="flex min-h-screen flex-col lg:h-[calc(100vh-160px)] lg:min-h-0 lg:flex-row-reverse lg:items-stretch lg:justify-between">
          <div className="mb-16 lg:mb-0 lg:w-1/2">
            <Map />
          </div>
          <div
            className={`scrollbarStyle overflow-y-auto lg:w-1/2 lg:pr-4 ${
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
