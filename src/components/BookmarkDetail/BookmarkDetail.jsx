import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";
import { createCurrentBookmark } from "../../features/currentBookmark/currentBookmarkSlice";
import { removeAsyncBookmark } from "../../features/bookmarksList/bookmarksListSlice";
import BackButton from "./../../common/BackButton";
import saveLocalStorage from "./../../localStorage/saveLocalStorage";
import useBookmarkDetail from "../../hooks/useBookmarkDetail";
import Loader from "../Loader";

const CURRENT_BOOKMARK = "CURRENT_BOOKMARK";

function BookmarkDetail() {
  const navigate = useNavigate();

  const [isOpenAccordion, setIsOpenAccordion] = useState(false);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const dispatch = useDispatch();

  const { loading, bookmarkDetail } = useBookmarkDetail();

  useEffect(() => {
    dispatch(createCurrentBookmark(bookmarkDetail));

    saveLocalStorage(CURRENT_BOOKMARK, bookmarkDetail);
  }, [bookmarkDetail]);

  const removeBookmarkHandler = (id) => {
    dispatch(removeAsyncBookmark(id));

    navigate("/bookmarks");
  };

  console.log("LOADING:", loading);

  console.log("BOOKMARK_DETAIL:", bookmarkDetail);

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {/* Bookmark Detail Title */}
            <div className="mb-8 px-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                    {bookmarkDetail?.bookmarkName}
                  </span>
                </div>
                <div>
                  <BackButton />
                </div>
              </div>
            </div>

            {/* Bookmark Detail Section */}
            <div className="overflow-hidden rounded-2xl bg-slate-200 shadow-md">
              {/* Bookmark Menu Section */}
              <div
                className={`relative flex py-4 pr-4 ${
                  isOpenMenu
                    ? "flex-col items-end justify-start"
                    : "items-center justify-end"
                }`}
              >
                {/* Menu Icon */}
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                >
                  <span className="block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 text-stone-800"
                    >
                      <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                    </svg>
                  </span>
                </div>

                {/* Menu Options */}
                <div
                  className={`absolute top-11 z-20 flex-col overflow-hidden rounded-xl bg-slate-100 py-1 shadow-lg ${
                    isOpenMenu ? "flex" : "hidden"
                  }`}
                >
                  <span
                    onClick={() =>
                      navigate(
                        `/bookmarks/update/${bookmarkDetail.id}?lat=${
                          bookmarkDetail.latitude
                        }&lng=${bookmarkDetail.longitude}&hostLocation=${
                          bookmarkDetail.locality
                        }&mapTitle=${`${bookmarkDetail.bookmarkName.slice(
                          0,
                          5
                        )} Bookmark`}`
                      )
                    }
                    className="cursor-pointer px-4 py-2 text-sm font-semibold"
                  >
                    Update Bookmark
                  </span>

                  <span
                    onClick={() => removeBookmarkHandler(bookmarkDetail.id)}
                    className="cursor-pointer px-4 py-2 text-sm font-semibold text-red-600"
                  >
                    Remove Bookmark
                  </span>
                </div>
              </div>

              {/* Top Section */}
              <div className="mb-8 flex flex-col px-4 pb-4">
                {/* Bookmark Name */}
                <div className="mb-16 flex items-center justify-center">
                  <div className="relative mt-4 flex w-full max-w-64 items-center justify-start sm:mx-auto">
                    <div className="absolute -top-4 left-12 rounded-xl bg-white px-6.88 py-2 font-semibold">
                      Bookmark Name
                    </div>
                    <div className="h-auto w-full rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-center text-white shadow-lg">
                      {bookmarkDetail?.bookmarkName}
                    </div>
                  </div>
                </div>

                {/* Location Specs */}
                <div className="mb-16 flex flex-col">
                  {/* Continent & Country Sections */}
                  <div className="mb-9 flex flex-col sm:flex-row lg:gap-x-2">
                    {/* Continent */}
                    <div className="mb-9 flex w-full justify-center sm:mb-0">
                      <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                        <div className="absolute -top-4 left-16 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold lg:left-12 xl:left-16">
                          <span className="block">Continent</span>
                          <span className="ml-2 block">
                            <ReactCountryFlag
                              svg
                              countryCode={bookmarkDetail?.continentCode}
                              className="text-lg"
                            />
                          </span>
                        </div>

                        <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-center text-white shadow-lg">
                          {bookmarkDetail?.continent}
                        </div>
                      </div>
                    </div>

                    {/* Country */}
                    <div className="flex w-full justify-center sm:mb-0">
                      <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                        <div className="absolute -top-4 left-18 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold lg:left-14 xl:left-18">
                          <span className="block">Country</span>
                          <span className="ml-2 block">
                            <ReactCountryFlag
                              svg
                              countryCode={bookmarkDetail?.countryCode}
                              className="text-lg"
                            />
                          </span>
                        </div>

                        <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-center text-white shadow-lg">
                          {bookmarkDetail?.countryName.slice(0, 15).trim() +
                            " ..."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* City & Locality Sections */}
                  <div className="flex flex-col sm:flex-row lg:gap-x-2">
                    {/* City */}
                    <div className="mb-9 flex w-full justify-center sm:mb-0">
                      <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                        <div className="absolute -top-4 left-24 rounded-xl bg-white px-4 py-2 font-semibold lg:left-20 xl:left-24">
                          City
                        </div>
                        <div className="flex h-auto w-full items-center justify-center rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg">
                          {bookmarkDetail?.city}
                        </div>
                      </div>
                    </div>

                    {/* Locality */}
                    <div className="flex w-full justify-center">
                      <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                        <div className="absolute -top-4 left-22 rounded-xl bg-white px-4 py-2 font-semibold lg:left-18 xl:left-22">
                          Locality
                        </div>
                        <div className="flex h-auto w-full items-center justify-center rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg">
                          {bookmarkDetail?.locality}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Name & Price */}
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row lg:gap-x-2">
                    {/* Location Name */}
                    <div className="mb-9 flex w-full justify-center sm:mb-0">
                      <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                        <div className="absolute -top-4 left-11 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold lg:left-6 xl:left-11">
                          <span className="block">Location Name</span>
                          <span className="ml-2 block">
                            <ReactCountryFlag
                              svg
                              countryCode={bookmarkDetail?.countryCode}
                              className="text-lg"
                            />
                          </span>
                        </div>

                        <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-center text-white shadow-lg">
                          {bookmarkDetail?.locationName}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex w-full justify-center">
                      <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                        <div className="absolute -top-4 left-24 rounded-xl bg-white px-4 py-2 font-semibold lg:left-20 xl:left-24">
                          Price
                        </div>
                        <div className="flex h-auto w-full items-center justify-center rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-white shadow-lg">
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
                            {bookmarkDetail?.price}
                          </span>
                          <span className="block font-semibold text-slate-200">
                            Night
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section */}
              <div className="mb-8 p-4">
                <div className="rounded-xl bg-slate-300 p-4">
                  {/* Accordion Box */}
                  <div>
                    {/* Top Section */}
                    <div
                      onClick={() => setIsOpenAccordion(!isOpenAccordion)}
                      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-4 ${
                        isOpenAccordion ? "rounded-b-none" : ""
                      }`}
                    >
                      <div className="pointer-events-none">
                        <span className="font-semibold capitalize text-emerald-700">
                          Bookmark Description
                        </span>
                        <span
                          className={`border border-yellow-500 ${
                            isOpenAccordion ? "block " : "hidden "
                          }`}
                        ></span>
                      </div>
                      <div className="pointer-events-none">
                        <span className="block text-emerald-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-5 w-5 transition-all duration-300 ${
                              isOpenAccordion ? "rotate-180" : ""
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
                      className={`rounded-b-xl bg-slate-200 px-6 pt-1 capitalize text-emerald-700 ${
                        isOpenAccordion
                          ? "pb-4 opacity-100 transition-all"
                          : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                      }`}
                    >
                      {bookmarkDetail?.bookmarkDescription ? (
                        bookmarkDetail?.bookmarkDescription
                      ) : (
                        <span>
                          Sorry! No information is available about this ⚡
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Down Section */}
              <div className="w-full shadow-lg">
                <button className="block w-full rounded-t-sm bg-emerald-800 text-white">
                  <div className="flex items-center justify-between py-2 pl-3 pr-2">
                    <div>
                      <span className="font-semibold text-slate-200">BOOK</span>
                    </div>
                    <div className="inline-flex items-center">
                      <div className="flex items-center">
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
                          {bookmarkDetail?.price}
                        </span>
                        <span className="font-semibold text-slate-200">
                          Night
                        </span>
                      </div>
                      <div>
                        <span className="ml-2 block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
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

export default BookmarkDetail;
