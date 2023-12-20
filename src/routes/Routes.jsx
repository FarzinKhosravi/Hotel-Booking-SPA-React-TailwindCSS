import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "./../pages/HomePage";
import HotelsPage from "../pages/HotelsPage";

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
      ],
    },
  ]);

  return routes;
}

export default Routes;
