import axios from 'axios';

import { API_USER_URL } from '@constants';
import { IApiResponse } from '@interfaces/api/IApiResponse';
import { IDeliveryAddressModel } from '@interfaces/models/IDeliveryAddressModel';
import { IUserModel } from '@interfaces/models/IUserModel';
import { Order } from '@prisma/client';

export const userRequest = axios.create({
  baseURL: API_USER_URL
})

export const createOrUpdateDeliveryAddressRequest = async (
  email: string,
  deliveryAddress: IDeliveryAddressModel
) => {
  try {
    await userRequest.post('/address', {
      email,
      deliveryAddress
    })
  } catch (error) {
    throw new Error(error)
  }
}


// user id is optained from the token by clerk auth in /api/user/[clerkId]
export const getUserRequest = () => userRequest.get<IApiResponse<IUserModel>>("*").then(res => res.data)

// user id is optained from the token by clerk auth in /api/user/orders.tsx
export const getAllOrders = async (page: number,limit: number) =>
userRequest.get<IApiResponse<Order[]>>(`/orders?page=${page}&limit=${limit}`).then(res => res.data?.data)

