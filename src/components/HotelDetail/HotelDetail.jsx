import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import AmenitiesIcons from "../../common/AmenitiesIcons";
import { useDispatch, useSelector } from "react-redux";
import { createCurrentHotel } from "../../features/currentHotel/currentHotelSlice";
import BackButton from "./../../common/BackButton";
import saveLocalStorage from "./../../localStorage/saveLocalStorage";
import useHotelDetail from "./../../hooks/useHotelDetail";
import Loader from "../Loader";
import { useNavigate, useSearchParams } from "react-router-dom";

const CURRENT_HOTEL = "CURRENT_HOTEL";

function HotelDetail() {
  const [accordion, setAccordion] = useState(null);

  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const { loading, hotelDetail } = useHotelDetail();

  const [searchParams] = useSearchParams();

  const isReservedHotel = searchParams.get("isReservedHotel") === "true";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(createCurrentHotel(hotelDetail));

    saveLocalStorage(CURRENT_HOTEL, hotelDetail);
  }, [hotelDetail]);

  const hotelReserveHandler = (e, id) => {
    e.preventDefault();

    navigate(
      `${
        loggedInUser
          ? `/hotel-booking/${id}`
          : `/login?redirect=listOrForm&hotelId=${id}`
      } `
    );

    console.log("invoked hotel reservation !!");
  };

  const accordionHandler = (e) => {
    const accordionId = e.target.dataset.id;

    setAccordion(
      accordion === Number(accordionId) ? null : Number(accordionId)
    );
  };

  console.log(hotelDetail);

  console.log("isReservedHotel:::", isReservedHotel);

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="mx-auto md:max-w-screen-md">
            {/* Hotel Name Section */}
            <div className="mb-4 px-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold capitalize italic">
                    {hotelDetail?.name}
                  </span>
                </div>
                <div>
                  <BackButton />
                </div>
              </div>
            </div>

            {/* Hotel Detail */}
            <div className="flex flex-col justify-between rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-slate-800">
              {/* Hotel Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <div>
                  <img
                    className="h-44 w-full"
                    src={hotelDetail?.picture_url.url}
                    alt={hotelDetail?.name}
                  />
                </div>

                <div className="absolute top-2 flex w-full items-center justify-between px-2">
                  <div className="flex items-center rounded-xl bg-white px-2 dark:bg-slate-700">
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
                    <span className="ml-1 font-semibold text-emerald-700 dark:text-white">
                      10
                    </span>
                  </div>
                  <div className="flex items-center rounded-xl bg-white px-2 dark:bg-slate-700">
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
                    <span className="ml-1 font-semibold text-emerald-700 dark:text-white">
                      20
                    </span>
                  </div>
                </div>
              </div>

              {/* Hotel Name */}
              <div className="mb-8 text-center">
                <span className="text-lg font-semibold italic text-emerald-700 dark:text-white">
                  {hotelDetail?.name}
                </span>
              </div>

              {/* Hotel Location */}
              <div className="mb-12 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-emerald-700 dark:text-white">
                    {hotelDetail?.smart_location.split(",")[1].trim()}
                  </span>
                  <span>
                    <ReactCountryFlag
                      svg
                      countryCode={hotelDetail?.country_code}
                      className="text-lg"
                    />
                  </span>
                </div>
                <span className="block dark:text-white">
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
                  <span className="font-semibold text-emerald-700 dark:text-white">
                    {hotelDetail?.state}
                  </span>
                  <span className="font-semibold text-emerald-700 dark:text-white">
                    {hotelDetail?.smart_location.split(",")[0]}
                  </span>
                </div>
              </div>

              {/* Hotel Amenities */}
              <div className="mb-16 flex items-center justify-between">
                {hotelDetail?.amenities.map((item, index) => {
                  return <AmenitiesIcons key={index} item={item} />;
                })}
              </div>

              {/* Accordions */}
              <div className="mb-16">
                {/* Top Section */}
                <div className="mb-4 px-2">
                  <div className="flex items-center justify-start">
                    <div>
                      <span className="block text-lg font-semibold capitalize text-emerald-700 dark:text-white">
                        More Detail
                      </span>
                    </div>
                    <div className="-mt-1 ml-3">
                      <span className="block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Down Section */}
                <div className="rounded-xl bg-slate-300 p-4 dark:bg-slate-700">
                  {/* Container of Accordions */}
                  <div>
                    {/* Accordion Box */}
                    <div className="mb-4">
                      {/* Top Section */}
                      <div
                        onClick={accordionHandler}
                        data-id="1"
                        className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-4 dark:bg-slate-600 ${
                          accordion === 1 ? "rounded-b-none" : ""
                        }`}
                      >
                        <div className="pointer-events-none">
                          <span className="font-semibold capitalize text-emerald-700 dark:text-white">
                            Neighborhood Overview
                          </span>
                          <span
                            className={`border border-yellow-500 ${
                              accordion === 1 ? "block " : "hidden "
                            }`}
                          ></span>
                        </div>
                        <div className="pointer-events-none">
                          <span className="block text-emerald-700 dark:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`h-5 w-5 transition-all duration-300 ${
                                accordion === 1 ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Down Section */}
                      <div
                        className={`rounded-b-xl bg-slate-200 px-6 pt-1 capitalize text-emerald-700 dark:bg-slate-600 dark:text-white ${
                          accordion === 1
                            ? "pb-4 opacity-100 transition-all"
                            : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                        }`}
                      >
                        {hotelDetail?.neighborhood_overview ? (
                          hotelDetail?.neighborhood_overview
                        ) : (
                          <span>
                            Sorry! No information is available about this ⚡
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accordion Box */}
                    <div className="mb-4">
                      {/* Top Section */}
                      <div
                        onClick={accordionHandler}
                        data-id="2"
                        className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-4 dark:bg-slate-600 ${
                          accordion === 2 ? "rounded-b-none" : ""
                        }`}
                      >
                        <div className="pointer-events-none">
                          <span className="font-semibold capitalize text-emerald-700 dark:text-white">
                            Hotel Summary
                          </span>
                          <span
                            className={`border border-yellow-500 ${
                              accordion === 2 ? "block " : "hidden "
                            }`}
                          ></span>
                        </div>
                        <div className="pointer-events-none">
                          <span className="block text-emerald-700 dark:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`h-5 w-5 transition-all duration-300 ${
                                accordion === 2 ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Down Section */}
                      <div
                        className={`rounded-b-xl bg-slate-200 px-6 pt-1 capitalize text-emerald-700 dark:bg-slate-600 dark:text-white ${
                          accordion === 2
                            ? "pb-4 opacity-100 transition-all"
                            : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                        }`}
                      >
                        {hotelDetail?.summary ? (
                          hotelDetail?.summary
                        ) : (
                          <span>
                            Sorry! No information is available about this ⚡
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accordion Box */}
                    <div className="mb-4">
                      {/* Top Section */}
                      <div
                        onClick={accordionHandler}
                        data-id="3"
                        className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-4 dark:bg-slate-600 ${
                          accordion === 3 ? "rounded-b-none" : ""
                        }`}
                      >
                        <div className="pointer-events-none">
                          <span className="font-semibold capitalize text-emerald-700 dark:text-white">
                            Hotel Space
                          </span>
                          <span
                            className={`border border-yellow-500 ${
                              accordion === 3 ? "block " : "hidden "
                            }`}
                          ></span>
                        </div>
                        <div className="pointer-events-none">
                          <span className="block text-emerald-700 dark:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`h-5 w-5 transition-all duration-300 ${
                                accordion === 3 ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Down Section */}
                      <div
                        className={`rounded-b-xl bg-slate-200 px-6 pt-1 capitalize text-emerald-700 dark:bg-slate-600 dark:text-white ${
                          accordion === 3
                            ? "pb-4 opacity-100 transition-all"
                            : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                        }`}
                      >
                        {hotelDetail?.space ? (
                          hotelDetail?.space
                        ) : (
                          <span>
                            Sorry! No information is available about this ⚡
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accordion Box */}
                    <div className="mb-4">
                      {/* Top Section */}
                      <div
                        onClick={accordionHandler}
                        data-id="4"
                        className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-4 dark:bg-slate-600 ${
                          accordion === 4 ? "rounded-b-none" : ""
                        }`}
                      >
                        <div className="pointer-events-none">
                          <span className="font-semibold capitalize text-emerald-700 dark:text-white">
                            Hotel Access
                          </span>
                          <span
                            className={`border border-yellow-500 ${
                              accordion === 4 ? "block " : "hidden "
                            }`}
                          ></span>
                        </div>
                        <div className="pointer-events-none">
                          <span className="block text-emerald-700 dark:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`h-5 w-5 transition-all duration-300 ${
                                accordion === 4 ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Down Section */}
                      <div
                        className={`rounded-b-xl bg-slate-200 px-6 pt-1 capitalize text-emerald-700 dark:bg-slate-600 dark:text-white ${
                          accordion === 4
                            ? "pb-4 opacity-100 transition-all"
                            : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                        }`}
                      >
                        {hotelDetail?.access ? (
                          hotelDetail?.access
                        ) : (
                          <span>
                            Sorry! No information is available about this ⚡
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accordion Box */}
                    <div>
                      {/* Top Section */}
                      <div
                        onClick={accordionHandler}
                        data-id="5"
                        className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-4 dark:bg-slate-600 ${
                          accordion === 5 ? "rounded-b-none" : ""
                        }`}
                      >
                        <div className="pointer-events-none">
                          <span className="font-semibold capitalize text-emerald-700 dark:text-white">
                            Hotel Transit
                          </span>
                          <span
                            className={`border border-yellow-500 ${
                              accordion === 5 ? "block " : "hidden "
                            }`}
                          ></span>
                        </div>
                        <div className="pointer-events-none">
                          <span className="block text-emerald-700 dark:text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`h-5 w-5 transition-all duration-300 ${
                                accordion === 5 ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Down Section */}
                      <div
                        className={`rounded-b-xl bg-slate-200 px-6 pt-1 capitalize text-emerald-700 dark:bg-slate-600 dark:text-white ${
                          accordion === 5
                            ? "pb-4 opacity-100 transition-all"
                            : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                        }`}
                      >
                        {hotelDetail?.transit ? (
                          hotelDetail?.transit
                        ) : (
                          <span>
                            Sorry! No information is available about this ⚡
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Booking Button */}
              <div>
                <button
                  onClick={(e) => hotelReserveHandler(e, hotelDetail?.id)}
                  className={`block w-full rounded-xl bg-emerald-700 px-4 py-2 shadow-lg disabled:bg-gray-400 dark:bg-slate-700 dark:disabled:bg-slate-400 ${
                    isReservedHotel ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isReservedHotel ? true : false}
                >
                  {/* Unreserved Hotel Content */}
                  <div
                    className={`items-center justify-between ${
                      isReservedHotel ? "hidden" : "flex"
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-slate-200">BOOK</span>
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
                        {hotelDetail?.price}
                      </span>
                      <span className="font-semibold text-slate-200">
                        Night
                      </span>
                    </div>
                  </div>

                  {/* Reserved Hotel Content */}
                  <div
                    className={`items-center justify-center ${
                      isReservedHotel ? "flex" : "hidden"
                    }`}
                  >
                    <span className="block w-full font-semibold italic text-slate-200">
                      Have a Nice Trip
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelDetail;
