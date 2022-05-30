import { Order } from '@prisma/client';
import { withAuth } from '@clerk/nextjs/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IApiResponse } from '@interfaces/api/IApiResponse'
import { findManyOrdersByUserId } from '../../../api/database/order';

export default withAuth(
  async (req: NextApiRequest, res: NextApiResponse<IApiResponse<Order[]>>) => {
    const { userId } = (req as any).auth

    if (userId) {
      try {
        const orders = await findManyOrdersByUserId(userId)
        return res.status(200).json({
          data: orders,
          message: 'Ordenes encontradas',
          statusCode: 200
        })
      } catch (error) {
        console.log('🚀 ~ file: [clerkId].ts ~ line 21 ~ error', error)

        return res.status(200).json({
          data: null,
          message: 'Ordenes no encontradas',
          statusCode: 400
        })
      }
    }
  }
)
