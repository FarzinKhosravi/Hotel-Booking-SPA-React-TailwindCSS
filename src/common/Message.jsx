import { useNavigate } from "react-router-dom";

function Message({
  message = { title: "Nothing", description: "Nothing Found" },
  children,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Top Section */}
      <div className="mb-6 flex w-full items-center justify-center">
        {/* Error Message */}
        <div className="flex flex-col dark:text-white">
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
              <span
                className={`ml-1 block text-3xl font-extrabold text-red-700 ${
                  message.title === "ERROR" ? "text-4xl" : ""
                }`}
              >
                {message.title}
              </span>
            </div>
          </div>
        </div>

        {/* Error Icon */}
        <div>{children}</div>
      </div>

      {/* Middle Section */}
      <div className="mb-8 flex w-full flex-col items-center">
        <span className="mb-2 block w-full text-center text-3xl font-semibold dark:text-white">
          Look Like You&apos;re{" "}
          <span className="inline-flex rotate-12">LOST</span>
        </span>
        <div
          className={`block rounded-lg text-center text-sm font-semibold ${
            message.title === "Not City" || message.title === "Empty List"
              ? "w-auto bg-yellow-400 p-3"
              : "w-full  px-8"
          }`}
        >
          <span
            className={`mb-1 items-center justify-center ${
              message.title === "Not City" || message.title === "Empty List"
                ? "flex"
                : "hidden"
            }`}
          >
            <span className="relative flex h-5 w-5">
              <span className="absolute inline-block animate-ping rounded-full text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-stone-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="relative inline-flex h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-stone-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </span>
          {message.description}
        </div>
      </div>

      {/* Down Section */}
      <div
        className={`w-full items-center justify-center ${
          message.title === "Not City" || message.title === "Empty List"
            ? "hidden"
            : "flex"
        }`}
      >
        <button
          onClick={message.title === "ERROR" ? "/" : () => navigate(-1)}
          className="block rounded-full bg-emerald-800 px-8 py-2 text-white shadow-lg"
        >
          {message.title === "ERROR" ? "Go Back Home" : "Try Again"}
        </button>
      </div>
    </div>
  );
}

export default Message;
