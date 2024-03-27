import { Link } from "react-router-dom";
import Wellcome from "../common/Wellcome";

function HomePage() {
  return (
    <section className="mx-auto mb-20 min-h-screen px-4 2xl:max-w-screen-2xl">
      <div>
        <Wellcome />

        {/* Intro Section */}
        <div className="italic text-indigo-950 dark:text-white">
          <div>
            <p>
              A Hotel Reservation Site that Allows You to Find the Desired Hotel
              Based on your Needs and Conditions or Add the Desired Hotel to the
              Bookmark List from the Map.
            </p>
          </div>

          <br />

          {/* Link to list of hotels */}
          <div className="flex">
            <Link to="/hotels-list">
              <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-indigo-950 dark:text-white">
                <span className="dark:text-white">L</span>et&apos;s Go See List
                of Hotels.
              </span>
            </Link>
            <span className="not-italic">📍</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
