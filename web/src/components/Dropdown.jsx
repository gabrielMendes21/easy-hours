'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Dropdown({ title, children }) {
  // DropDown Control
  const [isActive, setIsActive] = useState(true)
  const handleDropDown = () => setIsActive(!isActive)

  return (
    <>
      <div
        className="dropdown flex items-end gap-2 my-6 w-max hover:cursor-pointer"
        onClick={handleDropDown}
      >
        <h3 className="font-medium">{title}</h3>
        <ChevronDown
          size={20}
          className={`transition-all ${isActive ? `` : `-rotate-90`}`}
        />
        {/* {isActive ? <ChevronDown size={20} /> : <ChevronRight size={20} />} */}
      </div>
      <div
        style={{
          display: isActive ? 'block' : 'none',
        }}
        className="activities space-y-5"
      >
        {children}
      </div>
    </>
  )
}
