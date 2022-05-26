import { getAllOrderPaymentTypeRequest } from '@api/axiosRequest/orderRequest'
import { useCartState } from '@hooks/useCartState'
import { PaymentType } from '@prisma/client'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

export const SelectPaymentType = () => {
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
      (item: PaymentType) => item?.id === Number(event.target?.value)
    )
    handleSetPaymentType(paymentTypeState)
    if (paymentTypeState?.id === 2) {
      handleSetDeliveryDate(undefined)
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <button
            type="button"
            aria-label="cargando tipos de pago"
            className="btn btn-ghost loading text-mainInfo-primary"
          >
            Cargando tipos de pago...
          </button>
        </div>
      ) : (
        <select
          id="selectPaymentType"
          value={paymentType}
          onChange={handleChange}
          className="select w-full select-bordered"
        >
          {data?.map((paymentType: PaymentType) => (
            <option key={paymentType.id} value={paymentType?.id}>
              {paymentType?.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
