import { IUserModel } from './'
import { IOrderStatusModel } from './'

export interface IOrderModel {
  id: number
  user?: IUserModel
  items: {[key: string]: string}[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  status: string
  deliveryDate: Date
  isPaid: boolean
  paidAt: Date
  transactionId?: string
}
