import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface CodeIconProps {
  tailwindClass?: string
}

export const CodeIcon: FC<CodeIconProps> = ({ tailwindClass }) => {
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
        Download more icon variants from https://tabler-icons.io/i/code
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <polyline points="7 8 3 12 7 16"></polyline>
      <polyline points="17 8 21 12 17 16"></polyline>
      <line x1="14" y1="4" x2="10" y2="20"></line>
    </svg>
  )
}
