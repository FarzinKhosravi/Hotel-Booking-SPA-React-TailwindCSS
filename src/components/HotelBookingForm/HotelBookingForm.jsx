import {
  UserIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import BackButton from "../../common/BackButton";
import ReactCountryFlag from "react-country-flag";
import useHotelDetail from "./../../hooks/useHotelDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createHotelReserved,
  removeHotelReserved,
} from "../../features/loggedInUser/loggedInUserSlice";
import saveLocalStorage from "./../../localStorage/saveLocalStorage";
import { useNavigate } from "react-router-dom";
import http from "../../services/httpService";
import getLocalStorage from "../../localStorage/getLocalStorage";
import removeLocalStorage from "../../localStorage/removeLocalStorage";
import toast from "react-hot-toast";
import Wellcome from "../../common/Wellcome";

const USER_DATA = "USER_DATA";

const BOOKING_FORM = "BOOKING_FORM";

function HotelBookingForm() {
  function browserBackButtonLogic() {
    window.addEventListener("popstate", function () {
      console.log("User clicked the browser back button !!");

      cancelHotelReservedHandler(hotelDetail?.id);
    });
  }

  browserBackButtonLogic();

  const { hotelDetail } = useHotelDetail();

  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const [activeStep, setActiveStep] = useState(
    getLocalStorage(BOOKING_FORM)?.activeStep || 1
  );

  const [isConfirm, setIsConfirm] = useState(
    getLocalStorage(BOOKING_FORM)?.isConfirm || false
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    saveLocalStorage(USER_DATA, loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    saveLocalStorage(BOOKING_FORM, { activeStep, isConfirm });
  }, [activeStep, isConfirm]);

  const infoConfirmHandler = (hotelDetail) => {
    dispatch(createHotelReserved(hotelDetail));

    setIsConfirm(true);
  };

  const cancelHotelReservedHandler = (id) => {
    console.log("cancelling...");

    removeLocalStorage(BOOKING_FORM);

    const foundHotelReserved = loggedInUser.hotelsReserved.find(
      (hotel) => Number(hotel.id) === Number(id)
    );

    if (foundHotelReserved) {
      dispatch(removeHotelReserved(id));

      navigate("/hotels-list");
    } else navigate("/hotels-list");
  };

  const hotelReservedHandler = async (id) => {
    await http.patch(`/users/${id}`, loggedInUser);

    removeLocalStorage(BOOKING_FORM);

    toast.success(
      "Your Hotel Reservation Process has been Successfully Completed 🥳"
    );

    navigate("/hotels-list");
  };

  console.log("hotelDetail:", hotelDetail);

  console.log("loggedInUser:", loggedInUser);

  return (
    <div className="mb-20 min-h-screen px-4">
      <div>
        <Wellcome />

        {/* Hotel Booking Form Section */}
        <div>
          {/* Hotel Booking Form Title */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="pl-1">
                <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                  Hotel Reservation Form
                </span>
              </div>
              <div
                onClick={() => cancelHotelReservedHandler(hotelDetail.id)}
                className="pr-2"
              >
                <BackButton />
              </div>
            </div>
          </div>

          {/* Multi-Step Form with Progress Bar Section*/}
          <div className="flex flex-col rounded-xl bg-slate-200 p-4 shadow-xl dark:bg-slate-800">
            {/* Progress Bar (Stepper) Section */}
            <div className="relative mb-4 flex justify-between">
              {/* Step One Section */}
              <button
                onClick={() => setActiveStep(1)}
                className="relative z-50 block"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 p-2 dark:bg-yellow-500">
                  <UserIcon className="h-5 w-5 text-white dark:text-black" />
                </div>
              </button>

              {/* Path between Steps */}
              <div
                className={`absolute left-0 top-3.5 h-1 w-1/3 rounded-full ${
                  activeStep > 1
                    ? "bg-emerald-800 dark:bg-yellow-500"
                    : "bg-gray-300 dark:bg-slate-700"
                }`}
              ></div>

              {/* Step Two Section */}
              <button
                onClick={() => setActiveStep(2)}
                className="relative z-50 ml-3 block"
              >
                <div
                  className={`pointer-events-none mb-2 flex h-8 w-8 items-center justify-center rounded-full p-2 ${
                    activeStep > 1
                      ? "bg-emerald-800 dark:bg-yellow-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <BuildingOfficeIcon
                    className={`h-5 w-5 ${
                      activeStep > 1
                        ? "text-white dark:text-black"
                        : "dark:text-white"
                    }`}
                  />
                </div>
              </button>

              {/* Path between Steps */}
              <div
                className={`absolute left-35% right-1/2 top-3.5 h-1 w-1/3 rounded-full ${
                  activeStep > 2
                    ? "bg-emerald-800 dark:bg-yellow-500"
                    : "bg-gray-300 dark:bg-slate-700"
                }`}
              ></div>

              {/* Step Three Section */}
              <button
                onClick={() => setActiveStep(3)}
                className="relative z-50 block"
              >
                <div
                  className={`pointer-events-none mb-2 flex h-8 w-8 items-center justify-center rounded-full p-2 ${
                    activeStep > 2
                      ? "bg-emerald-800 dark:bg-yellow-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <ClipboardDocumentCheckIcon
                    className={`h-5 w-5 ${
                      activeStep > 2
                        ? "text-white dark:text-black"
                        : "dark:text-white"
                    }`}
                  />
                </div>
              </button>

              {/* Path between Steps */}
              <div
                className={`absolute right-0 top-3.5 h-1 w-1/3 rounded-full ${
                  activeStep > 3
                    ? "bg-emerald-800 dark:bg-yellow-500"
                    : "bg-gray-300 dark:bg-slate-700"
                }`}
              ></div>

              {/* Step Four Section */}
              <button
                onClick={() => setActiveStep(4)}
                className="relative z-50 ml-3 block disabled:cursor-not-allowed"
                disabled={activeStep === 3 && !isConfirm ? true : false}
              >
                <div
                  className={`pointer-events-none mb-2 flex h-8 w-8 items-center justify-center rounded-full p-2 ${
                    activeStep > 3
                      ? "bg-emerald-800 dark:bg-yellow-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <ClipboardDocumentListIcon
                    className={`h-5 w-5 ${
                      activeStep > 3
                        ? "text-white dark:text-black"
                        : "dark:text-white"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Steps Content Container */}
            <div className="mb-8 rounded-xl bg-slate-300 px-3 pb-4 pt-3 shadow-xl dark:bg-slate-700">
              {/* User Info Content */}
              <div
                className={`w-full flex-col ${
                  activeStep === 1 ? "flex" : "hidden"
                }`}
              >
                {/* Step Specs */}
                <div className="mb-8 flex w-full items-center justify-center">
                  <div className="flex flex-col items-center border-b-2 border-yellow-500 font-bold text-emerald-800 dark:text-white">
                    <span className="block">Step 1</span>
                    <span className="block">User Info Review</span>
                  </div>
                </div>

                {/* User Specs */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-x-8">
                  <div className="relative mb-12 flex flex-col sm:mb-0 sm:w-full">
                    {/* Convert to Component  */}

                    {/* Username */}
                    <div className="relative mb-10 flex w-full items-center justify-start">
                      <div className="absolute -top-3 left-0 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        <span className="block">Username</span>
                      </div>

                      <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 capitalize text-white shadow-lg dark:bg-slate-600 sm:pl-28 sm:pt-2">
                        {loggedInUser.username}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="relative flex w-full items-center justify-start">
                      <div className="absolute -top-4 left-0 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        <span className="block">Full Name</span>
                      </div>

                      <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 capitalize text-white shadow-lg dark:bg-slate-600 sm:pl-28 sm:pt-2">
                        {loggedInUser.fullName}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col sm:w-full">
                    {/* Convert to Component  */}

                    {/* Phone Number */}
                    <div className="relative mb-10 flex w-full items-center justify-start">
                      <div className="absolute -top-4 left-0 rounded-xl bg-white px-3 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        Phone Number
                      </div>

                      <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-600 sm:pl-32 sm:pt-2">
                        {loggedInUser.phoneNumber}
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="relative flex w-full items-center justify-start">
                      <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        Gender
                      </div>

                      <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 capitalize text-white shadow-lg dark:bg-slate-600 sm:pl-24 sm:pt-2">
                        {`${loggedInUser.gender} ${
                          loggedInUser.gender === "male" ? "🧑🏻" : "👩🏻"
                        }`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Info Content */}
              <div
                className={`w-full flex-col ${
                  activeStep === 2 ? "flex" : "hidden"
                }`}
              >
                {/* Step Specs */}
                <div className="mb-8 flex w-full items-center justify-center">
                  <div className="flex flex-col items-center border-b-2 border-yellow-500 font-bold text-emerald-800 dark:text-white">
                    <span className="block">Step 2</span>
                    <span className="block">Hotel Info Review</span>
                  </div>
                </div>

                {/* Hotel Specs */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-x-8">
                  <div className="relative mb-12 flex flex-col sm:mb-0 sm:w-full">
                    {/* Convert to Component  */}

                    {/* Name */}
                    <div className="relative mb-10 flex w-full items-center justify-start">
                      <div className="absolute -top-3 left-0 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        <span className="block">Name</span>
                      </div>

                      <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-600 sm:pl-20 sm:pt-2">
                        {hotelDetail?.name}
                      </div>
                    </div>

                    {/* State */}
                    <div className="relative flex w-full items-center justify-start">
                      <div className="absolute -top-4 left-0 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        <span className="block">State</span>
                      </div>

                      <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-600 sm:pl-20 sm:pt-2">
                        {hotelDetail?.state}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col sm:w-full">
                    {/* Convert to Component  */}

                    {/* Country */}
                    <div className="relative mb-10 flex w-full items-center justify-start">
                      <div className="absolute -top-4 left-0 flex justify-start rounded-xl bg-white px-3 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        <span className="block">Country</span>
                        <span className="ml-2 block">
                          <ReactCountryFlag
                            svg
                            countryCode={hotelDetail?.country_code}
                            className="text-lg"
                          />
                        </span>
                      </div>

                      <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-600 sm:pl-28 sm:pt-2">
                        {hotelDetail?.smart_location.split(",")[1].trim()}
                      </div>
                    </div>

                    {/* Capital */}
                    <div className="relative flex w-full items-center justify-start">
                      <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-500 dark:text-slate-100 sm:top-0">
                        Capital
                      </div>

                      <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-600 sm:pl-24 sm:pt-2">
                        {hotelDetail?.smart_location.split(",")[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Step Content */}
              <div
                className={`w-full flex-col ${
                  activeStep === 3 ? "flex" : "hidden"
                }`}
              >
                {/* Step Specs */}
                <div className="mb-8 flex w-full items-center justify-center">
                  <div className="flex flex-col items-center border-b-2 border-yellow-500 font-bold text-emerald-800 dark:text-white">
                    <span className="block">Step 3</span>
                    <span className="block">Info Confirm</span>
                  </div>
                </div>

                {/* Confirm Content */}
                <div>
                  {/* Confirm Step Title */}
                  <div className="mb-8 flex justify-start">
                    <span className="mt-0.5 block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-sky-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="ml-1 font-semibold text-emerald-800 dark:text-white">
                      You Can Confirm Information of Previous Steps by Pressing
                      Button Below :
                    </span>
                  </div>

                  {/* Confirm Button */}
                  <div className="mb-3 w-full">
                    <button
                      disabled={isConfirm ? true : false}
                      onClick={() => infoConfirmHandler(hotelDetail)}
                      className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-400 dark:bg-slate-600 dark:disabled:bg-slate-400"
                    >
                      <span className="pointer-events-none block text-white">
                        Confirmation
                      </span>
                    </button>
                  </div>

                  {/* Cancel Button */}
                  <div className="w-full">
                    <button
                      onClick={() => cancelHotelReservedHandler(hotelDetail.id)}
                      className="block w-full rounded-xl bg-red-700 shadow-lg disabled:bg-gray-400"
                    >
                      <div className="pointer-events-none flex items-center justify-center">
                        <div className="pointer-events-none w-full p-3">
                          <span className="pointer-events-none block text-white">
                            Cancel
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Finishing up Step Content */}
              <div
                className={`w-full flex-col ${
                  activeStep === 4 ? "flex" : "hidden"
                }`}
              >
                {/* Step Specs */}
                <div className="mb-8 flex w-full items-center justify-center">
                  <div className="flex flex-col items-center border-b-2 border-yellow-500 font-bold text-emerald-800 dark:text-white">
                    <span className="block">Step 4</span>
                    <span className="block">Finishing Up</span>
                  </div>
                </div>

                {/* Finishing up Content */}
                <div>
                  {/* Finishing up Step Title */}
                  <div className="mb-8 flex justify-start">
                    <span className="mt-0.5 block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-sky-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="ml-1 font-semibold text-emerald-800 dark:text-white">
                      You Can Finalize Your Desired Hotel Reservation by
                      Pressing Button Below :
                    </span>
                  </div>

                  {/* Final Reservation Button */}
                  <div className="mb-3 w-full">
                    <button
                      onClick={() => hotelReservedHandler(loggedInUser.id)}
                      className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-500 dark:bg-slate-600 dark:disabled:bg-slate-400"
                    >
                      <span className="pointer-events-none block text-white">
                        Final Reservation
                      </span>
                    </button>
                  </div>

                  {/* Cancel Button */}
                  <div className="w-full">
                    <button
                      onClick={() => cancelHotelReservedHandler(hotelDetail.id)}
                      className="block w-full rounded-xl bg-red-700 shadow-lg"
                    >
                      <div className="pointer-events-none flex items-center justify-center">
                        <div className="pointer-events-none w-full p-3">
                          <span className="pointer-events-none block text-white">
                            Cancel
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar (Stepper) Buttons */}
            <div className="flex w-full justify-between px-1">
              <div>
                <button
                  disabled={activeStep === 1 ? true : false}
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep - 1)
                  }
                  className="block rounded-xl bg-emerald-800 px-3 py-2 text-white shadow-lg disabled:bg-gray-400 dark:bg-slate-700 dark:disabled:bg-slate-400"
                >
                  Prev.
                </button>
              </div>

              <div>
                <button
                  disabled={
                    activeStep === 4
                      ? true
                      : activeStep === 3 && !isConfirm
                        ? true
                        : false
                  }
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                  }
                  className="block rounded-xl bg-emerald-800 px-3 py-2 text-white shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-slate-700 dark:disabled:bg-slate-400"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBookingForm;
