import { withAuth } from '@clerk/nextjs/api';
import { IApiResponse } from '@interfaces/api/IApiResponse';
import { Order } from '@prisma/client';

import { findManyOrdersByUserId } from '../../../api/database/order';

import type { NextApiRequest, NextApiResponse } from 'next'


export default withAuth(
  async (req: NextApiRequest, res: NextApiResponse<IApiResponse<Order[]>>) => {
    const { userId } = (req as any).auth
    const { page, limit } = req.query

    if (!page || !limit) {
      console.log(
        '🚀 ~ file: orders.ts ~ line 14 ~ /api/user/orders.ts',
        "No se ha especificado la página y/o el límite'"
      )

      return res.status(400).json({
        data: null,
        statusCode: 400,
        message: 'No se ha especificado la página y/o el límite'
      })
    }

    if (!userId) {
      return res.status(400).json({
        data: null,
        message: 'No se ha podido identificar correctamente el usuario',
        statusCode: 400
      })
    }

    try {
      const orders = await findManyOrdersByUserId(
        userId,
        Number(page),
        Number(limit)
      )
      return res.status(200).json({
        data: orders,
        message: 'Ordenes encontradas',
        statusCode: 200
      })
    } catch (error) {
      console.log(
        '🚀 ~ file: [clerkId].ts ~ line 21 ~ /api/user/orders.ts',
        error
      )

      return res.status(200).json({
        data: null,
        message: 'Ordenes no encontradas',
        statusCode: 400
      })
    }
  }
)
