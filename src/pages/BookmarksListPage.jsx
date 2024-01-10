import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncBookmarksList } from "../features/bookmarksList/bookmarksListSlice";
import ReactCountryFlag from "react-country-flag";

function BookmarksListPage() {
  const { loading, error, bookmarksList } = useSelector(
    (state) => state.bookmarksList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncBookmarksList());
  }, []);

  console.log("bookmarksList:", bookmarksList);
  console.log("loading:", loading);

  return (
    <section>
      <div>
        {/* Bookmarks List Title */}
        <div className="mb-12 px-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                Bookmarks List
              </span>
            </div>
            <div>
              <span>📍</span>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        <div>
          {/* Container of Bookmarks */}
          <div className="flex flex-col gap-y-16">
            {bookmarksList?.map((bookmark) => {
              return (
                <div
                  key={bookmark.id}
                  className="overflow-hidden rounded-xl bg-slate-200 shadow-md last:mb-0"
                >
                  {/* Top Section */}
                  <div className="mb-8 flex flex-col px-4 pb-4 pt-6">
                    {/* Bookmark Name */}
                    <div className="mb-16 flex items-center justify-center">
                      <div className="max-w-64 relative mt-4 flex w-full items-center justify-start sm:mx-auto">
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
                        <div className="max-w-64 lg:max-w-55 xl:max-w-64 relative flex w-full items-center justify-start">
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
                        <div className="max-w-64 lg:max-w-55 xl:max-w-64 relative flex w-full items-center justify-start">
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
                    <button className="block w-full rounded-t-sm bg-emerald-800 text-white">
                      <div className="flex items-center justify-between py-2 pl-3 pr-2">
                        <div>
                          <span className="font-semibold">More Detail</span>
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookmarksListPage;
