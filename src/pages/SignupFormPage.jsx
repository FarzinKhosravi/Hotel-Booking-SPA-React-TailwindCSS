import introIcon from "../assets/images/introIcon.png";
import separator from "../assets/images/separator.png";
import BackButton from "../common/BackButton";

function SignupFormPage() {
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
            <form className="rounded-xl bg-slate-200 p-4">
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
                <span className="ml-1 text-sm font-semibold text-emerald-800">
                  You Can Register Through the Form Below :
                </span>
              </div>

              {/* UserName Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="userName"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Username
                  </label>
                </div>

                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900"
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
                    placeholder="Enter Username Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-8 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* FullName Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="fullName"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900"
                    >
                      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                  </span>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter Full Name Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-8 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="email"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Email
                  </label>
                </div>

                <div className="relative flex justify-start">
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
                    placeholder="Enter Email Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="phoneNumber"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Phone Number
                  </label>
                </div>

                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900"
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
                    type="text"
                    placeholder="Enter Phone Number Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Age Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="age"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Age
                  </label>
                </div>

                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 0 1-.82-1.256A8 8 0 0 1 18 9a22.47 22.47 0 0 1-1.228 7.351.75.75 0 1 1-1.417-.49A20.97 20.97 0 0 0 16.5 9 6.5 6.5 0 0 0 10 2.5ZM4.333 4.416a.75.75 0 0 1 .218 1.038A6.466 6.466 0 0 0 3.5 9a7.966 7.966 0 0 1-1.293 4.362.75.75 0 0 1-1.257-.819A6.466 6.466 0 0 0 2 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 0 1 1.038-.219ZM10 6.12a3 3 0 0 0-3.001 3.041 11.455 11.455 0 0 1-2.697 7.24.75.75 0 0 1-1.148-.965A9.957 9.957 0 0 0 5.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 0 1 8.996.084V9.15l-.005.297a.75.75 0 1 1-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 0 0-3-2.965Zm0 2.13a.75.75 0 0 1 .75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 1 1-1.186-.918A13.687 13.687 0 0 0 9.25 9a.75.75 0 0 1 .75-.75Zm3.529 3.698a.75.75 0 0 1 .584.885 18.883 18.883 0 0 1-2.257 5.84.75.75 0 1 1-1.29-.764 17.386 17.386 0 0 0 2.078-5.377.75.75 0 0 1 .885-.584Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    id="age"
                    type="number"
                    placeholder="Enter Age Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <span className="text-sm font-semibold text-emerald-900">
                    Gender
                  </span>
                </div>

                {/* Radio Buttons Container */}
                <div className="flex items-center justify-start rounded-xl bg-slate-300 p-4">
                  <div className="flex">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      className="h-4 w-4 text-emerald-900 focus:ring-emerald-800"
                    />
                    <label htmlFor="male" className="ml-1 text-sm">
                      Male
                    </label>
                  </div>
                  <div className="ml-4 flex">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      className="h-4 w-4 text-emerald-900 focus:ring-emerald-800"
                    />
                    <label htmlFor="female" className="ml-1 text-sm">
                      Female
                    </label>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="password"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Password
                  </label>
                </div>

                <div className="relative flex justify-start">
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
                    id="password"
                    type="text"
                    placeholder="Enter Password Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="confirmPassword"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Confirm Password
                  </label>
                </div>

                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900"
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
                    type="text"
                    placeholder="Enter Confirm Password Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="mb-4">
                <div className="pl-1">
                  <label
                    htmlFor="address"
                    className="cursor-pointer text-sm font-semibold text-emerald-900"
                  >
                    Address
                  </label>
                </div>

                <div className="relative flex justify-start">
                  <span className="pointer-events-none absolute left-2 top-2.5 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-emerald-900"
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
                    placeholder="Enter Address Please..."
                    className="block w-full cursor-pointer rounded-xl border-0 bg-slate-300 from-emerald-700 to-emerald-900 pl-9 text-base text-emerald-900 shadow-lg placeholder:text-sm placeholder:opacity-50 focus:bg-gradient-to-r focus:bg-clip-text"
                  />
                </div>
              </div>

              {/* Avatar Field */}
              <div className="mb-8">
                <div className="pl-1">
                  <span className="text-sm font-semibold text-emerald-900">
                    Avatar
                  </span>
                </div>

                <div className="w-full">
                  <select className="w-full cursor-pointer rounded-xl border-0 bg-slate-300 text-base text-slate-800 shadow-lg">
                    <option value="">Select Your Avatar:</option>
                    <option value="programmer">Programmer 🧑🏼‍💻</option>
                    <option value="bookworm">Bookworm 🤓</option>
                    <option value="adventurer">Adventurer 😎</option>
                  </select>
                </div>
              </div>

              {/* Register Button */}
              <div className="mb-3 w-full">
                <button
                  // type="submit"
                  // disabled={!formik.isValid}
                  onClick={(e) => e.preventDefault()}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-800 p-4 shadow-lg"
                >
                  <span className="block text-white">Register Now</span>
                </button>
              </div>

              {/* Cancel Button */}
              <div className="w-full">
                <button
                  type="button"
                  // onClick={() => navigate("/bookmarks?mapTitle=Bookmarks List")}
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

export default SignupFormPage;
