import {
  HomeIcon,
  BuildingOfficeIcon,
  PhoneArrowDownLeftIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  LifebuoyIcon,
  FireIcon,
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
    <header className="relative mb-8 p-4">
      <nav
        className={`relative flex flex-wrap gap-x-6 rounded-xl bg-slate-200 px-3 py-4 ${
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
      className={`absolute right-0 top-16 z-10 flex w-full flex-col overflow-hidden rounded-xl bg-slate-200 px-2 pb-2 pt-6 transition-all duration-75 ease-out md:hidden ${
        isOpenMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <li className="mb-4 flex flex-col">
        <div className="mb-3 flex items-center justify-start">
          <FireIcon className="h-6 w-6 text-red-600" />
          <span className="ml-0.5 mt-1.6 block">Browse</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink end to="/">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <HomeIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
                    Home
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink to="/hotels-list">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <BuildingOfficeIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
                    Hotels List
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink to="/w">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <StarIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
                    Bookmark
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
      </li>

      <li className="mb-4 flex flex-col">
        <div className="mb-3 flex items-center justify-start">
          <UserCircleIcon className="h-6 w-6 text-green-700" />
          <span className="ml-0.5 mt-1.6 block">Account</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink to="/b">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <ArrowRightOnRectangleIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
                    Login
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink to="/c">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <ClipboardDocumentListIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
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
          <LifebuoyIcon className="h-6 w-6 text-sky-600" />
          <span className="ml-0.5 mt-1.6 block">Help</span>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink to="/b">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <PhoneArrowDownLeftIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
                    Contact Us
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => setIsOpenMenu(false)}
          className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
        >
          <NavLink to="/c">
            {({ isActive }) => (
              <div className="flex py-1">
                <div>
                  <UserGroupIcon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive ? "text-rose-500" : ""
                    }`}
                  />
                </div>
                <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                  <span className={isActive ? "text-yellow-500" : ""}>
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
        <li className="transition-all hover:rounded-md hover:bg-slate-900/30">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "text-slate-900"
            }
            end
            to="/"
          >
            <span className="block px-2 py-4 font-semibold">Home</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-900/30">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-yellow-500 " : "text-slate-900"
            }
            to="/hotels-list"
          >
            <span className="block px-2 py-4 font-semibold">Hotels List</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-900/30">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "text-slate-900"
            }
            to="/c"
          >
            <span className="block px-2 py-4 font-semibold">Bookmark</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-900/30">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "text-slate-900"
            }
            to="/b"
          >
            <span className="block px-2 py-4 font-semibold">Contact Us</span>
          </NavLink>
        </li>
        <li className="transition-all hover:rounded-md hover:bg-slate-900/30">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "text-slate-900"
            }
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
