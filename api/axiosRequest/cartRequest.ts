import { API_CART_URL } from '@constants'
import axios from 'axios'
import { PaymentType } from '../../redux/slices/cartSlice'
import { ICartProduct } from '../../interfaces/frontend/ICartProduct'
import { IDeliveryAddressModel } from '@interfaces/models'

export const cartRequest = axios.create({
  baseURL: API_CART_URL
})

export interface ICreateOrderRequest {
  deliveryAddress: IDeliveryAddressModel
  paymentType: PaymentType
  deliveryDate: string
  items: ICartProduct[]
}

// user is optained from withAuth clerk, in /api/cart/order.ts
export const createOrderRequest = async (order: ICreateOrderRequest) => {
  try {
    const response = await cartRequest.post('/order', order)
    return response.data?.data
  } catch (error) {
    throw new Error(error)
  }
}
