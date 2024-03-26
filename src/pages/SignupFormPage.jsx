import { useEffect, useRef, useState } from "react";
import BackButton from "../common/BackButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import getUsers from "../services/getUsersService";
import createUser from "../services/createUserService";
import { Link, useNavigate } from "react-router-dom";
import Wellcome from "../common/Wellcome";

const fields = [
  { name: "username", message: "Your Username is Already Selected 🧐" },
  { name: "email", message: "Your Email is Not Allowed 🧐" },
  { name: "password", message: "Your Password is Not Allowed 🧐" },
];

let isContinue;

const initialValues = {
  username: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  age: 18,
  gender: "",
  password: "",
  confirmPassword: "",
  address: "",
  avatar: "",
  terms: false,
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Please Enter Your Username ⚡")
    .min(3, "Username Length Too Short 🧐")
    .max(10, "Username Length Too Long 🧐"),

  fullName: Yup.string()
    .required("Please Enter Your Full Name ⚡")
    .max(20, "Full Name Length Too Long 🧐")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Full Name Can Only Contain Latin Letters 🧐"
    ),

  email: Yup.string()
    .required("Please Enter Your Email ⚡")
    .email("Invalid Email Format 🧐"),

  phoneNumber: Yup.string()
    .required("Please Enter Your Phone Number ⚡")
    .matches(/^[0-9]{4}-[0-9]{7}$/, "Phone Number is Not Valid 🧐"),

  age: Yup.number()
    .required("Please Enter Your Age ⚡")
    .integer("The Entered Age is Non-Integer 🧐")
    .min(18, "The Entered Age is Not Allowed 🧐")
    .max(80, "The Entered Age More Than 80 🧐"),

  gender: Yup.string().required("Please Enter Your Gender ⚡"),

  password: Yup.string()
    .required("Please Enter Your Password ⚡")
    .min(10, "Password is Too Short (Should Be 10 Digit Minimum) 🧐")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character 🧐"
    ),

  confirmPassword: Yup.string()
    .required("Please Enter Your Password Confirm ⚡")
    .oneOf([Yup.ref("password"), null], "Password Must Match 🧐"),

  avatar: Yup.string().required("Please Enter Your Avatar ⚡"),

  terms: Yup.boolean().oneOf(
    [true],
    "You Must Accept All The Terms & Conditions 🧐"
  ),
});

function SignupFormPage() {
  const onSubmit = (userData) => {
    async function checkDuplicateFields() {
      function generateErrorMessage(field) {
        const foundDuplicateField = users.find(
          (user) => user[field] === userData[field]
        );

        console.log("duplicateField_Found:", foundDuplicateField);

        if (foundDuplicateField) {
          const { message } = fields.find((item) => item.name === field);

          console.log("errorMessage:", message);

          toast.error(
            `Your ${field[0].toUpperCase() + field.slice(1)} is Duplicate 🧐`
          );

          setDuplicateFields({
            ...duplicateFields,
            [field]: message,
          });

          return false;
        }

        return true;
      }

      const { data: users } = await getUsers();

      console.log("USERS:", users);

      // *** CHECK !! ***

      if (users) {
        isContinue = generateErrorMessage("username");

        console.log("isContinue:", isContinue);

        if (isContinue) {
          isContinue = generateErrorMessage("email");
        }

        if (isContinue) {
          isContinue = generateErrorMessage("password");
        }

        if (isContinue) {
          console.log("SAVED USER_DATA IN DATABASE...");

          // console.log("CHECK_USER_DATA:", { ...userData, hotelsReserved: [] });

          const { data } = await createUser({
            ...userData,
            hotelsReserved: [],
          });

          console.log("CREATE_USER_IN_DATABASE...", data);

          navigate(`/login?username=${userData.username}`, { replace: true });
        }
      }
    }

    checkDuplicateFields();
  };

  const [showGuide, setShowGuide] = useState("");

  const [duplicateFields, setDuplicateFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    isShowPassword: false,
    isShowConfirmPassword: false,
  });

  const { isShowPassword, isShowConfirmPassword } = showPassword;

  const navigate = useNavigate();

  const ageFieldRef = useRef();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  // *** CHECK !! ***

  const { username, email, password } = formik.values;

  useEffect(() => {
    setDuplicateFields({ ...duplicateFields, username: "" });
  }, [username]);

  useEffect(() => {
    setDuplicateFields({ ...duplicateFields, email: "" });
  }, [email]);

  useEffect(() => {
    setDuplicateFields({ ...duplicateFields, password: "" });
  }, [password]);

  // *** *** ***

  useEffect(() => {
    console.log("INPUT_REF:", ageFieldRef.current);

    ageFieldRef.current.addEventListener("keypress", (event) => {
      if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,2}$/)) {
        // block the input if result does not match
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });
  }, []);

  const showPasswordHandler = (e) => {
    e.stopPropagation();

    console.log("clicked on show password button !!", e.target);

    const field = e.target.dataset.field;

    console.log(field);

    switch (field) {
      case "password":
        setShowPassword({ ...showPassword, isShowPassword: !isShowPassword });

        break;

      case "confirmPassword":
        setShowPassword({
          ...showPassword,
          isShowConfirmPassword: !isShowConfirmPassword,
        });

        break;

      default:
        return;
    }
  };

  console.log("values:", formik.values);
  console.log("errors:", formik.errors);
  console.log("touched:", formik.touched);

  console.log("duplicateFields:", duplicateFields);

  return (
    <section className="mx-auto mb-20 min-h-screen px-4 md:max-w-screen-md">
      <div>
        <Wellcome />

        {/* Signup Form Section */}
        <div>
          {/* Signup Form Title */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="pl-1">
                <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                  SignUp Form
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
              {/* Signup Form Description */}
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
                  You Can Register Through the Form Below :
                </span>
              </div>

              {/* UserName Section */}
              <div className="mb-4">
                {/* UserName Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="userName"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Username
                  </label>
                </div>

                {/* UserName Field */}
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
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    id="userName"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Enter Username Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-8 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                </div>

                {/* Show Error For UserName Field */}
                <div>
                  {formik.errors.username && formik.touched.username && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.username}
                    </span>
                  )}

                  {duplicateFields.username && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {duplicateFields.username}
                    </span>
                  )}
                </div>
              </div>

              {/* FullName Section */}
              <div className="mb-4">
                {/* FullName Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="fullName"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Full Name
                  </label>
                </div>

                {/* FullName Field */}
                <div className="relative mb-2 flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900 dark:text-slate-200"
                    >
                      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                  </span>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    placeholder="Enter Full Name Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-8 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                </div>

                {/* Show Error For FullName Field */}
                <div>
                  {formik.errors.fullName && formik.touched.fullName && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.fullName}
                    </span>
                  )}
                </div>
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

                  {duplicateFields.email && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {duplicateFields.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Number Section */}
              <div className="mb-4">
                {/* Phone Number Field Title */}
                <div className="flex items-center justify-between px-1">
                  <label
                    htmlFor="phoneNumber"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Phone Number
                  </label>

                  <div className="relative flex w-1/2 flex-col items-end">
                    <span
                      onMouseOver={(event) =>
                        event.target.dataset.id === "phoneNumber"
                          ? setShowGuide("phoneNumber")
                          : ""
                      }
                      onMouseLeave={() => setShowGuide("")}
                      className="block h-4 w-4 cursor-pointer"
                      data-id="phoneNumber"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="pointer-events-none h-4 w-4 text-sky-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span
                      className={`absolute right-0 top-5 z-50 rounded-xl bg-emerald-800 px-3 py-2 text-xs text-white dark:bg-slate-600
                      ${showGuide === "phoneNumber" ? "block" : "hidden"}
                      `}
                    >
                      <span className="inline-block h-1 w-1 rounded-full bg-white"></span>
                      <span className="ml-1">Format Example:</span>
                      <span className="block text-center text-yellow-400">
                        0123-4567891
                      </span>
                    </span>
                  </div>
                </div>

                {/* Phone Number Field */}
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
                        d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    placeholder="Enter Phone Number Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                </div>

                {/* Show Error For Phone Number Field */}
                <div>
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Age Section */}
              <div className="mb-4">
                {/* Age Field Title */}
                <div className="flex items-center justify-between px-1">
                  <label
                    htmlFor="age"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Age
                  </label>

                  <div className="relative flex w-1/2 flex-col items-end">
                    <span
                      onMouseOver={(event) =>
                        event.target.dataset.id === "age"
                          ? setShowGuide("age")
                          : ""
                      }
                      onMouseLeave={() => setShowGuide("")}
                      className="block h-4 w-4 cursor-pointer"
                      data-id="age"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="pointer-events-none h-4 w-4 text-sky-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span
                      className={`// absolute right-0 top-5 z-50 rounded-xl bg-emerald-800 px-3 py-2 text-xs text-white
                      dark:bg-slate-600 ${
                        showGuide === "age" ? "block" : "hidden"
                      }
                      `}
                    >
                      <span className="inline-block h-1 w-1 rounded-full bg-white"></span>
                      <span className="ml-0.5">
                        You can enter your desired age by using the
                      </span>
                      <span className="text-yellow-400">
                        &nbsp;up and down arrows
                      </span>
                      &nbsp;or by
                      <span className="text-yellow-400">
                        &nbsp;typing a number
                      </span>
                      &nbsp;!
                    </span>
                  </div>
                </div>

                {/* Age Field */}
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
                        d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 0 1-.82-1.256A8 8 0 0 1 18 9a22.47 22.47 0 0 1-1.228 7.351.75.75 0 1 1-1.417-.49A20.97 20.97 0 0 0 16.5 9 6.5 6.5 0 0 0 10 2.5ZM4.333 4.416a.75.75 0 0 1 .218 1.038A6.466 6.466 0 0 0 3.5 9a7.966 7.966 0 0 1-1.293 4.362.75.75 0 0 1-1.257-.819A6.466 6.466 0 0 0 2 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 0 1 1.038-.219ZM10 6.12a3 3 0 0 0-3.001 3.041 11.455 11.455 0 0 1-2.697 7.24.75.75 0 0 1-1.148-.965A9.957 9.957 0 0 0 5.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 0 1 8.996.084V9.15l-.005.297a.75.75 0 1 1-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 0 0-3-2.965Zm0 2.13a.75.75 0 0 1 .75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 1 1-1.186-.918A13.687 13.687 0 0 0 9.25 9a.75.75 0 0 1 .75-.75Zm3.529 3.698a.75.75 0 0 1 .584.885 18.883 18.883 0 0 1-2.257 5.84.75.75 0 1 1-1.29-.764 17.386 17.386 0 0 0 2.078-5.377.75.75 0 0 1 .885-.584Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    ref={ageFieldRef}
                    id="age"
                    type="number"
                    min="18"
                    max="80"
                    name="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    placeholder="Enter Age Please..."
                    className="remove-arrow m-0 block w-full cursor-pointer appearance-none rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                </div>

                {/* Show Error For Age Field */}
                <div>
                  {formik.errors.age && formik.touched.age && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.age}
                    </span>
                  )}
                </div>
              </div>

              {/* Gender Section */}
              <div className="mb-4">
                {/* Gender Field Title */}
                <div className="pl-1">
                  <span className="text-sm font-semibold text-emerald-900 dark:text-slate-200">
                    Gender
                  </span>
                </div>

                {/* Radio Buttons Container */}
                <div className="mb-1 flex items-center justify-start rounded-xl bg-slate-300 p-4 shadow-lg dark:bg-slate-700">
                  <div className="flex">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value="male"
                      checked={formik.values.gender === "male"}
                      className="h-4 w-4 text-emerald-900 focus:ring-emerald-800 dark:text-yellow-500 dark:focus:ring-yellow-400"
                    />
                    <label
                      htmlFor="male"
                      className="ml-1 text-sm dark:text-slate-200"
                    >
                      Male
                    </label>
                  </div>
                  <div className="ml-4 flex">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value="female"
                      checked={formik.values.gender === "female"}
                      className="h-4 w-4 text-emerald-900 focus:ring-emerald-800 dark:text-yellow-500 dark:focus:ring-yellow-400"
                    />
                    <label
                      htmlFor="female"
                      className="ml-1 text-sm dark:text-slate-200"
                    >
                      Female
                    </label>
                  </div>
                </div>

                {/* Show Error For Gender Field */}
                <div>
                  {formik.errors.gender && formik.touched.gender && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.gender}
                    </span>
                  )}
                </div>
              </div>

              {/* Password Section */}
              <div className="mb-4">
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
                    onClick={showPasswordHandler}
                    data-field="password"
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

                  {duplicateFields.password && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {duplicateFields.password}
                    </span>
                  )}
                </div>
              </div>

              {/* Confirm Password Section */}
              <div className="mb-4">
                {/* Confirm Password Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="confirmPassword"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Confirm Password
                  </label>
                </div>

                {/* Confirm Password Field */}
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
                        d="M18 5.25a2.25 2.25 0 0 0-2.012-2.238A2.25 2.25 0 0 0 13.75 1h-1.5a2.25 2.25 0 0 0-2.238 2.012c-.875.092-1.6.686-1.884 1.488H11A2.5 2.5 0 0 1 13.5 7v7h2.25A2.25 2.25 0 0 0 18 11.75v-6.5ZM12.25 2.5a.75.75 0 0 0-.75.75v.25h3v-.25a.75.75 0 0 0-.75-.75h-1.5Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm6.874 4.166a.75.75 0 1 0-1.248-.832l-2.493 3.739-.853-.853a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.154-.114l3-4.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    id="confirmPassword"
                    type={isShowConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Enter Confirm Password Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                  <div
                    onClick={showPasswordHandler}
                    data-field="confirmPassword"
                    className="absolute right-2 top-3 cursor-pointer"
                  >
                    <span
                      className={`pointer-events-none ${
                        !isShowConfirmPassword ? "block" : "hidden"
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
                        isShowConfirmPassword ? "block" : "hidden"
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

                {/* Show Error For Confirm Password Field */}
                <div>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <span className="block w-full pl-2 font-semibold text-red-600">
                        {formik.errors.confirmPassword}
                      </span>
                    )}
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-4">
                {/* Address Field Title */}
                <div className="pl-1">
                  <label
                    htmlFor="address"
                    className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                  >
                    Address
                  </label>
                </div>

                {/* Address Field */}
                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900 dark:text-slate-200"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    placeholder="Enter Address Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                  />
                </div>
              </div>

              {/* Avatar Section */}
              <div className="mb-6">
                {/* Avatar Field Title */}
                <div className="pl-1">
                  <span className="text-sm font-semibold text-emerald-900 dark:text-slate-200">
                    Avatar
                  </span>
                </div>

                {/* Avatar Field */}
                <div className="mb-2 w-full">
                  <select
                    name="avatar"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.avatar}
                    className="w-full cursor-pointer rounded-xl border-0 bg-slate-300 text-base text-emerald-900 shadow-lg dark:bg-slate-700 dark:text-slate-200"
                  >
                    <option value="">Select Your Avatar:</option>
                    <option value="🧑🏼‍💻">Programmer 🧑🏼‍💻</option>
                    <option value="🤓">Bookworm 🤓</option>
                    <option value="😎">Adventurer 😎</option>
                  </select>
                </div>

                {/* Show Error For Avatar Field */}
                <div>
                  {formik.errors.avatar && formik.touched.avatar && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.avatar}
                    </span>
                  )}
                </div>
              </div>

              {/* Terms & Conditions Section */}
              <div className="mb-8">
                {/* Terms & Conditions Field */}
                <div className="flex items-center justify-start rounded-xl bg-slate-300 p-4 shadow-lg dark:bg-slate-700">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={true}
                    checked={formik.values.terms}
                    className="rounded-md text-emerald-900 focus:ring-emerald-800 dark:text-yellow-500 dark:focus:ring-yellow-600"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-emerald-900 dark:text-slate-200"
                  >
                    I Accept All Terms & Conditions
                  </label>
                </div>

                {/* Show Error For Terms & Conditions Field */}
                <div>
                  {formik.errors.terms && formik.touched.terms && (
                    <span className="block w-full pl-2 font-semibold text-red-600">
                      {formik.errors.terms}
                    </span>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <div className="mb-3 w-full">
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-500 dark:bg-slate-700 dark:disabled:bg-slate-400"
                >
                  <span className="block text-white">Register Now</span>
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
                <span className="block">Already Have an Account?</span>
                <Link to="/login" className="ml-1 border-b-2 border-yellow-500">
                  Login Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupFormPage;
