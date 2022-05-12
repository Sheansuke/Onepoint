import { IUserModel } from './'
import { ICartProduct } from '../frontend/ICartProduct';
import { PaymentType } from '@redux/slices/cartSlice';

export interface IOrderModel {
  id: number
  user?: IUserModel
  items: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  status: string
  paymentType: PaymentType
  deliveryDate: Date
  isPaid: boolean
  paidAt: Date
  transactionId?: string
}
