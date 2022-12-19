import sgMail from '@sendgrid/mail'

export interface ISendEmail {
  template: string
  isUpdate?: boolean
  userInfo: any
  userEmail: string
  order: any
}

export const sendEmail = async ({
  template,
  isUpdate,
  userInfo,
  userEmail,
  order
}: ISendEmail) => {
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

  const sendToUser = {
    template: template,
    to: userEmail,
    template_id: process.env.TEMPLATE_ID,
    from: process.env.FROM_EMAIL,
    dynamic_template_data: {
      subject: isUpdate
        ? 'Se ha actualizado una de sus ordenes'
        : 'Orden realizada con exito!',
      name: `${deliveryAddress?.name} ${deliveryAddress?.lastName}`,
      companyName: process.env.COMPANY_NAME,
      order: {
        ...orderInfo,
        deliveryDate: orderInfo?.deliveryDate || 'Sin seleccionar',
        isPaid: orderInfo?.isPaid ? 'Si' : 'No',
        paidAt: orderInfo?.deliveryDate || 'Aun sin pagar',
        transactionId: orderInfo?.transactionId || 'Sin transferencia realizada'
      }
    }
  }
  await sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

  // TO USER
  await sgMail.send(sendToUser as any)

  // TO ADMIN = FROM_EMAIL IN ENV
  const sendToAdmin = {
    ...sendToUser,
    to: process.env.FROM_EMAIL,
    dynamic_template_data: {
      ...sendToUser.dynamic_template_data,
      subject: isUpdate
        ? `El cliente ${deliveryAddress?.name} ${deliveryAddress?.lastName} ha actualizado una compra`
        : `El cliente ${deliveryAddress?.name} ${deliveryAddress?.lastName} ha realizado una compra`
    }
  }
  await sgMail.send(sendToAdmin as any)
}
