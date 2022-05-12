import { IUserModel } from './'
import { ICartProduct } from '../frontend/ICartProduct';
import { PaymentType } from '@redux/slices/cartSlice';
import { OrderStatus } from '@prisma/client';

export interface IOrderModel {
  id: string
  user?: IUserModel
  items: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  status: OrderStatus
  paymentType: PaymentType
  deliveryDate: Date
  isPaid: boolean
  paidAt: Date
  transactionId?: string
}
