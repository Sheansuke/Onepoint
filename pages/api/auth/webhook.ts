import { PrismaClient, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUserCreated } from '../../../interfaces/clerk'
import { IApiResponse } from '../../../interfaces/api';



type RequestBody = IUserCreated


/*
This endpoint receive events of Clerk webhooks.
*/

export default async function (req: NextApiRequest, res: NextApiResponse<IApiResponse<RequestBody>>) {
  const prisma = new PrismaClient()
  const {data} = req.body as RequestBody


  const user =  await prisma.user.create({
    data: {
      email: data.email_addresses[0].email_address,
      clerkId: data.id,
      role: {
       connect: {
         name: "user"
       }
      }
    }
  })

  if(!user) {
    res.status(500).json({
      statusCode: 400,
      message: 'Usuario no pudo ser creado',
      data: null
    })
  }

  return res.status(200).json({
    statusCode: 200,
    message: 'Usuario creado con exito',
    data: user as any
})

}
