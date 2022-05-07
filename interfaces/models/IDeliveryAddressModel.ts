import { IUserModel } from './'
export interface IDeliveryAddressModel {
  id?: number
  user?: IUserModel
  name: string
  lastName: string
  sector: string
  street: string
  referencePlace: string
  phone: string
}
