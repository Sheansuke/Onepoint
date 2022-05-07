import { format } from 'date-fns'

export const dateTwoDaysValidation = (date: Date | null): boolean => {
  const currentDay = Number(format(new Date(), 'dd'))
  const selectedDay = Number(format(new Date(date) ?? new Date(), 'dd'))
  if (selectedDay > currentDay + 1) {
    return true
  } else {
    return false
  }
}

