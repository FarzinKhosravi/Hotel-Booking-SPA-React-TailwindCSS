import {
  MapPinIcon,
  UserGroupIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import pointerHotelsPage from "../assets/images/pointerHotelsPage.png";
import { useEffect, useReducer, useState } from "react";
import Loader from "./../components/Loader";
import ReactCountryFlag from "react-country-flag";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncHotels } from "../features/hotels/hotelsSlice";
import AmenitiesIcons from "../common/AmenitiesIcons";
import Message from "../common/Message";

const initialState = {
  destination: "",
  number: {
    adult: 1,
    children: 0,
    rooms: 1,
  },
  date: null,
};

const hotelSpecsReducer = (state, action) => {
  switch (action.type) {
    case "destination":
      return { ...state, destination: action.payload };

    case "number":
      return {
        ...state,
        number: {
          ...state.number,
          [action.payload.name]:
            action.payload.value === "increment"
              ? (state.number[action.payload.name] += 1)
              : (state.number[action.payload.name] -= 1),
        },
      };

    case "date":
      return { ...state, date: action.payload };

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
};

function HotelsPage() {
  const [hotelSpecs, hotelSpecsDispatch] = useReducer(
    hotelSpecsReducer,
    initialState
  );

  const [isValidDestination, setIsValidDestination] = useState(true);

  const dispatch = useDispatch();
  const { loading, hotels, error } = useSelector((state) => state.hotels);

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAsyncHotels());
  }, []);

  useEffect(() => {
    hotelSpecsDispatch({ type: "date", payload: calendar });
  }, [calendar]);

  const filterHotelsHandler = () => {
    if (!hotelSpecs.destination) {
      toast.error("Please Enter Destination 🧐");

      setIsValidDestination(false);

      return;
    }

    setIsValidDestination(true);

    const encodedParams = createSearchParams({
      destination: hotelSpecs.destination,
      number: JSON.stringify(hotelSpecs.number),
      date: JSON.stringify(hotelSpecs.date),
      mapTitle: "Hotels List",
    });
    navigate(
      {
        pathname: "/hotels-results",
        search: encodedParams.toString(),
      },
      { state: hotels }
    );
  };

  const hotelReserveHandler = (e) => {
    e.preventDefault();

    console.log("invoked hotel reservation !!");
  };

  console.log("calendar:", calendar);

  console.log("hotelSpecs:", hotelSpecs);

  return (
    <section className="min-h-screen px-4">
      <div>
        {error && !hotels ? (
          <Message message={error}>
            <span className="block">
              <ExclamationTriangleIcon className="h-20 w-20 text-red-700" />
            </span>
          </Message>
        ) : (
          <div className="flex flex-col">
            {/* Filter of Hotels */}
            <div className="mb-6">
              {/* Filter Title */}
              <div className="mb-2 pl-1">
                <h2 className="bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-lg font-semibold text-transparent">
                  Go Find Your Hotel :
                </h2>
              </div>

              {/* Filter Main Section */}
              <div className="rounded-xl bg-slate-200 p-4 shadow-lg">
                {/* Search Box */}
                <div className="mb-6">
                  <div className="mb-3 flex justify-start">
                    <div>
                      <MapPinIcon className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h3 className="ml-1 bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text font-semibold text-transparent">
                      Which City Do You Want a Hotel ?
                    </h3>
                  </div>

                  <div className="w-full">
                    <input
                      onChange={(event) =>
                        hotelSpecsDispatch({
                          type: "destination",
                          payload: event.target.value,
                        })
                      }
                      value={hotelSpecs.destination}
                      className={`block w-full rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 text-base text-emerald-900 shadow-lg placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text ${
                        isValidDestination || hotelSpecs.destination
                          ? ""
                          : "border-2 border-red-600 placeholder:text-red-800"
                      }`}
                      type="text"
                      placeholder="Search Your Favorite Destination..."
                    />
                  </div>
                </div>
                {/* Date Box */}
                <div className="mb-6">
                  <div className="mb-3 flex justify-start">
                    <div>
                      <CalendarIcon className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h3 className="ml-1 bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text font-semibold text-transparent">
                      How Long is Your Stay ?
                    </h3>
                  </div>

                  <div className="relative flex w-full flex-col items-center justify-center">
                    <div
                      onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                      className="w-full rounded-2xl bg-slate-100 shadow-lg"
                    >
                      <div className="mx-auto flex w-full max-w-[256px] items-center justify-around px-4 py-2 font-semibold">
                        <span className="text-emerald-700">{`${format(
                          calendar[0].startDate,
                          "MM/dd/yyyy"
                        )}`}</span>

                        <span className="text-emerald-700">To</span>

                        <span className="text-emerald-700">{`${format(
                          calendar[0].endDate,
                          "MM/dd/yyyy"
                        )}`}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      {isOpenCalendar && (
                        <DateRange
                          onChange={(item) => setCalendar([item.selection])}
                          ranges={calendar}
                          minDate={new Date()}
                          moveRangeOnFirstSelection={true}
                          className="overflow-hidden rounded-xl text-[0.6rem] shadow-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* Number Box */}
                <div className="mb-12">
                  <div className="mb-6 flex justify-start">
                    <div>
                      <UserGroupIcon className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h3 className="ml-1 bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text font-semibold text-transparent">
                      Determine the Number of People and Your Rooms :
                    </h3>
                  </div>

                  {/* Buttons Container*/}
                  <div className="w-full">
                    {/* Adult Button */}
                    <div className="mb-8 flex flex-col">
                      <div className="mb-2 inline-flex">
                        <span>
                          <img
                            src={pointerHotelsPage}
                            className="h-3 w-3"
                            alt="pointer-hotels-page"
                          />
                        </span>
                        <span className="ml-1 text-base font-semibold text-emerald-500">
                          Adult
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex">
                          <button
                            disabled={
                              hotelSpecs.number.adult === 1 ? true : false
                            }
                            name="adult"
                            value="decrement"
                            onClick={(event) =>
                              hotelSpecsDispatch({
                                type: "number",
                                payload: {
                                  name: event.target.name,
                                  value: event.target.value,
                                },
                              })
                            }
                            className="block rounded-full bg-white px-4 text-red-600  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              data-slot="icon"
                              className="pointer-events-none h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <span className="ml-4 text-lg font-semibold">
                            {hotelSpecs.number.adult}
                          </span>
                          <button
                            name="adult"
                            value="increment"
                            onClick={(event) =>
                              hotelSpecsDispatch({
                                type: "number",
                                payload: {
                                  name: event.target.name,
                                  value: event.target.value,
                                },
                              })
                            }
                            className="ml-4 block rounded-full bg-white px-4  text-emerald-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              data-slot="icon"
                              className="pointer-events-none h-5 w-5"
                            >
                              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Children Button */}
                    <div className="mb-8 flex flex-col">
                      <div className="mb-2 inline-flex">
                        <span>
                          <img
                            src={pointerHotelsPage}
                            className="h-3 w-3"
                            alt="pointer-hotels-page"
                          />
                        </span>
                        <span className="ml-1 text-base font-semibold text-emerald-500">
                          Children
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex">
                          <button
                            disabled={
                              hotelSpecs.number.children === 0 ? true : false
                            }
                            name="children"
                            value="decrement"
                            onClick={(event) =>
                              hotelSpecsDispatch({
                                type: "number",
                                payload: {
                                  name: event.target.name,
                                  value: event.target.value,
                                },
                              })
                            }
                            className="block rounded-full bg-white px-4 text-red-600  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              data-slot="icon"
                              className="pointer-events-none h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <span className="ml-4 text-lg font-semibold">
                            {hotelSpecs.number.children}
                          </span>
                          <button
                            name="children"
                            value="increment"
                            onClick={(event) =>
                              hotelSpecsDispatch({
                                type: "number",
                                payload: {
                                  name: event.target.name,
                                  value: event.target.value,
                                },
                              })
                            }
                            className="ml-4 block rounded-full bg-white px-4  text-emerald-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              data-slot="icon"
                              className="pointer-events-none h-5 w-5"
                            >
                              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Rooms Button */}
                    <div className="flex flex-col">
                      <div className="mb-2 inline-flex">
                        <span>
                          <img
                            src={pointerHotelsPage}
                            className="h-3 w-3"
                            alt="pointer-hotels-page"
                          />
                        </span>
                        <span className="ml-1 text-base font-semibold text-emerald-500">
                          Rooms
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex">
                          <button
                            disabled={
                              hotelSpecs.number.rooms === 1 ? true : false
                            }
                            name="rooms"
                            value="decrement"
                            onClick={(event) =>
                              hotelSpecsDispatch({
                                type: "number",
                                payload: {
                                  name: event.target.name,
                                  value: event.target.value,
                                },
                              })
                            }
                            className="block rounded-full bg-white px-4 text-red-600  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              data-slot="icon"
                              className="pointer-events-none h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <span className="ml-4 text-lg font-semibold">
                            {hotelSpecs.number.rooms}
                          </span>
                          <button
                            name="rooms"
                            value="increment"
                            onClick={(event) =>
                              hotelSpecsDispatch({
                                type: "number",
                                payload: {
                                  name: event.target.name,
                                  value: event.target.value,
                                },
                              })
                            }
                            className="ml-4 block rounded-full bg-white px-4  text-emerald-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              data-slot="icon"
                              className="pointer-events-none h-5 w-5"
                            >
                              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Search Button */}
                <div>
                  <button
                    onClick={filterHotelsHandler}
                    className="block w-full rounded-xl bg-emerald-700 px-4 py-2 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white">Search</span>
                      </div>
                      <div className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* List of Hotels */}
            <div>
              {/* Hotel Section Title */}
              <div className="mb-2 pl-1">
                <h2 className="bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-lg font-semibold text-transparent">
                  Book Your Favorite Hotel :
                </h2>
              </div>

              {/* Hotels Container */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {loading && !hotels ? (
                  <Loader />
                ) : (
                  hotels?.map((hotel) => {
                    return (
                      <Link
                        key={hotel.id}
                        to={`/hotels-results/${hotel.id}?lat=${
                          hotel.latitude
                        }&lng=${hotel.longitude}&hostLocation=${
                          hotel.host_location
                        }&mapTitle=${`${hotel.name.slice(0, 5)} Hotel`}`}
                      >
                        <div className="flex flex-col justify-between rounded-xl bg-slate-200 p-4 shadow-lg">
                          {/* Hotel Image */}
                          <div className="relative mb-4 overflow-hidden rounded-xl">
                            <div>
                              <img
                                className="h-44 w-full"
                                src={hotel.picture_url.url}
                                alt={hotel.name}
                              />
                            </div>
                            <div className="absolute top-2 flex w-full items-center justify-between px-2">
                              <div className="flex items-center rounded-xl bg-white px-2">
                                <span className="block text-red-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-slot="icon"
                                    className="h-5 w-5"
                                  >
                                    <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                                  </svg>
                                </span>
                                <span className="ml-1 font-semibold text-emerald-700">
                                  10
                                </span>
                              </div>
                              <div className="flex items-center rounded-xl bg-white px-2">
                                <span className="block text-yellow-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    data-slot="icon"
                                    className="h-5 w-5"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-1 font-semibold text-emerald-700">
                                  20
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Hotel Name */}
                          <div className="mb-4 text-center">
                            <span className="font-Parisienne text-lg font-semibold capitalize italic text-emerald-700">
                              {hotel.name}
                            </span>
                          </div>

                          {/* Hotel Location */}
                          <div className="mb-8 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="font-semibold text-emerald-700">
                                {hotel.smart_location.split(",")[1].trim()}
                              </span>
                              <span>
                                <ReactCountryFlag
                                  svg
                                  countryCode={hotel.country_code}
                                  className="text-lg"
                                />
                              </span>
                            </div>
                            <span className="block">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-slot="icon"
                                className="h-5 w-5"
                              >
                                <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                              </svg>
                            </span>
                            <div className="flex flex-col">
                              <span className="font-semibold text-emerald-700">
                                {hotel.state}
                              </span>
                              <span className="font-semibold text-emerald-700">
                                {hotel.smart_location.split(",")[0]}
                              </span>
                            </div>
                          </div>

                          {/* Hotel Amenities */}
                          <div className="mb-12 flex items-center justify-between">
                            {hotel.amenities.map((item, index) => {
                              return <AmenitiesIcons key={index} item={item} />;
                            })}
                          </div>

                          {/* Hotel Booking Button */}
                          <div>
                            <button
                              onClick={hotelReserveHandler}
                              className="block w-full rounded-xl bg-emerald-700 px-4 py-2 shadow-lg"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-semibold text-slate-200">
                                    BOOK
                                  </span>
                                </div>
                                <div className="inline-flex items-center">
                                  <span className="mr-1 block text-slate-200">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      data-slot="icon"
                                      className="h-5 w-5"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.732 6.232a2.5 2.5 0 0 1 3.536 0 .75.75 0 1 0 1.06-1.06A4 4 0 0 0 6.5 8v.165c0 .364.034.728.1 1.085h-.35a.75.75 0 0 0 0 1.5h.737a5.25 5.25 0 0 1-.367 3.072l-.055.123a.75.75 0 0 0 .848 1.037l1.272-.283a3.493 3.493 0 0 1 1.604.021 4.992 4.992 0 0 0 2.422 0l.97-.242a.75.75 0 0 0-.363-1.456l-.971.243a3.491 3.491 0 0 1-1.694 0 4.992 4.992 0 0 0-2.258-.038c.19-.811.227-1.651.111-2.477H9.75a.75.75 0 0 0 0-1.5H8.136A4.397 4.397 0 0 1 8 8.165V8c0-.641.244-1.28.732-1.768Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  <span className="mr-1 text-lg font-semibold text-slate-200">
                                    {hotel.price}
                                  </span>
                                  <span className="font-semibold text-slate-200">
                                    Night
                                  </span>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HotelsPage;
