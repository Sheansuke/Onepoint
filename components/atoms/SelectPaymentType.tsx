import { getAllOrderPaymentTypeRequest } from '@api/axiosRequest/orderRequest'
import { useCartState } from '@hooks/useCartState'
import { FormControl, Select, MenuItem, CircularProgress, Box, Typography } from '@mui/material'
import { PaymentType } from '@prisma/client'

import React, { FC, useState } from 'react'
import { useQuery } from 'react-query'

interface SelectPaymentTypeProps {
  // name?: string;
}

export const SelectPaymentType: FC<SelectPaymentTypeProps> = () => {
  const { data, isLoading } = useQuery('paymentTypes', () =>
    getAllOrderPaymentTypeRequest()
  )
  const { cartState, handleSetPaymentType, handleSetDeliveryDate } =
    useCartState()
  const [paymentType, setPaymentType] = useState<number>(
    cartState?.paymentType?.id
  )

  const handleChange = (event: React.ChangeEvent<any>) => {
    setPaymentType(event.target.value)
    const paymentTypeState = data?.find(
      (item: PaymentType) => item.id === event.target.value
    )
    handleSetPaymentType(paymentTypeState)
    if (paymentTypeState.id === 2) {
      handleSetDeliveryDate(undefined)
    }
  }

  return (
    <FormControl fullWidth>
      {isLoading ? (
        <Box display="flex" alignItems="center">
        <CircularProgress />  <Typography variant='subtitle2' ml={1}>Cargando tipos de pago...</Typography>
        </Box>
      ) : (
        <Select
          labelId="selectPaymentTypeLabel"
          id="selectPaymentType"
          value={paymentType}
          onChange={handleChange}
        >
          {data?.map((paymentType: PaymentType) => (
            <MenuItem key={paymentType.id} value={paymentType.id}>
              {paymentType.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  )
}
