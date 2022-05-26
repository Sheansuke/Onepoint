import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface HeadsetIconProps {
    tailwindClass?: string
}

export const HeadsetIcon: FC<HeadsetIconProps> = ({tailwindClass}) => {
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
        Download more icon variants from https://tabler-icons.io/i/headset
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="4" y="13" rx="2" width="4" height="6"></rect>
      <rect x="16" y="13" rx="2" width="4" height="6"></rect>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3"></path>
      <path d="M18 19a6 3 0 0 1 -6 3"></path>
    </svg>
  )
}
