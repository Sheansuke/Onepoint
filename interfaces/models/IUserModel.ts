import { IDeliveryAddressModel } from './';
import { IOrderModel } from './';

export interface IUserModel {
  id: number;
  clerkId: string;
  email: string;
  role? : {
    id: number;
    name: string;
  }
  order?: IOrderModel[];
  deliveryAddress?: IDeliveryAddressModel
}
