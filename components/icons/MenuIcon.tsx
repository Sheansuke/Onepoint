import { tw } from '@utils/tailwindClass'
import React, { FC } from 'react'

interface MenuIconProps {
    tailwindClass?: string
}

export const MenuIcon: FC<MenuIconProps> = ({tailwindClass = ''}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={tw(tailwindClass || 'w-6 h-6')}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  )
}
