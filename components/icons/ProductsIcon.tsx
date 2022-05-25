import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface ProductsIconProps {
    tailwindClass?: string
}

export const ProductsIcon: FC<ProductsIconProps> = ({tailwindClass}) => {
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
        Download more icon variants from https://tabler-icons.io/i/barcode
      </desc>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 7v-1a2 2 0 0 1 2 -2h2"></path>
      <path d="M4 17v1a2 2 0 0 0 2 2h2"></path>
      <path d="M16 4h2a2 2 0 0 1 2 2v1"></path>
      <path d="M16 20h2a2 2 0 0 0 2 -2v-1"></path>
      <rect x="5" y="11" width="1" height="2"></rect>
      <line x1="10" y1="11" x2="10" y2="13"></line>
      <rect x="14" y="11" width="1" height="2"></rect>
      <line x1="19" y1="11" x2="19" y2="13"></line>
    </svg>
  )
}
