import { Outlet } from "react-router-dom";

function Hotels() {
  return (
    <section className="px-4">
      <div className="flex h-[calc(100vh-160px)] flex-col lg:flex-row-reverse lg:items-stretch lg:justify-between">
        <div className="mb-40 bg-yellow-400 lg:mb-0 lg:w-1/2">Map</div>
        <div className="overflow-y-scroll lg:w-1/2 lg:pr-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Hotels;
