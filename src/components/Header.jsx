import {
  HomeIcon,
  BuildingOfficeIcon,
  PhoneArrowDownLeftIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  LifebuoyIcon,
  GlobeAsiaAustraliaIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useOutsideClick from "./../hooks/useOutsideClick";
import { NavLink } from "react-router-dom";

import appLogo from "../assets/images/appLogo.png";
import loginSignupIcon from "../assets/images/loginSignupIcon.png";

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const showHamburgerMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header className="z-2000 sticky top-0 mb-8 p-4 backdrop-blur-md">
      <nav
        className={`relative flex flex-wrap gap-x-6 rounded-xl bg-slate-200 px-3 py-4 shadow-lg ${
          isOpenMenu ? "rounded-b-none md:rounded-xl" : ""
        }`}
      >
        <div className="flex flex-auto items-center">
          <AppLogo />
        </div>
        <div className="flex flex-auto items-center justify-end">
          <NavigationMenu />
          <LoginSignupLink />
          <HamburgerMenuButton
            onShowMenu={showHamburgerMenuHandler}
            isOpenMenu={isOpenMenu}
          />
        </div>
        <HamburgerMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      </nav>
    </header>
  );
}

export default Header;

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

function HamburgerMenu({ isOpenMenu, setIsOpenMenu }) {
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
          <NavLink to="/bookmarks">
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

      <li className="mb-2 flex flex-col">
        <div className="mb-2 flex items-center justify-start">
          <UserCircleIcon className="h-6 w-6" />
          <span className="ml-0.5 mt-1.6 block sm:text-lg">Account</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink to="/b">
            {({ isActive }) => (
              <div className="flex py-1">
                <div className="flex items-center justify-center">
                  <ArrowRightOnRectangleIcon
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
          <NavLink to="/c">
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

      <li className="flex flex-col">
        <div className="mb-3 flex items-center justify-start">
          <LifebuoyIcon className="h-6 w-6" />
          <span className="ml-0.5 mt-1.6 block sm:text-lg">Help</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-300"
        >
          <NavLink to="/b">
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

function NavigationMenu() {
  return (
    <div className="mr-8 hidden md:block">
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
            to="/bookmarks"
          >
            <span className="block px-2 py-4 font-semibold">Bookmarks</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-300">
          <NavLink
            className={({ isActive }) => (isActive ? "text-emerald-700" : "")}
            to="/b"
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
      </ul>
    </div>
  );
}

function LoginSignupLink() {
  return (
    <div className="relative hidden items-center md:flex">
      <div className="absolute -left-9 -top-7.5">
        <img src={loginSignupIcon} className="w-8" alt="login-signup-icon" />
      </div>
      <div>
        <span className="font-semibold">Login/Signup</span>
      </div>
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
