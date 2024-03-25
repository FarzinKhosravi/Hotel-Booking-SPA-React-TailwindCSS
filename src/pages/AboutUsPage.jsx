import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi";
import BackButton from "../common/BackButton";
import Wellcome from "../common/Wellcome";

function AboutUsPage() {
  return (
    <section className="mb-20 min-h-screen px-4">
      <div>
        <Wellcome />

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
          <div className="rounded-lg bg-slate-200 p-4 shadow-lg dark:bg-slate-800">
            {/* Company Description */}
            <div className="mb-8 flex font-semibold italic text-emerald-900 dark:text-white">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, temporibus.
              </p>
            </div>

            {/* Communication Icons */}
            <div className="mb-10 flex items-center justify-center gap-x-4">
              <div>
                <BiLogoFacebookCircle className="socialMediaIcon socialMediaIconDarkMode" />
              </div>

              <div>
                <BiLogoInstagram className="socialMediaIcon socialMediaIconDarkMode" />
              </div>

              <div>
                <BiLogoTwitter className="socialMediaIcon socialMediaIconDarkMode" />
              </div>
            </div>

            {/* Read More Button */}
            <div className="w-full">
              <button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-900 p-4 shadow-lg dark:from-slate-600 dark:to-slate-700">
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
