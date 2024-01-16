import { Outlet, useLocation } from "react-router-dom";
import Map from "../Map/Map";
import { useSelector } from "react-redux";
import Message from "./../../common/Message";
import { XCircleIcon } from "@heroicons/react/24/outline";

function Bookmarks() {
  const { error } = useSelector((state) => state.selectedLocation);

  const location = useLocation();

  return (
    <section className="px-4">
      {error && location.pathname === "/bookmarks/add" ? (
        <Message message={error}>
          <span className="block">
            <XCircleIcon className="h-20 w-20 text-red-700" />
          </span>
        </Message>
      ) : (
        <div className="flex min-h-screen flex-col lg:h-[calc(100vh-160px)] lg:min-h-0 lg:flex-row-reverse lg:items-stretch lg:justify-between">
          <div className="mb-16 lg:mb-0 lg:w-1/2">
            <Map />
          </div>
          <div className="scrollbarStyle overflow-y-auto lg:w-1/2 lg:pr-4">
            <Outlet />
          </div>
        </div>
      )}
    </section>
  );
}

export default Bookmarks;
