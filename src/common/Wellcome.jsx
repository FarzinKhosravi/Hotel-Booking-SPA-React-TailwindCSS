import introIcon from "../assets/images/introIcon.png";
import Separator from "./Separator";

function Wellcome() {
  return (
    <div className="mb-8 flex flex-col">
      {/* Wellcome Section */}
      <div className="mb-2 flex flex-col">
        <span className="flex items-center justify-center font-Parisienne text-2xl text-indigo-950 dark:text-white">
          Welcome To
        </span>
        <div className="relative mx-auto flex h-20 max-w-[300px] items-center justify-center">
          <h2 className="mr-4 font-Parisienne text-2xl text-indigo-950 dark:text-white">
            Hotel Booking Site
          </h2>
          <div className="absolute -top-1.25 right-4">
            <img className="w-10" src={introIcon} alt="intro-Icon" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex w-full items-center justify-center">
        <span className="block bg-img-home bg-cover bg-center bg-no-repeat font-Parisienne text-xl text-indigo-950 dark:text-white">
          We Wish You a Pleasant Trip
        </span>
      </div>
    </div>
  );
}

export default Wellcome;
