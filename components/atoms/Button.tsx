import { TypeColorThemes } from '@interfaces/styles/IColorThemes'
import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface ButtonProps {
  type: 'submit' | 'button'
  colorTheme: TypeColorThemes
  tailwindClass?: string
  isLoading: boolean
  text: string
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  type,
  colorTheme,
  tailwindClass,
  isLoading,
  text,
  onClick
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={tw('btn border-none', isLoading && 'loading', tailwindClass)}
      disabled={isLoading}
    >
      {text ?? ''}
    </button>
  )
}
