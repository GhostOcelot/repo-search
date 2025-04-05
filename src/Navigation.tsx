import { useLayoutEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

const Navigation = () => {
  const navLinks = [
    { label: "Github search", path: "/" },
    { label: "National Holidays", path: "/holidays" },
  ]

  const location = useLocation()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const active = containerRef.current?.querySelector(".active") as HTMLElement
      if (active && containerRef.current) {
        setIndicatorStyle({
          left: active.offsetLeft,
          width: active.offsetWidth,
        })
      }
    }

    updateIndicator()

    const resizeObserver = new ResizeObserver(updateIndicator)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [location.pathname])

  return (
    <nav
      ref={containerRef}
      className="relative bg-amber-200 py-6 flex justify-center mb-8 rounded-full m-4"
    >
      <div
        className="absolute top-4 h-10 bg-white rounded-full transition-all duration-300"
        style={{
          ...indicatorStyle,
        }}
      />
      {navLinks.map((link) => (
        <NavLink
          key={link.label}
          className={({ isActive }) =>
            `relative mx-2 px-4 rounded-full text-amber-600 font-semibold transition-all duration-700 ease-in-out ${
              isActive && "active"
            }`
          }
          to={link.path}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
