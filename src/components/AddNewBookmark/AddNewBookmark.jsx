import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";

const BASE_LOCATION_DATA_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

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
    const userBookmark = { ...selectedLocation, ...bookmarkData };

    console.log("userBookmark:", userBookmark);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  // *** Convert to Custom Hook ***

  const [searchParams] = useSearchParams();
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");

  console.log(latitude, longitude);

  useEffect(() => {
    async function fetchLocationData() {
      try {
        const { data: locationData } = await axios.get(
          `${BASE_LOCATION_DATA_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        console.log(locationData);

        setSelectedLocation(locationData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchLocationData();
  }, [latitude, longitude]);

  console.log("selectedLocation:", selectedLocation);

  if (!selectedLocation?.city) return <div>Please select a city !!</div>;

  console.log("values :", formik.values);
  console.log("form visited :", formik.touched);
  console.log("errors :", formik.errors);

  return (
    <div className="h-screen">
      <div>
        {/* Add New Bookmark Form Title */}
        <div className="mb-4 px-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                Add New Bookmark Form
              </span>
            </div>
            <div>
              <span>📍</span>
            </div>
          </div>
        </div>

        {/* Add New Bookmark Form */}
        <div className="pr-2">
          <form
            onSubmit={formik.handleSubmit}
            className="rounded-xl bg-slate-200 p-4"
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
                <span className="ml-1 font-semibold text-emerald-800">
                  Your Location Data :
                </span>
              </div>

              {/* Location Specs */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-x-8">
                <div className="relative mb-12 flex flex-col sm:mb-0 sm:w-full">
                  {/* Convert to Component  */}

                  {/* Continent */}
                  <div className="relative mb-10 flex w-full items-center justify-start">
                    <div className="absolute -top-3 left-0 rounded-xl bg-white p-2 font-semibold sm:top-0">
                      Continent
                    </div>
                    <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg sm:pl-24 sm:pt-2">
                      {selectedLocation.continent}
                    </div>
                  </div>

                  {/* City */}
                  <div className="relative flex w-full items-center justify-start">
                    <div className="absolute -top-4 left-0 rounded-xl bg-white px-6.88 py-2 font-semibold sm:top-0">
                      City
                    </div>
                    <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg sm:pl-24 sm:pt-2">
                      {selectedLocation.city}
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col sm:w-full">
                  {/* Convert to Component  */}

                  {/* Country */}
                  <div className="relative mb-10 flex w-full items-center justify-start">
                    <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2 font-semibold sm:top-0">
                      Country
                    </div>
                    <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg sm:pl-24 sm:pt-2">
                      {selectedLocation.countryName.slice(0, 15).trim() +
                        " ..."}
                    </div>
                  </div>

                  {/* Locality */}
                  <div className="relative flex w-full items-center justify-start">
                    <div className="absolute -top-4 left-0 rounded-xl bg-white px-4 py-2 font-semibold sm:top-0">
                      Locality
                    </div>
                    <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg sm:pl-24 sm:pt-2">
                      {selectedLocation.locality}
                    </div>
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
                <span className="ml-1 font-semibold text-emerald-800">
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
                      className={`absolute -top-3 left-0 rounded-xl bg-white p-2 font-semibold sm:top-0 ${
                        formik.errors.bookmarkName &&
                        formik.touched.bookmarkName
                          ? "text-red-700"
                          : ""
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
                        className={`block h-16 w-full rounded-xl border-0 bg-emerald-800 from-emerald-700 to-emerald-900 pb-6 pt-12 text-base text-white shadow-lg placeholder:text-white focus:bg-gradient-to-r focus:bg-clip-text focus:text-emerald-700 focus:placeholder:text-slate-500 focus:placeholder:opacity-50 sm:h-auto sm:pb-2 sm:pl-44 sm:pt-2 ${
                          formik.errors.bookmarkName &&
                          formik.touched.bookmarkName
                            ? "bg-red-700"
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
                  </div>
                </div>

                {/* Bookmark Description Input Section */}
                <div className="flex flex-col">
                  {/* User Bookmark Description Input */}
                  <div className="relative mb-2 flex w-full items-center justify-start">
                    <div
                      className={`absolute -top-3 left-0 rounded-xl bg-white p-2 font-semibold ${
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
                        className={`block w-full resize-none rounded-xl border-0 bg-emerald-800 from-emerald-700 to-emerald-900 px-2 pb-2 pt-8 text-base text-white shadow-lg placeholder:text-white focus:bg-gradient-to-r focus:bg-clip-text focus:text-emerald-700 focus:placeholder:text-slate-500 focus:placeholder:opacity-50 ${
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
            <div className="w-full">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="block w-full rounded-xl bg-emerald-800 shadow-lg disabled:bg-gray-500"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewBookmark;
