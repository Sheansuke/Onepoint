import { tw } from '@utils/tailwindClass'
import { FC, ReactNode } from 'react'

interface ButtonProps {
  type: 'submit' | 'button'
  text?: string
  arialLabel: string
  tailwindClass?: string | undefined
  isLoading?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  type,
  tailwindClass,
  isLoading = false,
  text = '',
  arialLabel,
  children,
  onClick
}) => {
  return (
    <button
      aria-label={arialLabel}
      type={type}
      onClick={onClick}
      className={tw('btn', isLoading && 'loading', tailwindClass)}
      disabled={isLoading}
    >
      {!isLoading && children}
      {text}
    </button>
  )
}
