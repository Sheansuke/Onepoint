import { IOrderModel } from '@interfaces/models'
import { Order } from '@prisma/client'
import prisma from '@prisma/prismaClient'

export const findOrderById = async (id: string): Promise<Order> => {
  const order = await prisma.order.findUnique({
    where: {
      id
    },
    include: {
      status: true,
      user: {
        include: {
          deliveryAddress: true
        }
      }
    }
  })

  if (!order) {
    throw new Error('Fallo al intentar encontrar la orden')
  }

  return order
}
