import { findOrderById } from '@api/database/order';
import { findUniqueDeliveryAddressByClerkId, findUniqueUserByClerkId } from '@api/database/user';
import { withAuth } from '@clerk/nextjs/api';
import sgMail from '@sendgrid/mail';

import type { NextApiRequest, NextApiResponse } from 'next'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
    id: order.id.slice(0, 8),
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
    subject: isUpdate
      ? 'Se ha actualizado una de sus ordenes'
      : 'Orden realizada con exito!',
    template_id: process.env.TEMPLATE_ID,
    to: userEmail,
    from: process.env.FROM_EMAIL,
    dynamic_template_data: {
      name: `${deliveryAddress?.name} ${deliveryAddress?.lastName}`,
      companyName: process.env.COMPANY_NAME,
      order: {
        ...orderInfo,
        deliveryDate: orderInfo?.deliveryDate || "Sin seleccionar",
        paidAt: orderInfo?.deliveryDate || "Aun sin pagar",
        transactionId: orderInfo?.transactionId || 'Sin transferencia realizada'
      }
    }
  }

  // DATA FOR ADMIN EMAIL
  const adminDataEmail = {
    template: 'admin',
    subject: isUpdate
      ? 'Se ha actualizado la siguiente orden'
      : 'Alguien ha realizado una orden!',
    to: process.env.FROM_EMAIL,
    template_id: process.env.TEMPLATE_ID,
    from: process.env.FROM_EMAIL,
    dynamic_template_data: {
      name: `${deliveryAddress?.name} ${deliveryAddress?.lastName}`,
      companyName: process.env.COMPANY_NAME,
      order: {
        ...orderInfo,
        deliveryDate: orderInfo?.deliveryDate || "Sin seleccionar",
        isPaid: orderInfo?.isPaid ? 'Si' : 'No',
        paidAt: orderInfo?.deliveryDate || "Aun sin pagar",
        transactionId: orderInfo?.transactionId || 'Sin transferencia realizada'
      }
    }
  }

  try {
    sgMail.send(userDataEmail as any)
    sgMail.send(adminDataEmail as any)

    return res.status(200).json({
      data: null,
      statusCode: 200,
      message: 'Enviando correo al usuario'
    })
  } catch (error) {
    return res.status(409).json({
      data: null,
      statusCode: 409,
      message: 'algo fallo al enviar correo a usuario'
    })
  }
})
