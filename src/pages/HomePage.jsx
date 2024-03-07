import { Link } from "react-router-dom";
import introIcon from "../assets/images/introIcon.png";

import separator from "../assets/images/separator.png";

function HomePage() {
  return (
    <section className="mb-20 min-h-screen px-4">
      <div className="flex flex-col">
        <div className="relative mx-auto mb-5 flex h-20 max-w-[300px] items-center justify-center">
          <h2 className="mr-4 font-Parisienne text-4xl text-indigo-950">
            Hotel Booking
          </h2>
          <div className="absolute -right-1 -top-3">
            <img className="w-14" src={introIcon} alt="intro-Icon" />
          </div>
        </div>
        <div>
          <div className="italic text-indigo-950">
            <div className="mb-6 flex items-center justify-center">
              <img className="block w-48" src={separator} alt="separator" />
            </div>
            <p>
              A Hotel Reservation Site that Allows You to Find the Desired Hotel
              Based on your Needs and Conditions or Add the Desired Hotel to the
              Bookmark List from the Map.
            </p>
            <br />
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
      </div>
    </section>
  );
}

export default HomePage;
