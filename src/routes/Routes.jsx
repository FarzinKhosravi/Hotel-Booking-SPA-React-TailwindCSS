import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "./../pages/HomePage";

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
      ],
    },
  ]);

  return routes;
}

export default Routes;
