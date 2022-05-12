import { ICartProduct } from '@interfaces/frontend/ICartProduct'
import {
  addProductToCart,
  setProductQuantity,
  PaymentType,
  removeProductFromCart,
  setDeliveryDate,
  setPaymentType,
  clearCartState
} from '@redux/slices/cartSlice'
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
  const handleRemoveProductFromCart = useCallback((product: ICartProduct) => {
    dispatch(
      removeProductFromCart({
        ...product
      } as ICartProduct)
    )
  }, [])

  const handleSetProductQuantity = useCallback(
    (product: ICartProduct) => {
      dispatch(
        setProductQuantity({
          ...product
        } as ICartProduct)
      )
    },
    []
  )

  const handleSetPaymentType = useCallback((paymentType: PaymentType) => {
    dispatch(setPaymentType(paymentType))
  }, [])
  const handleSetDeliveryDate = useCallback((deliveryDate: string) => {
    dispatch(setDeliveryDate(deliveryDate))
  }, [])

  const handleClearState = useCallback(() => {
    dispatch(clearCartState())
  }, [])

  return {
    cartState,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleSetProductQuantity,
    handleSetPaymentType,
    handleSetDeliveryDate,
    handleClearState
  }
}
