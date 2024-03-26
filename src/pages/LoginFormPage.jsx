import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import BackButton from "../common/BackButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import getUsers from "./../services/getUsersService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createLoggedInUserData } from "../features/loggedInUser/loggedInUserSlice";
import saveLocalStorage from "./../localStorage/saveLocalStorage";
import Wellcome from "../common/Wellcome";

const USER_DATA = "USER_DATA";

const fields = [
  { name: "email", message: "Your Email is Unrecognized 🧐" },
  { name: "password", message: "Your Password is Unrecognized 🧐" },
];

let isContinue;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Please Enter Your Email ⚡"),

  password: Yup.string().required("Please Enter Your Password ⚡"),
});

function LoginFormPage() {
  const onSubmit = (userData) => {
    // *** CHECK !! ***

    async function checkUserData() {
      function generateErrorMessage(field) {
        const existsUserData = users.find(
          (user) => user[field] === userData[field]
        );

        console.log("existsUserData:", existsUserData);

        if (!existsUserData) {
          const { message } = fields.find((item) => item.name === field);

          console.log("errorMessage:", message);

          toast.error(
            `Your ${field[0].toUpperCase() + field.slice(1)} is Unrecognized 🧐`
          );

          setUnrecognizedData({
            ...unrecognizedData,
            [field]: message,
          });

          return false;
        }

        return true;
      }

      const { data: users } = await getUsers();

      if (users) {
        isContinue = generateErrorMessage("email");

        console.log("isContinue:", isContinue);

        if (isContinue) {
          isContinue = generateErrorMessage("password");
        }

        if (isContinue) {
          console.log("Authentication was successful !!");

          const foundUserData = users.find(
            (user) => user.email === userData.email
          );

          if (foundUserData) {
            const {
              username,
              avatar,
              fullName,
              phoneNumber,
              gender,
              id,
              hotelsReserved,
            } = foundUserData;

            console.log("foundUserData:", foundUserData);

            dispatch(
              createLoggedInUserData({
                username,
                avatar,
                fullName,
                phoneNumber,
                gender,
                id,
                hotelsReserved,
              })
            );

            saveLocalStorage(USER_DATA, {
              username,
              avatar,
              fullName,
              phoneNumber,
              gender,
              id,
              hotelsReserved,
            });

            if (userRedirect) redirectSwitcher(hotelsReserved);
            else navigate("/");
          }
        }
      }
    }

    checkUserData();
  };

  const location = useLocation();

  console.log("LOCATION:", location);

  const dispatch = useDispatch();

  const [unrecognizedData, setUnrecognizedData] = useState({
    email: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [userRedirect, setUserRedirect] = useState("");

  const [userDetail, setUserDetail] = useState(null);

  const formik = useFormik({
    initialValues: userDetail || initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const [searchParams] = useSearchParams();

  const username = searchParams.get("username");

  const redirect = searchParams.get("redirect");

  const hotelId = searchParams.get("hotelId");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const { data: users } = await getUsers();

      if (users) {
        const foundUser = users.find((user) => user.username === username);

        console.log("foundUser:", foundUser);

        if (foundUser) setUserDetail(foundUser);
      }
    }

    if (username) fetchUser();
  }, [username]);

  // *** CHECK !! ***

  const { email, password } = formik.values;

  useEffect(() => {
    setUnrecognizedData({ ...unrecognizedData, email: "" });
  }, [email]);

  useEffect(() => {
    setUnrecognizedData({ ...unrecognizedData, password: "" });
  }, [password]);

  // *** *** ***

  useEffect(() => {
    if (redirect) setUserRedirect(redirect);
  }, []);

  console.log("USER_REDIRECT", userRedirect);

  function redirectSwitcher(hotelsReserved) {
    console.log("*** INVOKE redirectSwitcher ***");

    switch (userRedirect) {
      case "bookmarksList":
        navigate("/bookmarks?mapTitle=Bookmarks List");

        break;

      case "addNewBookmark": {
        const { latitude, longitude, locationName, price } = location.state;

        navigate(
          `/bookmarks/add?lat=${latitude}&lng=${longitude}&locationName=${locationName}&price=${price}&mapTitle=Bookmark Form`
        );

        break;
      }

      case "listOrForm": {
        const foundAlreadyReservedHotel = hotelsReserved.find(
          (hotel) => Number(hotel.id) === Number(hotelId)
        );

        if (foundAlreadyReservedHotel) {
          // User Redirect to List of Hotels

          toast.error(
            "You Have Already Booked This Hotel; Please Book Another Hotel 🧐"
          );

          navigate("/hotels-list");
        }
        // User Redirect to Hotel Booking Form
        else navigate(`/hotel-booking/${hotelId}`);

        break;
      }

      default:
        return;
    }
  }

  console.log("REDIRECT:", redirect);
  console.log("hotelID:", hotelId);

  return (
    <section className="mx-auto mb-20 min-h-screen px-4 md:max-w-screen-md">
      <div>
        <Wellcome />

        {/* Login Form Section */}
        <div>
          {/* Login Form Title */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="pl-1">
                <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                  Login Form
                </span>
              </div>
              <div className="pr-2">
                <BackButton />
              </div>
            </div>
          </div>

          <div>
            <form
              onSubmit={formik.handleSubmit}
              className="rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-slate-800"
            >
              {/* Login Form Description */}
              <div className="mb-6 flex justify-start">
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
                <span className="ml-1 text-sm font-semibold text-emerald-800 dark:text-white">
                  You Can Login Through the Form Below :
                </span>
              </div>

              {/* Email Section */}
              <div className="mb-4">
                {/* Email Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="email"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Email
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative mb-2 flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900 dark:text-slate-200"
                    >
                      <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                      <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Enter Email Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                </div>

                {/* Show Error For Email Field */}
                <div>
                  {formik.errors.email && formik.touched.email && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.email}
                    </span>
                  )}

                  {unrecognizedData.email && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {unrecognizedData.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Password Section */}
              <div className="mb-8">
                {/* Password Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="password"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Password
                  </label>
                </div>

                {/* Password Field */}
                <div className="relative mb-2 flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900 dark:text-slate-200"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Enter Password Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                  <div
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute right-2 top-3 cursor-pointer"
                  >
                    <span
                      className={`pointer-events-none ${
                        !isShowPassword ? "block" : "hidden"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-emerald-900 dark:text-slate-200"
                      >
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path
                          fillRule="evenodd"
                          d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span
                      className={`pointer-events-none  ${
                        isShowPassword ? "block" : "hidden"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-emerald-900 dark:text-slate-200"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                          clipRule="evenodd"
                        />
                        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Show Error For Password Field */}
                <div>
                  {formik.errors.password && formik.touched.password && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.password}
                    </span>
                  )}

                  {unrecognizedData.password && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {unrecognizedData.password}
                    </span>
                  )}
                </div>
              </div>

              {/* Login Button */}
              <div className="mb-3 w-full">
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-500 dark:bg-slate-700 dark:disabled:bg-slate-400"
                >
                  <span className="block text-white">Continue</span>
                </button>
              </div>

              {/* Cancel Button */}
              <div className="mb-4 w-full">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="block w-full rounded-xl bg-red-700 shadow-lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-full p-3">
                      <span className="block text-white">Cancel</span>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-center text-emerald-800 dark:text-white">
                <span className="block">Don&apos;t Have an Account?</span>
                <Link
                  to="/signup"
                  className="ml-1 border-b-2 border-yellow-500"
                >
                  Signup Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginFormPage;
