"use client"

import { useEffect, useRef, useState } from "react"

export default function Popover({
  children,
  content,
  trigger = "click"
}: {
  children: React.ReactNode
  content: React.ReactNode
  trigger?: "click" | "hover"
}) {
  const [show, setShow] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true)
    }
  }

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current) {
        if (!wrapperRef.current.contains(event.target as Node)) setShow(false)
      }
    }

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [show])

  return (
    <div
      ref={wrapperRef}
      className="w-fit h-fit relative inline-flex justify-center"
    >
      <button
        type="button"
        onClick={() => setShow(!show)}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeft}
        className="cursor-pointer"
      >
        {children}
      </button>
      <div
        className={`w-max h-fit absolute bottom-[100%] z-50 transition duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="border-2 border-black rounded bg-background p-3 shadow-[10px_30px_150px_rgba(46,38,92,0.25)] mb-[10px]">
          {content}
        </div>
      </div>
    </div>
  )
}
