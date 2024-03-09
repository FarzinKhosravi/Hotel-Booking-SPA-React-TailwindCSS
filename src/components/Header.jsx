import {
  HomeIcon,
  BuildingOfficeIcon,
  PhoneArrowDownLeftIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  LifebuoyIcon,
  GlobeAsiaAustraliaIcon,
  StarIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "./../hooks/useOutsideClick";
import { NavLink, useNavigate } from "react-router-dom";

import appLogo from "../assets/images/appLogo.png";
import loginSignupIcon from "../assets/images/loginSignupIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../features/loggedInUser/loggedInUserSlice";
import removeLocalStorage from "./../localStorage/removeLocalStorage";
import { getAsyncHotels } from "../features/hotels/hotelsSlice";
import getLocalStorage from "../localStorage/getLocalStorage";
import saveLocalStorage from "../localStorage/saveLocalStorage";

const USER_DATA = "USER_DATA";

const BOOKING_FORM = "BOOKING_FORM";

const HOTELS_RESERVED_LIST = "HOTELS_RESERVED_LIST";

const HOTELS = "HOTELS";

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const showHamburgerMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const [theme, setTheme] = useState(
    getLocalStorage("THEME") || {
      selectedTheme: "light",
      isOpenThemeMenu: false,
    }
  );

  const { selectedTheme, isOpenThemeMenu } = theme;

  const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

  useEffect(() => {
    switch (selectedTheme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;

      case "light":
        document.documentElement.classList.remove("dark");
        break;

      default:
        if (systemTheme) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        break;
    }
  }, [selectedTheme]);

  const showThemeMenuHandler = () => {
    setTheme({ ...theme, isOpenThemeMenu: !isOpenThemeMenu });
    // setIsOpenMenu(false);
  };

  const setThemeHandler = (e) => {
    function setAppTheme(theme) {
      saveLocalStorage("THEME", {
        selectedTheme: theme,
        isOpenThemeMenu: false,
      });

      setTheme({ ...theme, isOpenThemeMenu: false, selectedTheme: theme });
    }

    const theme = e.target.value;

    switch (theme) {
      case "light":
        setAppTheme("light");
        break;

      case "dark":
        setAppTheme("dark");
        break;

      case "system":
        setAppTheme("system");
        break;

      default:
        return;
    }
  };

  console.log("loggedInUser in HEADER:", loggedInUser);

  return (
    <header className="sticky top-0 z-2000 mb-8 p-4 backdrop-blur-md">
      <nav
        className={`relative flex flex-wrap gap-x-6 rounded-xl bg-slate-200 px-3 py-4 shadow-lg ${
          isOpenMenu ? "rounded-b-none md:rounded-xl" : ""
        }`}
      >
        <div className="flex flex-auto items-center">
          <AppLogo />
          <ThemeMenuButton
            selectedTheme={selectedTheme}
            onShowThemeMenu={showThemeMenuHandler}
          />
        </div>
        <div className="flex flex-auto items-center justify-end">
          <NavigationMenu loggedInUser={loggedInUser} />

          {loggedInUser ? <UserPanel loggedInUser={loggedInUser} /> : null}

          <HamburgerMenuButton
            onShowMenu={showHamburgerMenuHandler}
            isOpenMenu={isOpenMenu}
          />
        </div>
        <HamburgerMenu
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
          loggedInUser={loggedInUser}
        />
      </nav>
      <ThemeMenu
        isOpenThemeMenu={isOpenThemeMenu}
        onSetTheme={setThemeHandler}
        setTheme={setTheme}
        theme={theme}
      />
    </header>
  );
}

export default Header;

function ThemeMenuButton({ selectedTheme, onShowThemeMenu }) {
  return (
    <div className="ml-4">
      <div>
        <button id="themeButton" onClick={onShowThemeMenu} className="block">
          <SunIcon
            className={`pointer-events-none h-6 w-6 text-emerald-900 ${
              selectedTheme === "light" ? "block" : "hidden"
            }`}
          />
          <MoonIcon
            className={`pointer-events-none h-6 w-6 text-emerald-900 ${
              selectedTheme === "dark" ? "block" : "hidden"
            }`}
          />
          <ComputerDesktopIcon
            className={`pointer-events-none h-6 w-6 text-emerald-900 ${
              selectedTheme === "system" ? "block" : "hidden"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function ThemeMenu({ isOpenThemeMenu, onSetTheme, setTheme, theme }) {
  const themeMenuRef = useRef();

  useOutsideClick(themeMenuRef, "themeButton", () =>
    setTheme({ ...theme, isOpenThemeMenu: false })
  );

  return (
    <div
      ref={themeMenuRef}
      className={`absolute left-16 top-26 flex w-28 flex-col items-start overflow-hidden rounded-xl bg-slate-200 md:top-28 ${
        isOpenThemeMenu ? "flex" : "hidden"
      }`}
    >
      {/* Light Mode Button */}
      <div className="mb-1 flex w-full">
        <button
          onClick={onSetTheme}
          value="light"
          className="flex w-full cursor-pointer px-2 pt-2 text-emerald-900"
        >
          <div className="pointer-events-none">
            <SunIcon className="h-5 w-5" />
          </div>
          <span className="pointer-events-none ml-1">Light</span>
        </button>
      </div>

      {/* Dark Mode Button */}
      <div className="mb-1 flex w-full">
        <button
          onClick={onSetTheme}
          value="dark"
          className="flex w-full cursor-pointer px-2 pt-2 text-emerald-900"
        >
          <div className="pointer-events-none">
            <MoonIcon className="h-5 w-5" />
          </div>
          <span className="pointer-events-none ml-1">Dark</span>
        </button>
      </div>

      {/* System Mode Button */}
      <div className="flex w-full">
        <button
          onClick={onSetTheme}
          value="system"
          className="flex w-full cursor-pointer p-2 text-emerald-900"
        >
          <div className="pointer-events-none">
            <ComputerDesktopIcon className="h-5 w-5" />
          </div>
          <span className="pointer-events-none ml-1">System</span>
        </button>
      </div>
    </div>
  );
}

function HamburgerMenuButton({ onShowMenu, isOpenMenu }) {
  return (
    <div
      id="hamburgerMenuButton"
      onClick={onShowMenu}
      className="cursor-pointer md:hidden"
    >
      <div
        className={`bar ${
          isOpenMenu
            ? "mx-0 my-2 translate-x-0 translate-y-2.25 rotate-129 bg-gradient-to-r from-red-500 to-orange-500"
            : ""
        }`}
      ></div>
      <div className={`bar ${isOpenMenu ? "opacity-0" : ""}`}></div>
      <div
        className={`bar ${
          isOpenMenu
            ? "mx-0 my-2 -translate-y-3.75 translate-x-0.25 rotate-50 bg-gradient-to-r from-red-500 to-orange-500"
            : ""
        }`}
      ></div>
    </div>
  );
}

function HamburgerMenu({ isOpenMenu, setIsOpenMenu, loggedInUser }) {
  const hamburgerMenuRef = useRef();

  useOutsideClick(hamburgerMenuRef, "hamburgerMenuButton", () =>
    setIsOpenMenu(false)
  );

  return (
    <ul
      ref={hamburgerMenuRef}
      className={`absolute right-0 top-16 z-10 flex w-full flex-col overflow-hidden rounded-xl bg-slate-200 px-2 pb-2 pt-6 shadow-md transition-all duration-75 ease-out md:hidden ${
        isOpenMenu
          ? "max-h-screen rounded-t-none opacity-100"
          : "max-h-0 opacity-0"
      }`}
    >
      {loggedInUser ? <UserSpecs loggedInUser={loggedInUser} /> : null}

      <li className="mb-2 flex flex-col">
        <div className="mb-2 flex items-center justify-start">
          <GlobeAsiaAustraliaIcon className="h-6 w-6" />
          <span className="ml-0.5 mt-1.6 block sm:text-lg">Browse</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink end to="/">
            {({ isActive }) => (
              <div className="flex py-1">
                <div className="flex items-center justify-center">
                  <HomeIcon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isActive ? "text-emerald-900" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                  <span className={isActive ? "text-emerald-700" : ""}>
                    Home
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink to="/hotels-list">
            {({ isActive }) => (
              <div className="flex py-1">
                <div className="flex items-center justify-center">
                  <BuildingOfficeIcon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isActive ? "text-emerald-900" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                  <span className={isActive ? "text-emerald-700" : ""}>
                    Hotels List
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink
            to={`${
              loggedInUser
                ? "/bookmarks?mapTitle=Bookmarks List"
                : "/login?redirect=bookmarksList"
            }`}
          >
            {({ isActive }) => (
              <div className="flex py-1">
                <div className="flex items-center justify-center">
                  <StarIcon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isActive ? "text-emerald-900" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                  <span className={isActive ? "text-emerald-700" : ""}>
                    Bookmarks
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
      </li>

      {loggedInUser ? null : (
        <li className="mb-2 flex flex-col">
          <div className="mb-2 flex items-center justify-start">
            <UserCircleIcon className="h-6 w-6" />
            <span className="ml-0.5 mt-1.6 block sm:text-lg">Account</span>
          </div>
          <div
            onClick={() => setIsOpenMenu(false)}
            className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
          >
            <NavLink to="/login">
              {({ isActive }) => (
                <div className="flex py-1">
                  <div className="flex items-center justify-center">
                    <ArrowLeftOnRectangleIcon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isActive ? "text-emerald-900" : ""
                      }`}
                    />
                  </div>
                  <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                    <span className={isActive ? "text-emerald-700" : ""}>
                      Login
                    </span>
                  </div>
                </div>
              )}
            </NavLink>
          </div>
          <div
            onClick={() => setIsOpenMenu(false)}
            className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
          >
            <NavLink to="/signup">
              {({ isActive }) => (
                <div className="flex py-1">
                  <div className="flex items-center justify-center">
                    <ClipboardDocumentListIcon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isActive ? "text-emerald-900" : ""
                      }`}
                    />
                  </div>
                  <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                    <span className={isActive ? "text-emerald-700" : ""}>
                      Sign Up
                    </span>
                  </div>
                </div>
              )}
            </NavLink>
          </div>
        </li>
      )}

      <li className="flex flex-col">
        <div className="mb-3 flex items-center justify-start">
          <LifebuoyIcon className="h-6 w-6" />
          <span className="ml-0.5 mt-1.6 block sm:text-lg">Help</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink to="/contact-us">
            {({ isActive }) => (
              <div className="flex py-1">
                <div className="flex items-center justify-center">
                  <PhoneArrowDownLeftIcon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isActive ? "text-emerald-900" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                  <span className={isActive ? "text-emerald-700" : ""}>
                    Contact Us
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink to="/c">
            {({ isActive }) => (
              <div className="flex py-1">
                <div className="flex items-center justify-center">
                  <UserGroupIcon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isActive ? "text-emerald-900" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 mt-1 text-sm text-slate-900 sm:text-base">
                  <span className={isActive ? "text-emerald-700" : ""}>
                    About Us
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
      </li>
    </ul>
  );
}

function NavigationMenu({ loggedInUser }) {
  return (
    <div className={`hidden md:block ${loggedInUser ? "mr-2" : ""}`}>
      <ul className="flex gap-x-1">
        <li className="transition-all hover:rounded-md hover:bg-slate-300">
          <NavLink
            className={({ isActive }) => (isActive ? "text-emerald-700" : "")}
            end
            to="/"
          >
            <span className="block px-2 py-4 font-semibold">Home</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-300">
          <NavLink
            className={({ isActive }) => (isActive ? "text-emerald-700" : "")}
            to="/hotels-list"
          >
            <span className="block px-2 py-4 font-semibold">Hotels List</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-300">
          <NavLink
            className={({ isActive }) => (isActive ? "text-emerald-700" : "")}
            to={`${
              loggedInUser
                ? "/bookmarks?mapTitle=Bookmarks List"
                : "/login?redirect=bookmarksList"
            }`}
          >
            <span className="block px-2 py-4 font-semibold">Bookmarks</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-300">
          <NavLink
            className={({ isActive }) => (isActive ? "text-emerald-700" : "")}
            to="/contact-us"
          >
            <span className="block px-2 py-4 font-semibold">Contact Us</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-300">
          <NavLink
            className={({ isActive }) => (isActive ? "text-emerald-700" : "")}
            to="/c"
          >
            <span className="block px-2 py-4 font-semibold">About Us</span>
          </NavLink>
        </li>

        {loggedInUser ? null : (
          <li className="ml-4 transition-all hover:rounded-md hover:bg-slate-300">
            <div className="relative flex items-center">
              <div className="absolute -left-7.25 -top-2.75">
                <img
                  src={loginSignupIcon}
                  className="w-7"
                  alt="login-signup-icon"
                />
              </div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-emerald-700" : ""
                }
                to="/login"
              >
                <span className="block px-2 py-4 font-semibold">
                  Login/Signup
                </span>
              </NavLink>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

function AppLogo() {
  return (
    <div className="w-16">
      <img className="block" src={appLogo} alt="App-Logo" />
    </div>
  );
}

function UserPanel({ loggedInUser }) {
  const [isShowUserPanel, setIsShowUserPanel] = useState(false);

  const { username, avatar, fullName, phoneNumber } = loggedInUser;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signOutUserHandler = () => {
    dispatch(signOutUser());

    removeLocalStorage(USER_DATA);

    removeLocalStorage(BOOKING_FORM);

    removeLocalStorage(HOTELS_RESERVED_LIST);

    removeLocalStorage(HOTELS);

    dispatch(getAsyncHotels());

    navigate("/");
  };

  return (
    // User Panel Section
    <div className="relative mr-4 flex flex-col md:mr-0">
      {/* User Panel Button */}
      <div
        onClick={() => setIsShowUserPanel(!isShowUserPanel)}
        className="flex cursor-pointer rounded-xl bg-slate-300 p-1"
      >
        <span className="pointer-events-none block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-emerald-800"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="pointer-events-none block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 text-emerald-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </span>
      </div>

      {/* User Panel */}
      <div
        className={`absolute right-0 top-8 w-40 flex-col rounded-lg bg-slate-100 px-2 py-3 shadow-lg ${
          isShowUserPanel ? "flex" : "hidden"
        }`}
      >
        {/* User Specs */}
        <div className="mb-1 flex flex-col px-1 text-emerald-800">
          {/* Username Spec */}
          <div className="mb-1 flex justify-between">
            <div className="flex items-center">
              <span className="block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <span className="ml-1 block text-sm capitalize">{username}</span>
            </div>
            <div>
              <span className="block text-sm">{avatar}</span>
            </div>
          </div>

          {/* Full Name Spec */}
          <div className="mb-1 flex items-center">
            <span className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
            <span className="ml-1 block text-sm capitalize">{fullName}</span>
          </div>

          {/* Phone Number Spec */}
          <div className="mb-1 flex items-center">
            <span className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </span>
            <span className="ml-1 block text-sm">{phoneNumber}</span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="mb-2 border-b border-slate-400 opacity-30"></div>

        {/* Sign out Section */}
        <div
          onClick={signOutUserHandler}
          className="flex cursor-pointer items-center justify-start p-1 hover:rounded-lg hover:bg-slate-200"
        >
          <span className="pointer-events-none block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 text-red-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </span>
          <span className="pointer-events-none ml-1 block text-sm capitalize text-red-700">
            sign out
          </span>
        </div>
      </div>
    </div>
  );
}

function UserSpecs({ loggedInUser }) {
  const { username, avatar, fullName, phoneNumber, gender } = loggedInUser;

  return (
    <div className="mb-4 flex flex-col rounded-lg bg-emerald-800 px-3 py-2 shadow-lg">
      <div className="mb-2 text-center text-white">
        <span className="block w-full">{`Welcome ${
          gender === "male" ? "Mr." : "Mrs."
        }${fullName[0].toUpperCase() + fullName.slice(1)} ${avatar}`}</span>
      </div>

      <div className="mx-auto flex w-full max-w-[256px] items-center justify-around">
        {/* Username Spec */}
        <div className="flex text-white">
          <span className="block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
          <span className="ml-1 block text-sm capitalize">{username}</span>
        </div>

        {/* Phone Number Spec */}
        <div className="flex text-white">
          <span className="block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </span>
          <span className="ml-1 block text-sm">{phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
