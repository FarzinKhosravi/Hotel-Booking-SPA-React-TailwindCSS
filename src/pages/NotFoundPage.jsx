import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="mb-8 min-h-screen px-4 md:mb-16">
      <div className="mx-auto flex max-w-screen-xl items-center justify-start md:px-8">
        <div className="mx-auto max-w-lg text-gray-600">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center text-xl font-semibold text-red-600 lg:text-3xl">
              <span className="-mt-0.25 inline-block text-5.5 lg:text-8">
                404
              </span>
              <span className="ml-1 inline-block">ERROR</span>
            </div>
            <p className="mb-5 text-2xl font-semibold text-slate-900  dark:text-white lg:text-4xl">
              Page Not Found
            </p>
            <p className="italic text-slate-900 dark:text-white lg:text-xl">
              Sorry, The Page You are Looking for Could Not Be Found Or Has Been
              Removed.
            </p>
          </div>
          <NavigationList />
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;

function NavigationList() {
  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const navigations = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-slate-100 lg:h-7 lg:w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
      title: "Home Page",
      desc: "Welcome To The Home Page, Please Click on the Link Below 😊",
      href: "/",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-slate-100 lg:h-7 lg:w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
      ),
      title: "Hotels List Page",
      desc: "Yes, Come Here, See Our List of Hotels Please 😎",
      href: "/hotels-list",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-slate-100 lg:h-7 lg:w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ),
      title: "Bookmarks List Page",
      desc: "If You Come Here, You Will See a List of Your Bookmarks ⭐",
      href: `${
        loggedInUser
          ? "/bookmarks?mapTitle=Bookmarks List"
          : "/login?redirect=bookmarksList"
      } `,
    },
    {
      id: 4,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-slate-100 lg:h-7 lg:w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
          />
        </svg>
      ),
      title: "Contact Us Page",
      desc: "Get in Touch with Us ☎️",
      href: "/contact-us",
    },
    {
      id: 5,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-slate-100 lg:h-7 lg:w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
      title: "About Us Page",
      desc: "If you Want to Get to Know Our Group, Please Click on the Link Below 📑",
      href: "/about-us",
    },
  ];

  return (
    <div>
      <ul>
        {navigations.map((navigation) => (
          <Navigation navigation={navigation} key={navigation.id} />
        ))}
      </ul>
    </div>
  );
}

function Navigation({ navigation }) {
  return (
    <li className="flex gap-x-4 py-6">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-emerald-900 dark:bg-slate-800 lg:h-14 lg:w-14">
        {navigation.icon}
      </div>
      <div className="w-full space-y-1 border-b-2 border-slate-500 pb-3">
        <h4 className="font-medium text-slate-900 dark:text-slate-200 lg:text-xl">
          {navigation.title}
        </h4>
        <p className="text-slate-900 dark:text-slate-200 lg:text-lg">
          {navigation.desc}
        </p>
        <Link
          to={navigation.href}
          className="inline-flex items-center gap-x-1 font-medium text-yellow-500 duration-150 hover:text-indigo-400 lg:text-lg"
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-1 h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </li>
  );
}
