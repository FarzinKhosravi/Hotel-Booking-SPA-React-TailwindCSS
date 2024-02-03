import { useNavigate } from "react-router-dom";
import introIcon from "../assets/images/introIcon.png";
import separator from "../assets/images/separator.png";
import BackButton from "../common/BackButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Please Enter Your Email ⚡"),

  password: Yup.string().required("Please Enter Your Password ⚡"),
});

function LoginFormPage() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    // onSubmit,
    validateOnMount: true,
  });

  const navigate = useNavigate();

  console.log("values:", formik.values);
  console.log("errors:", formik.errors);
  console.log("touched:", formik.touched);

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
              //   onSubmit={formik.handleSubmit}
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
                </div>
              </div>

              {/* Login Button */}
              <div className="mb-3 w-full">
                <button
                  //   type="submit"
                  onClick={(e) => e.preventDefault()}
                  disabled={!formik.isValid}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg disabled:bg-gray-500"
                >
                  <span className="block text-white">Continue</span>
                </button>
              </div>

              {/* Cancel Button */}
              <div className="w-full">
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginFormPage;
