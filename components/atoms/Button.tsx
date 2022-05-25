import { tw } from '@utils/tailwindClass'
import { FC, ReactNode } from 'react'

interface ButtonProps {
  type: 'submit' | 'button'
  text?: string
  tailwindClass?: string
  isLoading?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  type,
  tailwindClass,
  isLoading = false,
  text = '',
  children,
  onClick
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={tw('btn border-none', isLoading && 'loading', tailwindClass)}
      disabled={isLoading}
    >
      {!isLoading && children}
      {text}
    </button>
  )
}
