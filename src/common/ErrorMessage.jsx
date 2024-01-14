import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function ErrorMessage() {
  return (
    <div className="flex flex-col">
      {/* Top Section */}
      <div className="mb-6 flex w-full items-center justify-center">
        {/* Error Message */}
        <div className="flex flex-col">
          <div className="w-full">
            <span className="block w-full text-4xl font-medium">WHOOPS!</span>
          </div>
          <div className="-mt-2 flex w-full items-center pl-2">
            <div className="flex flex-col text-[9px]">
              <span className="block">There</span>
              <span className="-mt-1 block">seems</span>
              <span className="-mt-1 block">to be on</span>
            </div>
            <div>
              <span className="ml-1 block text-4xl font-extrabold text-red-700">
                ERROR
              </span>
            </div>
          </div>
        </div>

        {/* Error Icon */}
        <div>
          <span className="block">
            <ExclamationTriangleIcon className="h-20 w-20 text-red-700" />
          </span>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mb-8 flex w-full flex-col items-center">
        <span className="mb-2 block w-full text-center text-3xl font-semibold">
          Look Like You&apos;re{" "}
          <span className="inline-flex rotate-12">LOST</span>
        </span>
        <span className="block w-full px-8 text-center text-sm font-semibold">
          The Page You are Looking for Not Available!
        </span>
      </div>

      {/* Down Section */}
      <div className="flex w-full items-center justify-center">
        <Link to="/">
          <button className="block rounded-full bg-emerald-800 px-8 py-2 text-white shadow-lg">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorMessage;
