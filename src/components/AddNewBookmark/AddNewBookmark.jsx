import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import ReactCountryFlag from "react-country-flag";
import toast from "react-hot-toast";
import getBookmarksList from "../../services/getBookmarksListService";
import BackButton from "./../../common/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncSelectedLocation } from "../../features/selectedLocation/selectedLocationSlice";
import Loader from "./../Loader";
import Message from "./../../common/Message";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { createAsyncBookmark } from "../../features/bookmarksList/bookmarksListSlice";
import getUsers from "./../../services/getUsersService";

const initialValues = {
  bookmarkName: "",
  bookmarkDescription: "",
};

const validationSchema = Yup.object({
  bookmarkName: Yup.string()
    .required("Please Enter Your Bookmark Name ⚡")
    .min(5, "Name Length Too Short !")
    .max(10, "Name Length Too Long !")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name Can Only Contain Latin Letters !"
    ),

  bookmarkDescription: Yup.string()
    .min(5, "Description Length Too Short !")
    .max(20, "Description Length Too Long !")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Description Can Only Contain Latin Letters !"
    ),
});

function AddNewBookmark() {
  const onSubmit = (bookmarkData) => {
    async function createUserBookmark() {
      const { data: users } = await getUsers();

      const foundUser = users.find(
        (user) => user.username === loggedInUser.username
      );

      if (foundUser)
        // Bookmark Data
        return {
          ...selectedLocation,
          ...bookmarkData,
          user: foundUser,
        };
    }

    async function fetchBookmarks() {
      const userBookmark = await createUserBookmark();

      console.log("USER_BOOKMARK:", userBookmark);

      if (userBookmark) {
        const { data: bookmarks } = await getBookmarksList();

        const duplicateBookmark = bookmarks.find(
          (bookmark) => bookmark.bookmarkName === userBookmark.bookmarkName
        );

        if (duplicateBookmark) {
          setDuplicateBookmarkName("This Name has Already Been Chosen ⚡");

          toast.error("Your Bookmark Name is Duplicate 🧐");
        } else {
          console.log("USER_BOOKMARK_SAVED_IN_SERVER:", userBookmark);

          dispatch(createAsyncBookmark({ userBookmark, loggedInUser }));

          navigate("/bookmarks?mapTitle=Bookmarks List");
        }
      }
    }

    fetchBookmarks();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  const dispatch = useDispatch();

  const { loading, selectedLocation } = useSelector(
    (state) => state.selectedLocation
  );

  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const navigate = useNavigate();

  const [duplicateBookmarkName, setDuplicateBookmarkName] = useState("");

  // *** Convert to Custom Hook ***

  const [searchParams] = useSearchParams();
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const locationName = searchParams.get("locationName");
  const price = searchParams.get("price");

  useEffect(() => {
    dispatch(
      getAsyncSelectedLocation({ latitude, longitude, price, locationName })
    );
  }, [latitude, longitude]);

  useEffect(() => {
    setDuplicateBookmarkName("");
  }, [formik.values.bookmarkName]);

  console.log("selectedLocation:", selectedLocation);
  console.log("loading:", loading);

  if (loading) return <Loader />;

  if (!selectedLocation?.city)
    return (
      <Message
        message={{
          title: "Not City",
          description:
            "The Location You have Chosen is Not City, Please Choose Another Location !",
        }}
      >
        <MapPinIcon className="h-20 w-20 text-red-700" />
      </Message>
    );

  return (
    <div className="h-screen">
      <div>
        {/* Add New Bookmark Form Title */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="pl-1">
              <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                Add New Bookmark Form
              </span>
            </div>
            <div className="pr-2">
              <BackButton />
            </div>
          </div>
        </div>

        {/* Add New Bookmark Form */}
        <div className="pr-2">
          <form
            onSubmit={formik.handleSubmit}
            className="rounded-xl bg-slate-200 p-4 dark:bg-slate-800"
          >
            {/* Location Data */}
            <div className="mb-12 flex flex-col">
              {/* Location Data Title */}
              <div className="mb-8 flex items-center justify-start">
                <span className="block">
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
                  Your Location Data :
                </span>
              </div>

              {/* Location Specs */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-x-8 lg:gap-x-[10px]">
                <div className="relative mb-12 flex flex-col sm:mb-0 sm:w-full">
                  {/* Convert to Component  */}

                  {/* Continent */}
                  <div className="relative mb-10 flex w-full items-center justify-start">
                    <div className="absolute -top-3 left-0 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-600 dark:text-white sm:top-0">
                      <span className="block">Continent</span>
                      <span className="ml-2 block">
                        <ReactCountryFlag
                          svg
                          countryCode={selectedLocation.continentCode}
                          className="text-lg"
                        />
                      </span>
                    </div>
                    <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-700 sm:pl-34 sm:pt-2">
                      {selectedLocation.continent}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="relative flex w-full items-center justify-start">
                    <div className="absolute -top-4 left-0 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-600 dark:text-white sm:top-0">
                      <span className="block">Country</span>
                      <span className="ml-2 block">
                        <ReactCountryFlag
                          svg
                          countryCode={selectedLocation.countryCode}
                          className="text-lg"
                        />
                      </span>
                    </div>

                    <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-700 sm:pl-32 sm:pt-2">
                      {selectedLocation.countryName.slice(0, 15).trim()}
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col sm:w-full">
                  {/* Convert to Component  */}

                  {/* City */}
                  <div className="relative mb-10 flex w-full items-center justify-start">
                    <div className="absolute -top-4 left-0 rounded-xl bg-white px-6.88 py-2 font-semibold dark:bg-slate-600 dark:text-white sm:top-0 lg:px-5">
                      City
                    </div>
                    <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-700 sm:pl-24 sm:pt-2 lg:pl-20">
                      {selectedLocation.city}
                    </div>
                  </div>

                  {/* Locality */}
                  <div className="relative flex w-full items-center justify-start">
                    <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-600 dark:text-white sm:top-0 lg:px-3.5">
                      Locality
                    </div>
                    <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-700 sm:pl-24 sm:pt-2 lg:pl-24">
                      {selectedLocation.locality.slice(0, 10).trim()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12 flex items-center justify-center">
                <span className="block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                    className="h-5 w-5 dark:text-white"
                  >
                    <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                  </svg>
                </span>
              </div>

              <div className="relative flex flex-col sm:w-full sm:flex-row sm:items-center sm:gap-x-4">
                {/* Convert to Component  */}

                {/* Location Name */}
                <div className="relative mb-10 flex w-full items-center justify-start sm:mb-0">
                  <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2 font-semibold dark:bg-slate-600 dark:text-white sm:top-0">
                    Location Name
                  </div>
                  <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg dark:bg-slate-700 sm:pl-34 sm:pt-2">
                    {selectedLocation.locationName}
                  </div>
                </div>

                {/* Price */}
                <div className="relative flex w-full items-center justify-start">
                  <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2.5 font-semibold dark:bg-slate-600 dark:text-white sm:top-0">
                    Price
                  </div>
                  <div className="inline-flex h-auto w-full items-center justify-start whitespace-nowrap rounded-xl bg-emerald-800 pb-2 pl-2 pt-9 text-white shadow-lg dark:bg-slate-700 sm:pl-20 sm:pt-2">
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
                    <span className="mr-1 block text-lg font-semibold text-slate-200">
                      {selectedLocation.price}
                    </span>
                    <span className="block font-semibold text-slate-200">
                      Night
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Bookmark Data */}
            <div className="mb-12 flex flex-col">
              {/* User Bookmark Title */}
              <div className="mb-8 flex justify-start">
                <span className="block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="ml-1 font-semibold text-emerald-800 dark:text-white">
                  Please Enter Your Bookmark Information :
                </span>
              </div>

              {/* User Bookmark Specs */}
              <div className="relative flex flex-col sm:w-full">
                {/* Convert to Component  */}

                {/* Bookmark Name Input Section */}
                <div className="mb-10 flex flex-col">
                  {/* User Bookmark Name Input */}
                  <div className="mb-2 flex w-full items-center justify-start sm:relative">
                    <div
                      className={`absolute -top-3 left-0 rounded-xl bg-white p-2 font-semibold dark:bg-slate-600 sm:top-0 ${
                        (formik.errors.bookmarkName &&
                          formik.touched.bookmarkName) ||
                        duplicateBookmarkName
                          ? "text-red-700 dark:text-red-600"
                          : "dark:text-white"
                      }`}
                    >
                      Your Bookmark Name
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        name="bookmarkName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bookmarkName}
                        placeholder={
                          formik.errors.bookmarkName ===
                            "Please Enter Your Bookmark Name ⚡" &&
                          formik.touched.bookmarkName
                            ? "Don't Forget Name of Bookmark 💡"
                            : "Enter Your Bookmark Name..."
                        }
                        className={`block h-16 w-full rounded-xl border-0 bg-emerald-800 from-emerald-700 to-emerald-900 pb-6 pt-12 text-base text-white shadow-lg placeholder:text-white focus:bg-gradient-to-r focus:bg-clip-text focus:text-emerald-700 focus:placeholder:text-slate-500 focus:placeholder:opacity-50 dark:bg-slate-700 dark:from-slate-700 dark:to-slate-800 dark:focus:text-white sm:h-auto sm:pb-2 sm:pl-44 sm:pt-2 ${
                          (formik.errors.bookmarkName &&
                            formik.touched.bookmarkName) ||
                          duplicateBookmarkName
                            ? "bg-red-700 dark:bg-red-600"
                            : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Show Error For Bookmark Name Input */}
                  <div>
                    {formik.errors.bookmarkName &&
                      formik.touched.bookmarkName && (
                        <span className="block w-full pl-1 font-semibold text-red-600">
                          {formik.errors.bookmarkName}
                        </span>
                      )}

                    {duplicateBookmarkName && (
                      <span className="block w-full pl-1 font-semibold text-red-600">
                        {duplicateBookmarkName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bookmark Description Input Section */}
                <div className="flex flex-col">
                  {/* User Bookmark Description Input */}
                  <div className="relative mb-2 flex w-full items-center justify-start">
                    <div
                      className={`absolute -top-3 left-0 rounded-xl bg-white p-2 font-semibold dark:bg-slate-600 dark:text-white ${
                        formik.errors.bookmarkDescription &&
                        formik.touched.bookmarkDescription
                          ? "text-red-700"
                          : ""
                      }`}
                    >
                      Your Bookmark Description
                    </div>
                    <div className="w-full">
                      <textarea
                        name="bookmarkDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bookmarkDescription}
                        placeholder="Enter Your Bookmark Description (Optional) ..."
                        className={`block w-full resize-none rounded-xl border-0 bg-emerald-800 from-emerald-700 to-emerald-900 px-2 pb-2 pt-8 text-base text-white shadow-lg placeholder:text-white focus:bg-gradient-to-r focus:bg-clip-text focus:text-emerald-700 focus:placeholder:text-slate-500 focus:placeholder:opacity-50 dark:bg-slate-700 dark:from-slate-700 dark:to-slate-800 dark:focus:text-white ${
                          formik.errors.bookmarkDescription &&
                          formik.touched.bookmarkDescription
                            ? "bg-red-700"
                            : ""
                        }`}
                      ></textarea>
                    </div>
                  </div>

                  {/* Show Error For Bookmark Description Input */}
                  <div>
                    {formik.errors.bookmarkDescription &&
                      formik.touched.bookmarkDescription && (
                        <span className="block w-full pl-1 font-semibold text-red-600">
                          {formik.errors.bookmarkDescription}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add Bookmark Button */}
            <div className="mb-6 w-full">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="block w-full rounded-xl bg-emerald-800 shadow-lg disabled:bg-gray-500 dark:bg-slate-700 dark:disabled:bg-slate-400"
              >
                <div className="flex items-center justify-center">
                  <div className="w-full p-4">
                    <span className="block text-white">
                      Add Favorite Your Bookmark
                      <sup>
                        <div className="ml-2 inline-flex items-start justify-end">
                          <span className="text-xs font-thin text-white">{`Trip to ${selectedLocation.city}`}</span>
                          <span className="ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-3 w-3 text-yellow-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </sup>
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Cancel Button */}
            <div className="w-full">
              <button
                type="button"
                onClick={() => navigate("/bookmarks?mapTitle=Bookmarks List")}
                className="block w-full rounded-xl bg-red-700 shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <div className="w-full p-3">
                    <span className="block text-white">Cancel</span>
                  </div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewBookmark;
