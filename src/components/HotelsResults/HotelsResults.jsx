import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import AmenitiesIcons from "./../../common/AmenitiesIcons";

function HotelsResults() {
  const { hotels } = useSelector((state) => state.hotels);

  const { currentHotel } = useSelector((state) => state.currentHotel);

  const hotelReserveHandler = (e) => {
    e.preventDefault();

    console.log("invoked hotel reservation !!");
  };

  console.log("hotels:", hotels);

  return (
    <div className="h-screen">
      <div>
        {/* Search Results Section */}
        <div className="mb-4 px-1">
          <div className="flex items-center justify-between">
            <div className="flex">
              <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                Search Results
              </span>
              <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold shadow-md">
                {hotels?.length}
              </span>
            </div>
            <div>
              <span>📍</span>
            </div>
          </div>
        </div>

        {/* Container of Filtered Hotels */}
        <div className="flex flex-col gap-y-8">
          {hotels?.map((hotel) => {
            return (
              <Link
                key={hotel.id}
                to={`/hotels-results/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}&hostLocation=${hotel.host_location}`}
              >
                {/*  // Filtered Hotel : */}
                <div
                  className={`flex flex-col rounded-xl bg-slate-200 p-4 shadow-lg ${
                    hotel.id === currentHotel?.id
                      ? "border-4 border-emerald-700"
                      : ""
                  }`}
                >
                  {/* Top Section */}
                  <div className="mb-8 flex flex-col sm:mb-4 sm:flex sm:flex-row sm:justify-start">
                    {/* Hotel Image */}
                    <div className="relative mb-4 overflow-hidden rounded-xl sm:mb-0">
                      <div>
                        <img
                          className="h-44 w-full sm:w-44"
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

                    {/* Hotel Specs */}
                    <div className="flex flex-col sm:ml-4 sm:justify-around">
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
                        <span className="block sm:ml-3">
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
                        <div className="flex flex-col sm:ml-3">
                          <span className="font-semibold text-emerald-700">
                            {hotel.state}
                          </span>
                          <span className="font-semibold text-emerald-700">
                            {hotel.smart_location.split(",")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Hotel Amenities */}
                      <div className="flex items-center justify-between">
                        {hotel.amenities.map((item, index) => {
                          return <AmenitiesIcons key={index} item={item} />;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Down Section */}
                  <div>
                    {/* Hotel Button */}
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
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HotelsResults;
