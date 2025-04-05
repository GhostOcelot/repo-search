import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GithubSearch from "./GithubSearch"
import Holidays from "./Holidays"
import NotFound from "./NotFound"
import Navigation from "./components/Navigation"

function App() {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<GithubSearch />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
