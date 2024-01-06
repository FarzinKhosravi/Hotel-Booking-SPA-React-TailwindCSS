import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function Bookmarks() {
  console.log("render Bookmarks Component...");

  return (
    <section className="px-4">
      <div className="flex min-h-screen flex-col lg:h-[calc(100vh-160px)] lg:min-h-0 lg:flex-row-reverse lg:items-stretch lg:justify-between">
        <div className="mb-16 lg:mb-0 lg:w-1/2">
          <Map />
        </div>
        <div className="scrollbarStyle overflow-y-auto lg:w-1/2 lg:pr-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Bookmarks;
