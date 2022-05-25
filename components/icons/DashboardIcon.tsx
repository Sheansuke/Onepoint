import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface DashboardIconProps {
  tailwindClass?: string
}

export const DashboardIcon: FC<DashboardIconProps> = ({ tailwindClass }) => {
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
        Download more icon variants from
        https://tabler-icons.io/i/layout-dashboard
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 4h6v8h-6z"></path>
      <path d="M4 16h6v4h-6z"></path>
      <path d="M14 12h6v8h-6z"></path>
      <path d="M14 4h6v4h-6z"></path>
    </svg>
  )
}
