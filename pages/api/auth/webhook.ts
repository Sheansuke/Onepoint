import { IApiResponse } from '@interfaces/api';
import { IUserCreated } from '@interfaces/clerk';
import prisma from '@prisma/prismaClient';

import type { NextApiRequest, NextApiResponse } from 'next'
type RequestBody = IUserCreated

/*
This endpoint receive events of Clerk webhooks.

when clerk emit even user.created, we create a new user in our database.
*/

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<RequestBody>>
) {
  const { data } = req.body as RequestBody

  const isExist = await prisma.user.findUnique({
    where: {
      email: data.email_addresses[0].email_address,
    }
  })

  if (isExist) {
    console.error(
      '🚀 ~ file: webhook.ts ~ line 31 ~ prisma:',
      'usuario ya existe en la base de datos'
    )
    return res.status(500).json({
      statusCode: 400,
      message: 'Usuario ya existe en la base de datos',
      data: null
    })
  }

  try {
    await prisma.user.create({
      data: {
        email: data.email_addresses[0].email_address,
        clerkId: data.id,
        role: {
          connect: {
            name: 'cliente'
          }
        }
      }
    })
    console.error(
      '🚀 ~ file: webhook.ts ~ line 31 ~ prisma:',
      'usuario creado en la base de datos'
    )
    return res.status(200).json({
      statusCode: 200,
      message: 'Usuario creado con exito',
      data: null
    })
  } catch (error) {
    console.log(
      '🚀 ~ file: webhook.ts ~ line 32 ~ error:',
      'El usuario no pudo ser creado en la base de datos'
    )
    return res.status(500).json({
      statusCode: 400,
      message: 'Usuario no pudo ser creado',
      data: null
    })
  }
}
