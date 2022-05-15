import { useCartState } from '@hooks/useCartState'
import { InfoOutlined } from '@mui/icons-material'
import { Box, Button, useTheme } from '@mui/material'
import { dateTwoDaysValidation } from '@utils/dateTwoDaysValidation'
import { showNotification } from '@utils/showNotification'
import { format } from 'date-fns'
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface SelectDeliveryDateProps {
  buttonWidth?: number
}

export const SelectDeliveryDate: FC<SelectDeliveryDateProps> = ({
  buttonWidth
}) => {
  const { palette } = useTheme()
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
        <Box
          sx={{
            position: 'absolute',
            top: -1000
          }}
        >
          <DatePicker
            startOpen={isOpen}
            onChange={date => handleAccept(date)}
            // onSelect={handleAccept}
            onCalendarClose={() => setIsOpen(false)}
            minDate={new Date()}
            withPortal
          />
        </Box>
      )}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            aria-label="elegir dia de entrega"
            onClick={toggleOpen}
            size="large"
            variant="outlined"
            sx={{
              borderColor: palette.primary[500],
              color: palette.primary[500],
              width: buttonWidth ? buttonWidth : '100%'
            }}
          >
            Elegir dia de entrega
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <InfoOutlined
            color="info"
            sx={{
              fontSize: 20,
              mr: 0.2
            }}
          />
          <small>
            Debe seleccionar un dia de entrega de 2 dias despues de la fecha
            actual
          </small>
        </Box>
      </Box>
    </>
  )
}
