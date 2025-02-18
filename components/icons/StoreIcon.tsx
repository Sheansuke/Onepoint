import { tw } from '@utils/tailwindClass'
import{ FC } from 'react'

interface StoreIconProps {
  tailwindClass?: string
}

export const StoreIcon: FC<StoreIconProps> = ({ tailwindClass }) => {
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
        Download more icon variants from https://tabler-icons.io/i/basket
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <polyline points="7 10 12 4 17 10"></polyline>
      <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"></path>
      <circle cx="12" cy="15" r="2"></circle>
    </svg>
  )
}
