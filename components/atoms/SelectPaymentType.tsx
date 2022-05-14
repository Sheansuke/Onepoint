import { getAllOrderPaymentTypeRequest } from '@api/axiosRequest/orderRequest'
import { useCartState } from '@hooks/useCartState'
import { FormControl, Select, MenuItem } from '@mui/material'
import { PaymentType } from '@prisma/client'

import React, { FC, useState } from 'react'
import { useQuery } from 'react-query'

interface SelectPaymentTypeProps {
  // name?: string;
}

export const SelectPaymentType: FC<SelectPaymentTypeProps> = () => {
  const { data } = useQuery('paymentTypes', () =>
    getAllOrderPaymentTypeRequest()
  )
  const { cartState, handleSetPaymentType, handleSetDeliveryDate } =
    useCartState()
  const [paymentType, setPaymentType] = useState<number>(
    cartState?.paymentType?.id
    )
    console.log("🚀 ~ file: SelectPaymentType.tsx ~ line 20 ~ paymentType", paymentType)

  const handleChange = (event: React.ChangeEvent<any>) => {
    setPaymentType(event.target.value)
    const paymentTypeState = data?.find(
      (item: PaymentType) => item.id === event.target.value
    )
    handleSetPaymentType(paymentTypeState)
    if (event.target.value === 'transferencia') {
      handleSetDeliveryDate(undefined)
    }
  }

  return (
    <FormControl fullWidth>
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
    </FormControl>
  )
}
