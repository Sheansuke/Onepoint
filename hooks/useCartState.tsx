import { ICartProduct } from '@interfaces/frontend/ICartProduct'
import { addProductToCart } from '@redux/slices/cartSlice'
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
          id: product.id,
          title: product.title,
          slug: product.slug,
          description: product.description,
          imageUrl: product.imageUrl,
          tags: product.tags,
          inStock: product.inStock,
          price: product.price,
          quantity: quantity ? quantity : 1
        } as ICartProduct)
      )
    },
    []
  )

  return {
    cartState,
    handleAddProductToCart
  }
}
