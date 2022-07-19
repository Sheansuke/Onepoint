import { API_SEND_EMAIL } from '@constants'
import axios from 'axios'

export const emailRequest = axios.create({
  baseURL: API_SEND_EMAIL
})

export const createEmailRequest = async (orderId: string, isUpdate: boolean) => {

  try {
    await emailRequest.post('/', {
      orderId,
      isUpdate,
    })
  } catch (error) {
    throw new Error(error)
  }
}
