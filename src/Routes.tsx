import { useRoutes } from "react-router-dom"
import Layout from "./Layout"
import GithubSearch from "./GithubSearch"
import Holidays from "./Holidays"
import NotFound from "./NotFound"

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <GithubSearch /> },
        { path: "holidays", element: <Holidays /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ])

  return routes
}

export default Routes
