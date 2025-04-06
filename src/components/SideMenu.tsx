import { RiCloseLargeFill, RiMenuFill } from "react-icons/ri"
import { useEffect, useRef, useState } from "react"
import { mergeClasses } from "../helpers"
import { NavLink } from "react-router-dom"
import { NAV_LINKS } from "../const"

interface Props {
  className?: string
}

const SideMenu = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const sideMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav ref={sideMenuRef} className={mergeClasses("relative", className ? className : "")}>
      <button
        onClick={toggleMenu}
        className="fixed top-5 left-5 p-3 bg-white text-amber-600 text-md rounded-full z-20"
      >
        {isOpen ? <RiCloseLargeFill /> : <RiMenuFill />}
      </button>

      <div
        className={`flex flex-col fixed gap-2 top-0 left-0 h-full w-56 pt-20 pl-3 pr-4 bg-amber-200 text-white transform transition-all duration-300 border-r-3 border-r-white ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            onClick={toggleMenu}
            className={({ isActive }) =>
              `relative mx-2 px-4 py-2 rounded-full text-amber-600 font-semibold transition-all duration-700 ease-in-out z-10 ${
                isActive && "bg-white rounded-full"
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
