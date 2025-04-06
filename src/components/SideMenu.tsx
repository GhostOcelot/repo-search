import { RiCloseLargeFill, RiMenuFill } from "react-icons/ri"
import { useState } from "react"
import { mergeClasses } from "../helpers"
import { NavLink } from "react-router-dom"
import { NAV_LINKS } from "../const"

interface Props {
  className?: string
}

const SideMenu = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={mergeClasses("relative", className ? className : "")}>
      <button
        onClick={toggleMenu}
        className="fixed top-5 left-5 p-3 bg-white text-amber-600 text-md rounded-full z-20"
      >
        {isOpen ? <RiCloseLargeFill /> : <RiMenuFill />}
      </button>

      <div
        className={`flex flex-col fixed top-0 left-0 h-full w-52 pt-20 bg-amber-200 text-white transform transition-all duration-300 border-r-3 border-r-white ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            className={({ isActive }) =>
              `relative mx-2 px-4 rounded-full text-amber-600 font-semibold transition-all duration-700 ease-in-out p-4 z-10 ${
                isActive && "active"
              }`
            }
            to={link.path}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default SideMenu
