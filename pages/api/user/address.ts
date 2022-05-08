import type { NextApiRequest, NextApiResponse } from 'next'
import { IApiResponse } from '../../../interfaces/api/IApiResponse'
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel'
import { upSertDeliveryAddress } from '../../../api/database/user'

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

  try {
    const deliveryAddressUpdated = await upSertDeliveryAddress(
      email,
      deliveryAddress
    )

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
