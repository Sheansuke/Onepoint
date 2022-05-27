import { tw } from '@utils/tailwindClass'
import React, { FC } from 'react'

interface InputProps {
  tailwindClass?: string | undefined
  label?: string
  hasError?: string
  rest?: any
}

export const Input: FC<InputProps> = ({
  tailwindClass,
  label,
  hasError,
  rest
}) => {
  return (
    <div className={tw(tailwindClass)}>
      {label && (
        <label className="label">
          <span className="text-main2-400">{label}</span>
        </label>
      )}
      <input
        className={tw(
          hasError && 'border-error',
          'input input-bordered w-full'
        )}
        {...rest}
      />

      {hasError && (
        <label className="label absolute">
          <span className="label-text-alt text-error">{hasError}</span>
        </label>
      )}
    </div>
  )
}
