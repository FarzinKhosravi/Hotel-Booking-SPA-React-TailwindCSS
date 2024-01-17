import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsyncBookmarksList,
  removeAsyncBookmark,
} from "../features/bookmarksList/bookmarksListSlice";
import { StarIcon } from "@heroicons/react/24/outline";
import ReactCountryFlag from "react-country-flag";
import Loader from "./../components/Loader";
import { Link } from "react-router-dom";
import BackButton from "../common/BackButton";
import Message from "../common/Message";

function BookmarksListPage() {
  const { loading, bookmarksList } = useSelector(
    (state) => state.bookmarksList
  );

  const { currentBookmark } = useSelector((state) => state.currentBookmark);

  const dispatch = useDispatch();

  const [bookmarkMenu, setBookmarkMenu] = useState(null);

  useEffect(() => {
    dispatch(getAsyncBookmarksList());
  }, []);

  console.log("bookmarksList:", bookmarksList);

  console.log("currentBookmark:", currentBookmark);

  return (
    <section>
      <div>
        {loading ? (
          <Loader />
        ) : !bookmarksList?.length ? (
          <Message
            message={{
              title: "Empty List",
              description:
                "There are No Bookmarks, Please Create a Bookmark from The Map.",
            }}
          >
            <span className="block">
              <StarIcon className="h-20 w-20 text-yellow-500" />
            </span>
          </Message>
        ) : (
          <div>
            {/* Bookmark Title */}
            <div className="mb-10 px-1">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                    Bookmarks List
                  </span>
                  <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold shadow-md">
                    {bookmarksList?.length}
                  </span>
                </div>
                <div>
                  <BackButton />
                </div>
              </div>
            </div>

            {/* Bookmark List */}
            <div>
              {/* Container of Bookmarks */}
              <div className="flex flex-col gap-y-16">
                {bookmarksList?.map((bookmark) => {
                  return (
                    <div
                      key={bookmark.id}
                      className="overflow-hidden rounded-xl bg-slate-200 shadow-md last:mb-0"
                    >
                      {/* Last Visited Bookmark Section */}
                      <div
                        className={`mb-1 w-full items-center justify-center bg-yellow-400 py-2 font-semibold text-stone-800 shadow-md ${
                          bookmark?.plusCode === currentBookmark?.plusCode
                            ? "flex"
                            : "hidden"
                        }`}
                      >
                        <span>Last Visited Bookmark</span>
                        <sup className="ml-0.5">
                          <span className="relative flex h-4 w-4">
                            <span className="absolute inline-block animate-ping rounded-full text-xs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4 text-stone-800"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="relative inline-flex h-4 w-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4 text-stone-800"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </span>
                        </sup>
                      </div>

                      {/* Bookmark Menu Section */}
                      <div
                        className={`relative flex py-4 pr-4 ${
                          bookmarkMenu === bookmark.id
                            ? "mb-2 flex-col items-end justify-start"
                            : "items-center justify-end"
                        }`}
                      >
                        {/* Menu Icon */}
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            setBookmarkMenu(
                              bookmarkMenu === bookmark.id ? null : bookmark.id
                            )
                          }
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
                            bookmarkMenu === bookmark.id ? "flex" : "hidden"
                          }`}
                        >
                          <span
                            onClick={() =>
                              dispatch(removeAsyncBookmark(bookmark.id))
                            }
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
                              {bookmark.bookmarkName}
                            </div>
                          </div>
                        </div>

                        {/* Location Name & Price */}
                        <div className="flex flex-col sm:flex-row lg:gap-x-2">
                          {/* Location Name */}
                          <div className="mb-9 flex w-full justify-center sm:mb-0">
                            <div className="relative flex w-full max-w-64 items-center justify-start lg:max-w-55 xl:max-w-64">
                              <div className="absolute -top-4 left-11 flex justify-start rounded-xl bg-white px-4 py-2 font-semibold lg:left-6 xl:left-11">
                                <span className="block">Location Name</span>
                                <span className="ml-2 block">
                                  <ReactCountryFlag
                                    svg
                                    countryCode={bookmark.countryCode}
                                    className="text-lg"
                                  />
                                </span>
                              </div>

                              <div className="h-auto w-full whitespace-nowrap rounded-xl bg-emerald-800 px-2 pb-2 pt-8 text-center text-white shadow-lg">
                                {bookmark.locationName}
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
                                  {bookmark.price}
                                </span>
                                <span className="block font-semibold text-slate-200">
                                  Night
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Down Section */}
                      <div className="w-full shadow-lg">
                        <Link
                          to={`/bookmarks/${bookmark.id}?lat=${
                            bookmark.latitude
                          }&lng=${bookmark.longitude}&hostLocation=${
                            bookmark.locality
                          }&mapTitle=${`${bookmark.bookmarkName.slice(
                            0,
                            5
                          )} Bookmark`}`}
                        >
                          <button
                            className={`block w-full rounded-t-sm ${
                              bookmark?.plusCode === currentBookmark?.plusCode
                                ? "bg-yellow-400 text-stone-800"
                                : "bg-emerald-800 text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between py-2 pl-3 pr-2">
                              <div>
                                <span className="font-semibold">
                                  More Detail
                                </span>
                              </div>
                              <div>
                                <span className="block">
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
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookmarksListPage;
