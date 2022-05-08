import { API_USER_URL } from '@constants'
import axios from 'axios'
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel'
import { IApiResponse } from '../../interfaces/api/IApiResponse';
import { IUserModel } from '../../interfaces/models/IUserModel';

export const userApi = axios.create({
  baseURL: API_USER_URL
})

export const createOrUpdateDeliveryAddress = async (
  email: string,
  deliveryAddress: IDeliveryAddressModel
) => {
  try {
    await axios.post('/address', {
      email,
      deliveryAddress
    })
  } catch (error) {
    throw new Error(error)
  }
}


// user id is optained from the token by clerk auth
export const getUser = () => userApi.get<IApiResponse<IUserModel>>("*").then(res => res.data)
