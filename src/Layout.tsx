import { Outlet } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import SideMenu from "./components/SideMenu"
import { useTimer } from "./Timer/hooks"

const Layout = () => {
  const { time, isInitialized, isRunning, start, resume, pause, reset } = useTimer()

  return (
    <main className="bg-gradient-to-t from-white to-gray-100 min-h-[100dvh] flex flex-col">
      <SideMenu className="sm:hidden" />
      <Navigation className="hidden sm:flex" />
      <Outlet context={{ time, isInitialized, isRunning, start, resume, pause, reset }} />
      <Footer />
    </main>
  )
}

export default Layout
