import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import introIcon from "../assets/images/introIcon.png";
import separator from "../assets/images/separator.png";
import BackButton from "../common/BackButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import getUsers from "./../services/getUsersService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createLoggedInUserData } from "../features/loggedInUser/loggedInUserSlice";
import saveLocalStorage from "./../localStorage/saveLocalStorage";

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
            const { username, avatar, fullName, phoneNumber, gender } =
              foundUserData;

            dispatch(createLoggedInUserData(foundUserData));

            saveLocalStorage(USER_DATA, {
              username,
              avatar,
              fullName,
              phoneNumber,
              gender,
            });

            console.log("userRedirect:::", userRedirect);

            if (userRedirect) redirectSwitcher(userRedirect);
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

  console.log("REDIRECT", redirect);

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

  function redirectSwitcher(userRedirect) {
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

      default:
        return;
    }
  }

  return (
    <section className="min-h-screen px-4">
      <div>
        {/* Intro Section */}
        <div className="mb-16 flex flex-col">
          <div className="mb-2 flex flex-col">
            <span className="flex items-center justify-center font-Parisienne text-2xl text-indigo-950">
              Welcome To
            </span>
            <div className="relative mx-auto flex h-20 max-w-[300px] items-center justify-center">
              <h2 className="mr-4 font-Parisienne text-2xl text-indigo-950">
                Hotel Booking Site
              </h2>
              <div className="absolute -top-1.25 right-4">
                <img className="w-10" src={introIcon} alt="intro-Icon" />
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <img className="block w-36" src={separator} alt="separator" />
          </div>

          <div className="flex w-full items-center justify-center">
            <span className="block bg-img-home bg-cover bg-center bg-no-repeat font-Parisienne text-xl text-indigo-950">
              We Wish You a Pleasant Trip
            </span>
          </div>
        </div>

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
              className="rounded-xl bg-slate-200 p-4"
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
                <span className="ml-1 text-sm font-semibold text-emerald-800">
                  You Can Login Through the Form Below :
                </span>
              </div>

              {/* Email Section */}
              <div className="mb-4">
                {/* Email Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="email"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
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
                      className="h-5 w-5 text-emerald-900"
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
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
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
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
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
                      className="h-5 w-5 text-emerald-900"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Enter Password Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
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
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-500"
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

              <div className="flex items-center justify-center text-emerald-800">
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
