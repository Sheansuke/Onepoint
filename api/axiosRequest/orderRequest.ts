import { API_ORDER_URL } from '@constants'
import { IApiResponse } from '@interfaces/api'
import { PaymentType } from '@prisma/client';
import axios from 'axios'
import { IOrderModel } from '@interfaces/models/IOrderModel'
import { createEmailRequest } from './emailRequest';

export const orderRequest = axios.create({
  baseURL: API_ORDER_URL
})

export const getAllOrderPaymentTypeRequest = async () =>
  orderRequest.get<IApiResponse<PaymentType[]>>('').then(res => res.data?.data)

export const updateOrderRequest = async (order: IOrderModel) => {
  try {
    await orderRequest.patch('/', {
      order
    }).then(()=>{
      createEmailRequest(`${order?.id}`, true)
    })
  } catch (error) {
    throw new Error(error)
  }
}

