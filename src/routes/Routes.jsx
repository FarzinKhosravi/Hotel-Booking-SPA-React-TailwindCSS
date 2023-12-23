import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "./../pages/HomePage";
import HotelsPage from "../pages/HotelsPage";
import Hotels from "../components/Hotels/Hotels";
import HotelsResults from "../components/HotelsResults/HotelsResults";

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
          path: "/hotels-list",
          element: <HotelsPage />,
        },
        {
          path: "/hotels-results",
          element: <Hotels />,
          children: [
            {
              index: true,
              element: <HotelsResults />,
            },
          ],
        },
      ],
    },
  ]);

  return routes;
}

export default Routes;
