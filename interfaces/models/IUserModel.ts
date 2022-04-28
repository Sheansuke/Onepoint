import { IDeliveryAddressModel } from './';
import { IOrderModel } from './';

export interface IUserModel {
  id: number;
  clerkId: string;
  email: string;
  role? : string
  order?: IOrderModel[];
  deliveryAddress?: IDeliveryAddressModel
}
