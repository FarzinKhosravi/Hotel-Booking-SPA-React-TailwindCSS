import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="mb-8 min-h-screen px-4 md:mb-16">
      <div className="mx-auto flex max-w-screen-xl items-center justify-start md:px-8">
        <div className="mx-auto max-w-lg text-gray-600">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center text-xl font-semibold text-red-600 lg:text-3xl">
              <span className="text-5.5 lg:text-8 -mt-0.25 inline-block">
                404
              </span>
              <span className="ml-1 inline-block">ERROR</span>
            </div>
            <p className="mb-5 text-2xl font-semibold  text-slate-900 lg:text-4xl">
              Page Not Found
            </p>
            <p className="italic text-slate-900 lg:text-xl">
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
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-emerald-900 lg:h-14 lg:w-14">
        {navigation.icon}
      </div>
      <div className="w-full space-y-1 border-b-2 border-slate-500 pb-3">
        <h4 className="font-medium text-slate-900 lg:text-xl">
          {navigation.title}
        </h4>
        <p className="text-slate-900 lg:text-lg">{navigation.desc}</p>
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
