import { Outlet } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import SideMenu from "./components/SideMenu"

const Layout = () => {
  return (
    <main className="bg-gradient-to-t from-white to-gray-100 min-h-[100dvh] flex flex-col">
      <SideMenu className="sm:hidden" />
      <Navigation className="hidden sm:flex" />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Layout
