import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface ContactIconProps {
    tailwindClass?: string
}

export const ContactIcon: FC<ContactIconProps> = ({tailwindClass}) => {
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
        Download more icon variants from https://tabler-icons.io/i/phone
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
    </svg>
  )
}
