import { API_SEND_EMAIL } from '@constants'
import axios from 'axios'


export const emailRequest = axios.create({
  baseURL: API_SEND_EMAIL
})

export const createEmailRequest = async (
  orderId: string,
  isUpdate: boolean
) => {
  try {
    const data = await emailRequest.post('', {
      orderId,
      isUpdate
    })

    // await axios.post('/.netlify/functions/send-email', data?.data?.data?.userDataEmail)
    // await axios.post('/.netlify/functions/send-email', data?.data?.data?.adminDataEmail)
   

  
  } catch (error) {
    console.log(
      '🚀 ~ file: emailRequest.ts ~ line 16 ~ createEmailRequest ~ error',
      error
    )
    throw new Error(error)
  }
}
