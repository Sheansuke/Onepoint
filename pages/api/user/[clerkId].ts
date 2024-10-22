import { findUniqueUserByClerkId } from '@api/database/user';
import { withAuth } from '@clerk/nextjs/api';
import { IApiResponse } from '@interfaces/api/IApiResponse';
import { User } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next'
export default withAuth(
  async (req: NextApiRequest, res: NextApiResponse<IApiResponse<User>>) => {
    const { userId } = (req as any).auth

    if (userId) {
      try {
        const user = await findUniqueUserByClerkId(userId)
        return res.status(200).json({
          data: user,
          message: 'Usuario encontrado',
          statusCode: 200
        })
      } catch (error) {
        // console.log('🚀 ~ file: [clerkId].ts ~ line 21 ~ error', error)

        return res.status(400).json({
          data: null,
          message: 'Usuario no encontrado',
          statusCode: 400
        })
      }
    }
  }
)
