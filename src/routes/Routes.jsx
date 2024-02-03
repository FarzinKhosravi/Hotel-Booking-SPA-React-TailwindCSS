import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "./../pages/HomePage";
import HotelsPage from "../pages/HotelsPage";
import Hotels from "../components/Hotels/Hotels";
import HotelsResults from "../components/HotelsResults/HotelsResults";
import HotelDetail from "../components/HotelDetail/HotelDetail";
import Bookmarks from "../components/Bookmarks/Bookmarks";
import AddNewBookmark from "../components/AddNewBookmark/AddNewBookmark";
import BookmarksListPage from "../pages/BookmarksListPage";
import BookmarkDetail from "../components/BookmarkDetail/BookmarkDetail";
import UpdateBookmark from "../components/UpdateBookmark/UpdateBookmark";
import SignupFormPage from "../pages/SignupFormPage";
import LoginFormPage from "../pages/LoginFormPage";

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
              index: true,
              element: <BookmarksListPage />,
            },
            {
              path: ":bookmarkId",
              element: <BookmarkDetail />,
            },
            {
              path: "add",
              element: <AddNewBookmark />,
            },
            {
              path: "update/:bookmarkId",
              element: <UpdateBookmark />,
            },
          ],
        },
        {
          path: "signup",
          element: <SignupFormPage />,
        },
        {
          path: "login",
          element: <LoginFormPage />,
        },
      ],
    },
  ]);

  return routes;
}

export default Routes;
