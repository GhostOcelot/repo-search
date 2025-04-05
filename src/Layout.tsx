import { Outlet } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

const Layout = () => {
  return (
    <main className="bg-gradient-to-t from-white to-cyan-50 min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default Layout
