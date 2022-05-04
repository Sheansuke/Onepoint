import { ICartProduct } from '@interfaces/frontend/ICartProduct'
import { addProductToCart, decrementProductQuantity, incrementProductQuantity, PaymentType, removeProductFromCart, setDeliveryDate, setPaymentType } from '@redux/slices/cartSlice'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { IProductModel } from '../interfaces/models/IProductModel'

export const useCartState = () => {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cartState)


  const handleAddProductToCart = useCallback(
    (product: IProductModel, quantity: number) => {
      dispatch(
        addProductToCart({
          ...product,
          quantity: quantity ? quantity : 1
        } as ICartProduct)
      )
    },
    []
  )
  const handleRemoveProductFromCart = useCallback(
    (product: ICartProduct) => {
      dispatch(
        removeProductFromCart({
          ...product
        } as ICartProduct)
      )
    },
    []
  )

  const handleIncrementProductQuantity = useCallback(
    (product: ICartProduct) => {
      dispatch(
        incrementProductQuantity({
          ...product,
        } as ICartProduct)
      )
    },
    []
  )

  const handledecrementProductQuantity = useCallback(
    (product: ICartProduct) => {
      dispatch(
        decrementProductQuantity({
          ...product
        } as ICartProduct)
      )
    },
    []
  )

  const handleSetPaymentType = useCallback(
    (paymentType: PaymentType) => {
      dispatch(
        setPaymentType(paymentType)
      )
    },
    []
  )
  const handleSetDeliveryDate = useCallback(
    (deliveryDate: string) => {
      dispatch(
        setDeliveryDate(deliveryDate)
      )
    },
    []
  )

  return {
    cartState,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleIncrementProductQuantity,
    handledecrementProductQuantity,
    handleSetPaymentType,
    handleSetDeliveryDate
  }
}
