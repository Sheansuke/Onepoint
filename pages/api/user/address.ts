import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { IApiResponse } from '../../../interfaces/api/IApiResponse'
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel'

type Data = IApiResponse<Partial<IDeliveryAddressModel>>

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrUpdateDeliveryAddress(req, res)

    default:
      return res.status(400).json({
        statusCode: 400,
        message: 'Operacion no valida',
        data: null
      })
  }
}

const createOrUpdateDeliveryAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email, deliveryAddress } = req.body

  const prisma = new PrismaClient()
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      },
      include: {
        order: true,
        role: true
      }
    })

    const deliveryAddressUpdated = await prisma.deliveryAddress.upsert({
      where: {
        userId: user.id
      },
      create: {
        userId: user.id,
        ...deliveryAddress
      },
      update: deliveryAddress
    })

    return res.status(200).json({
      statusCode: 200,
      message: 'Direccion de entrega actualizada',
      data: deliveryAddressUpdated
    })
  } catch (error) {
    console.log('🚀 ~ file: address.ts ~ line 50 ~ error', error)
    return res.status(400).json({
      statusCode: 400,
      message: 'No se pudo realizar la operacion',
      data: null
    })
  }
}
