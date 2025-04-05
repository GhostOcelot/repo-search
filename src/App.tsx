import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GithubSearch from "./GithubSearch"
import Holidays from "./Holidays"
import NotFound from "./NotFound"
import Layout from "./Layout"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<GithubSearch />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
