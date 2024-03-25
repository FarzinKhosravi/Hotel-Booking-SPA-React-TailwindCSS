import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import BackButton from "../common/BackButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Wellcome from "../common/Wellcome";

const initialValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
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

  subject: Yup.string().required("Please Enter Your Subject ⚡"),

  message: Yup.string().required("Please Enter Your Message ⚡"),
});

function ContactUsPage() {
  const onSubmit = () => {
    toast.success("Your Message has been Successfully Sent 🥳");

    navigate("/");
  };

  const navigate = useNavigate();

  const [showGuide, setShowGuide] = useState(false);

  const [userData, setUserData] = useState(null);

  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const formik = useFormik({
    initialValues: userData || initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (loggedInUser) {
      const { fullName, phoneNumber } = loggedInUser;

      setUserData({
        fullName,
        phoneNumber,
        email: "",
        subject: "",
        message: "",
      });
    }
  }, [loggedInUser]);

  console.log("values:", formik.values);
  console.log("errors:", formik.errors);
  console.log("touched:", formik.touched);

  return (
    <section className="mb-20 min-h-screen px-4">
      <div>
        <Wellcome />

        {/* Contact Us Form Section */}
        <div>
          {/* Contact Us Form Title */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="pl-1">
                <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                  Contact Us Form
                </span>
              </div>
              <div className="pr-2">
                <BackButton />
              </div>
            </div>
          </div>

          {/* Contact Us Specs */}
          <div className="flex flex-col rounded-lg bg-slate-200 p-4 shadow-lg dark:bg-slate-800">
            {/* Contact Info Section */}
            <div className="mb-6">
              <div className="mb-1 pl-1 font-semibold text-emerald-900 dark:text-white">
                <span>Contact Info</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-300 p-3 text-emerald-900 shadow-lg dark:bg-slate-700 dark:text-slate-200">
                {/* Company Email Address */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-white dark:bg-slate-600">
                    <EnvelopeIcon className="h-4 w-4" />
                  </div>
                  <div className="italic">
                    <span>Info@gmail.com</span>
                  </div>
                </div>

                {/* Company Phone */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-white dark:bg-slate-600">
                    <PhoneIcon className="h-4 w-4" />
                  </div>
                  <div className="italic">
                    <span>+980901-123456</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Form Section */}
            <div>
              <div className="mb-1 pl-1 font-semibold text-emerald-900 dark:text-white">
                <span>Contact Us Form</span>
              </div>

              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="rounded-xl bg-slate-300 p-4 shadow-lg dark:bg-slate-700"
                >
                  {/* Contact Us Form Description */}
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
                    <span className="ml-1 mt-0.5 text-sm font-semibold text-emerald-800 dark:text-white">
                      We are Open for any Suggestion Or Just to Have a Chat :
                    </span>
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
                        className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-8 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
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
                        className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                      />
                    </div>

                    {/* Show Error For Email Field */}
                    <div>
                      {formik.errors.email && formik.touched.email && (
                        <span className="block w-full pl-2 font-semibold text-red-600">
                          {formik.errors.email}
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
                          onMouseOver={() => setShowGuide(true)}
                          onMouseLeave={() => setShowGuide(false)}
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
                          className={`absolute right-0 top-5 z-50 rounded-xl bg-emerald-800 px-3 py-2 text-xs text-white dark:bg-slate-500
                            ${showGuide ? "block" : "hidden"}
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
                        className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                      />
                    </div>

                    {/* Show Error For Phone Number Field */}
                    <div>
                      {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber && (
                          <span className="block w-full pl-2 font-semibold text-red-600">
                            {formik.errors.phoneNumber}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Subject Section */}
                  <div className="mb-4">
                    {/* Subject Field Title */}
                    <div className="pl-1">
                      <label
                        htmlFor="subject"
                        className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                      >
                        Subject
                      </label>
                    </div>

                    {/* Subject Field */}
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
                            d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                        placeholder="Enter Subject Please..."
                        className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 pl-8 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                      />
                    </div>

                    {/* Show Error For FullName Field */}
                    <div>
                      {formik.errors.subject && formik.touched.subject && (
                        <span className="block w-full pl-2 font-semibold text-red-600">
                          {formik.errors.subject}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message Section */}
                  <div className="mb-8">
                    {/* Message Field Title */}
                    <div className="pl-1">
                      <label
                        htmlFor="message"
                        className="cursor-pointer text-sm font-semibold text-emerald-900 dark:text-slate-200"
                      >
                        Message
                      </label>
                    </div>

                    {/* Message Field */}
                    <div className="relative mb-2 flex justify-start">
                      <textarea
                        id="message"
                        name="message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        className="block w-full cursor-pointer resize-none rounded-xl border-0 bg-slate-300 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200 dark:placeholder:opacity-70"
                        placeholder="Write Your Message..."
                      ></textarea>
                    </div>

                    {/* Show Error For FullName Field */}
                    <div>
                      {formik.errors.message && formik.touched.message && (
                        <span className="block w-full pl-2 font-semibold text-red-600">
                          {formik.errors.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Send Message Button */}
                  <div className="mb-3 w-full">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-500 dark:bg-slate-600 dark:disabled:bg-slate-400"
                    >
                      <span className="block text-white">Send Message</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsPage;
