import { findManyOrderPaymentType } from '@api/database/order'
import { Order, PaymentType } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IApiResponse } from '../../../interfaces/api/IApiResponse'
import { updateOrder } from '../../../api/database/cart'
import { IOrderModel } from '../../../interfaces/models/IOrderModel'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<any>>
) {
  switch (req.method) {
    case 'GET':
      return getAllOrderPaymentTypeRequest(req, res)
    case 'PATCH':
      return putOrder(req, res)

    default:
      return res.status(405).json({
        data: null,
        statusCode: 405,
        message: 'metodo no permitido'
      })
  }
}

export const getAllOrderPaymentTypeRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<PaymentType[]>>
) => {
  try {
    const paymentTypes = await findManyOrderPaymentType()
    return res.status(200).json({
      data: paymentTypes,
      statusCode: 200,
      message: 'tipos de pago encontrados'
    })
  } catch (error) {
    console.log(
      '🚀 ~ file: index.ts ~ line 28 ~ getAllOrderPaymentTypeRequest ~ error',
      error
    )
    return res.status(400).json({
      data: null,
      statusCode: 400,
      message: 'no se pudo optener los tipos de pago'
    })
  }
}

export const putOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<Order>>
) => {
  const { order } = req.body as { order: Order }

  try {
    const updatedOrder = await updateOrder(order)
    return res.status(200).json({
      data: updatedOrder,
      statusCode: 200,
      message: 'orden actualizada'
    })
  } catch (error) {
    console.log(
      '🚀 ~ file: index.ts ~ line 28 ~ getAllOrderPaymentTypeRequest ~ error',
      error
    )
    return res.status(400).json({
      data: null,
      statusCode: 400,
      message: 'no se pudo actualizar la orden'
    })
  }
}
