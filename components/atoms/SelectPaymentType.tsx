import { useCartState } from '@hooks/useCartState'
import { FormControl, Select, MenuItem } from '@mui/material'
import { PaymentType } from '@redux/slices/cartSlice'
import React, { FC, useState } from 'react'

interface SelectPaymentTypeProps {
  // name?: string;
}

export const SelectPaymentType: FC<SelectPaymentTypeProps> = () => {
  const { cartState, handleSetPaymentType, handleSetDeliveryDate } =
    useCartState()
  const [paymentType, setPaymentType] = useState<PaymentType | string>(
    cartState?.paymentType
  )

  const handleChange = (event: React.ChangeEvent<any>) => {
    setPaymentType(event.target.value)
    handleSetPaymentType(event.target.value)
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
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="contra entrega">Contra entrega</MenuItem>
        <MenuItem value="transferencia">Transferencia</MenuItem>
      </Select>
    </FormControl>
  )
}
