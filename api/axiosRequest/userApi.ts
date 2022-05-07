import axios from 'axios'
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel'

export const userApi = axios.create({
  baseURL: '/api/user'
})

export const createOrUpdateDeliveryAddress = async (
  email: string,
  deliveryAddress: IDeliveryAddressModel
) => {
  try {
    await userApi.post('/address', {
      email,
      deliveryAddress
    })
  } catch (error) {
    throw new Error(error)
  }
}
