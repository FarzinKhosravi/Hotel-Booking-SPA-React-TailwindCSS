import { Outlet } from "react-router-dom";

function Hotels() {
  return (
    <section className="min-h-screen px-4">
      <div>
        <div>
          <Outlet />
        </div>
        <div>Map</div>
      </div>
    </section>
  );
}

export default Hotels;
