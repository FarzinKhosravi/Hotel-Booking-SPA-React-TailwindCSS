import {
  HomeIcon,
  BuildingOfficeIcon,
  PhoneArrowDownLeftIcon,
  UserGroupIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useOutsideClick from "./../hooks/useOutsideClick";
import { NavLink } from "react-router-dom";

import appLogo from "../assets/images/appLogo.png";

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const showHamburgerMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header className="relative p-4">
      <nav
        className={`relative flex flex-wrap gap-x-6 rounded-xl bg-slate-200 px-3 py-4 ${
          isOpenMenu ? "rounded-b-none md:rounded-xl" : ""
        }`}
      >
        <div className="flex flex-auto items-center">
          <AppLogo />
          {/* Bookmark Component */}
          <div className="ml-1">
            <BookmarkSquareIcon className="h-8 w-8 text-slate-800" />
          </div>
        </div>
        <div className="flex flex-auto items-center justify-end">
          <NavigationMenu />
          <LoginSignupButton />
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
            ? "translate-y-2.25 rotate-129 mx-0 my-2 translate-x-0 bg-red-600"
            : ""
        }`}
      ></div>
      <div className={`bar ${isOpenMenu ? "opacity-0" : ""}`}></div>
      <div
        className={`bar ${
          isOpenMenu
            ? "-translate-y-3.75 translate-x-0.25 rotate-50 mx-0 my-2 bg-red-600"
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
      className={`top-22 absolute right-0 flex w-full flex-col overflow-hidden rounded-xl bg-slate-200 p-2 transition-all duration-75 ease-out md:hidden ${
        isOpenMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <li
        onClick={() => setIsOpenMenu(false)}
        className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
      >
        <NavLink end to="/">
          {({ isActive }) => (
            <div className="flex py-3">
              <div>
                <HomeIcon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    isActive ? "text-rose-500" : "text-slate-900"
                  }`}
                />
              </div>
              <div className="ml-1 text-base font-medium text-slate-900 sm:text-lg">
                <span className={isActive ? "text-yellow-500" : ""}>Home</span>
              </div>
            </div>
          )}
        </NavLink>
      </li>
      <li
        onClick={() => setIsOpenMenu(false)}
        className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
      >
        <NavLink to="/a">
          {({ isActive }) => (
            <div className="flex py-3">
              <div>
                <BuildingOfficeIcon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    isActive ? "text-rose-500" : "text-slate-900"
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
      </li>
      <li
        onClick={() => setIsOpenMenu(false)}
        className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
      >
        <NavLink to="/b">
          {({ isActive }) => (
            <div className="flex py-3">
              <div>
                <PhoneArrowDownLeftIcon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    isActive ? "text-rose-500" : "text-slate-900"
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
      </li>
      <li
        onClick={() => setIsOpenMenu(false)}
        className="mb-1 cursor-pointer pl-2 transition-all ease-in-out hover:rounded-md hover:bg-slate-900/30"
      >
        <NavLink to="/c">
          {({ isActive }) => (
            <div className="flex py-3">
              <div>
                <UserGroupIcon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    isActive ? "text-rose-500" : "text-slate-900"
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
      </li>
    </ul>
  );
}

function NavigationMenu() {
  return (
    <div className="mr-2 hidden md:block">
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
            to="/a"
          >
            <span className="block px-2 py-4 font-semibold">Hotels List</span>
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

function LoginSignupButton() {
  return (
    <div className="mr-2 md:mr-0">
      <button className="rounded-xl bg-white p-2 text-sm font-medium italic text-slate-800 shadow-md hover:bg-slate-100">
        Login/Signup
      </button>
    </div>
  );
}

function AppLogo() {
  return (
    <div className="w-12">
      <img className="block" src={appLogo} alt="App-Logo" />
    </div>
  );
}
