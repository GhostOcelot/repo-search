import { useRoutes } from "react-router-dom"
import Layout from "./Layout"
import GithubSearch from "./GithubSearch"
import Holidays from "./Holidays"
import NotFound from "./NotFound"
import Timer from "./Timer"

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <GithubSearch /> },
        { path: "holidays", element: <Holidays /> },
        { path: "timer", element: <Timer /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ])

  return routes
}

export default Routes
