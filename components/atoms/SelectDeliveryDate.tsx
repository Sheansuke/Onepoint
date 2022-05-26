import { useCartState } from '@hooks/useCartState'
import { dateTwoDaysValidation } from '@utils/dateTwoDaysValidation'
import { showNotification } from '@utils/showNotification'
import { tw } from '@utils/tailwindClass'
import { WarningIcon } from 'components/icons/WarningIcon'
import { format } from 'date-fns'
import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from './Button'

interface SelectDeliveryDateProps {
  tailwindClass?: string | undefined
}

export const SelectDeliveryDate: FC<SelectDeliveryDateProps> = ({
  tailwindClass
}) => {
  const { handleSetDeliveryDate } = useCartState()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleAccept = (date: Date | null) => {
    const isValidDate = dateTwoDaysValidation(date)
    if (isValidDate) {
      handleSetDeliveryDate(format(date, 'MM-dd-yyyy'))
      showNotification('Fecha seleccionada con exito!', 'success')
    } else {
      showNotification('El dia debe ser 2 dias apartir de hoy', 'warn')
    }
  }

  const toggleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      {isOpen && (
        <div>
          <DatePicker
            startOpen={isOpen}
            onChange={date => handleAccept(date)}
            onCalendarClose={() => setIsOpen(false)}
            minDate={new Date()}
            withPortal
          />
        </div>
      )}
      <div>
        <div>
          <Button
            type="button"
            arialLabel="elegir dia de entrega"
            onClick={toggleOpen}
            tailwindClass={tw(`
            ${tailwindClass}
            btn-outline border-primary text-main-primary hover:bg-main-primary hover:text-main-50 hover:border-none
            `)}
          >
            Elegir dia de entrega
          </Button>
        </div>

        <div className="flex justify-center items-center mt-1">
          <WarningIcon tailwindClass="text-mainWarning-primary mr-1" />
          <small>
            Debe seleccionar un dia de entrega de 2 dias despues de la fecha
            actual
          </small>
        </div>
      </div>
    </>
  )
}
