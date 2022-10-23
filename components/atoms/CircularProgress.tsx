import { tw } from '@utils/tailwindClass'
import { FC } from 'react'

interface ICircularProgressProps {
  tailwindClass?: string
}

// simple circular progress XD
export const CircularProgress: FC<ICircularProgressProps> = ({
  tailwindClass
}) => {
  return (
    <button
      type="button"
      aria-label="loading progress"
      className={tw(
        tailwindClass,
        'btn btn-ghost loading text-mainInfo-primary'
      )}
    />
  )
}
