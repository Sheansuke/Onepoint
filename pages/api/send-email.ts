import { findOrderById } from '@api/database/order'
import {
  findUniqueDeliveryAddressByClerkId,
  findUniqueUserByClerkId
} from '@api/database/user'
import { withAuth } from '@clerk/nextjs/api'

import type { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../utils/sendEmail'

export default withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = (req as any).auth
  const { orderId, isUpdate } = req?.body

  if (!userId)
    return console.log(
      '🚀 ~ file: sendEmail.ts ~ line 71 ~ withAuth ~ userId',
      'No se encontro id del usuario'
    )

  // DATA TO SEND EMAIL
  const userInfo = await findUniqueDeliveryAddressByClerkId(userId)
  const userEmail = await (await findUniqueUserByClerkId(userId)).email
  const order: any = await findOrderById(orderId)

  try {
    await sendEmail({ template: 'user', isUpdate, userInfo, userEmail, order })

    return res.status(200).json({
      data: null,
      statusCode: 200,
      message: 'Correos enviados con exito'
    })
  } catch (error) {
    return res.status(409).json({
      data: null,
      statusCode: 409,
      message: 'Algo fallo al enviar correo a usuario'
    })
  }
})
