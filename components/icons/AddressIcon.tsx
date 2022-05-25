import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface AddressIconProps {
  tailwindClass?: string
}

export const AddressIcon: FC<AddressIconProps> = ({ tailwindClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={tw(tailwindClass || 'w-6 h-6')}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <desc>
        Download more icon variants from https://tabler-icons.io/i/address-book
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"></path>
      <path d="M10 16h6"></path>
      <circle cx="13" cy="11" r="2"></circle>
      <path d="M4 8h3"></path>
      <path d="M4 12h3"></path>
      <path d="M4 16h3"></path>
    </svg>
  )
}
