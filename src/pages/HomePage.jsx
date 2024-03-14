import { Link } from "react-router-dom";
import Wellcome from "../common/Wellcome";

function HomePage() {
  return (
    <section className="mb-20 min-h-screen px-4">
      <div>
        <Wellcome />

        {/* Intro Section */}
        <div className="italic text-indigo-950">
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
              <span className="block bg-img-home bg-cover bg-center bg-no-repeat">
                Let&apos;s Go See List of Hotels.
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
