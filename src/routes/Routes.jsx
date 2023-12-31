import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "./../pages/HomePage";
import HotelsPage from "../pages/HotelsPage";
import Hotels from "../components/Hotels/Hotels";
import HotelsResults from "../components/HotelsResults/HotelsResults";
import HotelDetail from "../components/HotelDetail/HotelDetail";
import Bookmarks from "../components/Bookmarks/Bookmarks";
import AddNewBookmark from "../components/AddNewBookmark/AddNewBookmark";

function Routes() {
  let routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "hotels-list",
          element: <HotelsPage />,
        },
        {
          path: "hotels-results",
          element: <Hotels />,
          children: [
            {
              index: true,
              element: <HotelsResults />,
            },
            {
              path: ":hotelId",
              element: <HotelDetail />,
            },
          ],
        },
        {
          path: "bookmarks",
          element: <Bookmarks />,
          children: [
            {
              path: "add",
              element: <AddNewBookmark />,
            },
          ],
        },
      ],
    },
  ]);

  return routes;
}

export default Routes;
