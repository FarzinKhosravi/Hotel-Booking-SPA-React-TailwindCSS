import { useFormik } from "formik";
import BackButton from "../../common/BackButton";
import * as Yup from "yup";
import getBookmarksList from "../../services/getBookmarksListService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useBookmarkDetail from "../../hooks/useBookmarkDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAsyncBookmark } from "../../features/bookmarksList/bookmarksListSlice";
import Loader from "./../Loader";

const initialValues = {
  bookmarkName: "",
  bookmarkDescription: "",
};

const validationSchema = Yup.object({
  bookmarkName: Yup.string()
    .required("Please Update Your Bookmark Name ⚡")
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

function UpdateBookmark() {
  const onSubmit = (bookmarkData) => {
    const { bookmarkName, bookmarkDescription } = bookmarkData;

    const updatedBookmark = {
      bookmarkName,
      bookmarkDescription,
    };

    const updatedBookmarkId = bookmarkData.id;

    console.log("updatedBookmark:", updatedBookmark);

    async function fetchBookmarks() {
      const { data: bookmarks } = await getBookmarksList();

      console.log("fetch bookmarks:", bookmarks);

      const duplicateBookmark = bookmarks.find(
        (bookmark) => bookmark.bookmarkName === updatedBookmark.bookmarkName
      );

      if (duplicateBookmark) {
        setDuplicateBookmarkName("This Name has Already Been Chosen ⚡");

        toast.error("Your Bookmark Name is Duplicate 🧐");
      } else {
        console.log("UPDATED SERVER...");

        updateUserBookmark();

        navigate("/bookmarks?mapTitle=Bookmarks List");
      }
    }

    async function updateUserBookmark() {
      dispatch(
        updateAsyncBookmark({
          updatedBookmarkId,
          updatedBookmark,
          loggedInUser,
        })
      );
    }

    fetchBookmarks();
  };

  const { loading, bookmarkDetail } = useBookmarkDetail();

  const formik = useFormik({
    initialValues: bookmarkDetail || initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [duplicateBookmarkName, setDuplicateBookmarkName] = useState("");

  useEffect(() => {
    setDuplicateBookmarkName("");
  }, [formik.values.bookmarkName]);

  console.log("LOADING:", loading);

  console.log("BOOKMARK_DETAIL:", bookmarkDetail);

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {/* Update Bookmark Form Title */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="pl-1">
                  <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                    Update Bookmark Form
                  </span>
                </div>
                <div className="pr-2">
                  <BackButton />
                </div>
              </div>
            </div>

            {/* Update Bookmark Form */}
            <div className="pr-2">
              <form
                onSubmit={formik.handleSubmit}
                className="rounded-xl bg-slate-200 p-4 dark:bg-slate-800"
              >
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
                      Please Edit Your Bookmark Information :
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
                                "Please Update Your Bookmark Name ⚡" &&
                              formik.touched.bookmarkName
                                ? "Don't Forget Name of Bookmark 💡"
                                : "Update Your Bookmark Name..."
                            }
                            className={`block h-16 w-full rounded-xl border-0 bg-emerald-800 from-emerald-700 to-emerald-900 pb-6 pt-12 text-base text-white shadow-lg placeholder:text-white focus:bg-gradient-to-r focus:bg-clip-text focus:text-emerald-700 focus:placeholder:text-slate-500 focus:placeholder:opacity-50 dark:bg-slate-700 dark:from-slate-700 dark:to-slate-800 dark:focus:text-white sm:h-auto sm:pb-2 sm:pl-44 sm:pt-2  ${
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
                            placeholder="Update Your Bookmark Description (Optional) ..."
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

                {/* Update Bookmark Button */}
                <div className="mb-6 w-full">
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="block w-full rounded-xl bg-emerald-800 shadow-lg disabled:bg-gray-500 dark:bg-slate-700 dark:disabled:bg-slate-400"
                  >
                    <div className="flex items-center justify-center">
                      <div className="w-full p-4">
                        <span className="block text-white">
                          Update Your Bookmark
                          <sup>
                            <div className="ml-2 inline-flex items-start justify-end">
                              <span className="text-xs font-thin text-white">{`To ${formik.values?.bookmarkName}`}</span>
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
                    onClick={() =>
                      navigate("/bookmarks?mapTitle=Bookmarks List")
                    }
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
        )}
      </div>
    </div>
  );
}

export default UpdateBookmark;
