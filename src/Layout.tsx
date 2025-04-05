import { Outlet } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

const Layout = () => {
  return (
    <main className="bg-gradient-to-t from-white to-gray-100 min-h-[100dvh] flex flex-col">
      <Navigation />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Layout
