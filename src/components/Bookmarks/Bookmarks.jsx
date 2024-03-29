import { Outlet, useLocation } from "react-router-dom";
import Map from "../Map/Map";
import { useSelector } from "react-redux";
import Message from "./../../common/Message";
import { XCircleIcon } from "@heroicons/react/24/outline";
import separator from "../../assets/images/separator.png";

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
        <div className="mx-auto mb-4 flex min-h-screen flex-col lg:h-[calc(100vh-160px)] lg:min-h-0 lg:flex-row-reverse lg:items-stretch lg:justify-between 2xl:max-w-screen-2xl">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <Map />
          </div>

          <div className="mb-8 flex items-center justify-center lg:hidden">
            <img className="block w-48" src={separator} alt="separator" />
          </div>

          <div className="scrollbarStyle overflow-y-auto rounded-xl lg:w-1/2 lg:pr-4">
            <Outlet />
          </div>
        </div>
      )}
    </section>
  );
}

export default Bookmarks;
