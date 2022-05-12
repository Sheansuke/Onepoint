import { Order } from '@prisma/client'
import prisma from '@prisma/prismaClient'

export const createOrder = async (newOrder: Order): Promise<Order> => {
  const order = await prisma.order.create({
    data: newOrder
  })

  if (!order) {
    throw new Error('Fallo al intentar crear el pedido')
  }

  return order
}
