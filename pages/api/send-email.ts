import {sendEmail} from '../../utils/sendEmail/sendEmail'
import { withAuth } from '@clerk/nextjs/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  findUniqueDeliveryAddressByClerkId,
  findUniqueUserByClerkId
} from '@api/database/user'
import { findOrderById } from '@api/database/order'

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

  const deliveryAddress = {
    name: userInfo?.name,
    lastName: userInfo?.lastName
  }

  const orderInfo = {
    id: order.id.slice(0, 8) ,
    items: order?.items,
    numberOfItems: order?.numberOfItems,
    subTotal: order?.subTotal,
    tax: order?.tax,
    total: order?.total,
    status: order?.status.name,
    paymentType: order?.paymentType.name,
    deliveryDate: order?.deliveryDate,
    isPaid: order?.isPaid,
    paidAt: order?.paidAt,
    transactionId: order?.transactionId
  }

  // DATA FOR USER EMAIL
  const userDataEmail = {
    template: 'user',
    subject: isUpdate ? "Se ha actualizado una de sus ordenes" : "Orden realizada con exito!",
    to: userEmail,
    deliveryAddress,
    order: orderInfo
  }

  // DATA FOR ADMIN EMAIL
  const adminDataEmail = {
    template: 'admin',
    subject: isUpdate ? "Se ha actualizado la siguiente orden" : 'Alguien ha realizado una orden!',
    to: process.env.FROM_EMAIL,
    deliveryAddress,
    order: orderInfo
  }
  sendEmail(userDataEmail)
  sendEmail(adminDataEmail)
  
  return res.status(200).json({
    data: null,
    statusCode: 200,
    message: 'Enviando correo al usuario'
  })
})
