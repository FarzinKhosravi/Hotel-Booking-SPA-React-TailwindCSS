import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi";
import introIcon from "../assets/images/introIcon.png";
import separator from "../assets/images/separator.png";
import BackButton from "../common/BackButton";
// import appLogo from "../assets/images/appLogo.png";

function AboutUsPage() {
  return (
    <section className="mb-20 min-h-screen px-4">
      <div>
        {/* Intro Section */}
        <div className="mb-16 flex flex-col">
          <div className="mb-2 flex flex-col">
            <span className="flex items-center justify-center font-Parisienne text-2xl text-indigo-950">
              Welcome To
            </span>
            <div className="relative mx-auto flex h-20 max-w-[300px] items-center justify-center">
              <h2 className="mr-4 font-Parisienne text-2xl text-indigo-950">
                Hotel Booking Site
              </h2>
              <div className="absolute -top-1.25 right-4">
                <img className="w-10" src={introIcon} alt="intro-Icon" />
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <img className="block w-36" src={separator} alt="separator" />
          </div>

          <div className="flex w-full items-center justify-center">
            <span className="block bg-img-home bg-cover bg-center bg-no-repeat font-Parisienne text-xl text-indigo-950">
              We Wish You a Pleasant Trip
            </span>
          </div>
        </div>

        {/* About Us Section */}
        <div>
          {/* About Us Title */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="pl-1">
                <span className="block bg-img-home bg-cover bg-center bg-no-repeat text-lg font-semibold italic">
                  About Us
                </span>
              </div>
              <div className="pr-2">
                <BackButton />
              </div>
            </div>
          </div>

          {/* About Us Content */}
          <div className="rounded-lg bg-slate-200 p-4 shadow-lg">
            {/* Company Description */}
            <div className="mb-8 flex font-semibold italic text-emerald-900">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, temporibus.
              </p>
            </div>

            {/* Communication Icons */}
            <div className="mb-10 flex items-center justify-center gap-x-4">
              <div>
                <BiLogoFacebookCircle className="h-5 w-5 text-emerald-900 transition-all duration-200  hover:text-yellow-500" />
              </div>

              <div>
                <BiLogoInstagram className="h-5 w-5 text-emerald-900 transition-all duration-200  hover:text-yellow-500" />
              </div>

              <div>
                <BiLogoTwitter className="h-5 w-5 cursor-pointer text-emerald-900 transition-all duration-300  hover:text-yellow-500" />
              </div>
            </div>

            {/* Read More Button */}
            <div className="w-full">
              <button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-900 p-4 shadow-lg">
                <span className="block text-white">Read More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage;
