import axios from 'axios'

import { API_SEND_EMAIL } from '@constants'

export const emailRequest = axios.create({
  baseURL: API_SEND_EMAIL
})

export const createEmailRequest = async (
  orderId: string,
  isUpdate: boolean
) => {
  try {
    await emailRequest.post('', {
      orderId,
      isUpdate
    })
  } catch (error) {
    console.log(
      '🚀 ~ file: emailRequest.ts ~ line 16 ~ createEmailRequest ~ error',
      error
    )
    throw new Error(error)
  }
}
