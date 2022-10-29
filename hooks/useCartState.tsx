import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { ICartProduct } from '@interfaces/frontend/ICartProduct';
import { IProductModel } from '@interfaces/models/IProductModel';
import { PaymentType } from '@prisma/client';
import {
    addProductToCart, clearCartState, removeProductFromCart, setDeliveryDate, setPaymentType,
    setProductQuantity
} from '@redux/slices/cartSlice';

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
