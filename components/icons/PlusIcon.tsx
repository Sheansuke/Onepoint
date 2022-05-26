import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface PlusIconProps {
    tailwindClass?: string
}

export const PlusIcon: FC<PlusIconProps> = ({tailwindClass}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={tw(tailwindClass || 'w-6 h-6')}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <desc>
        Download more icon variants from https://tabler-icons.io/i/circle-plus
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
      <line x1="9" y1="12" x2="15" y2="12"></line>
      <line x1="12" y1="9" x2="12" y2="15"></line>
    </svg>
  )
}
