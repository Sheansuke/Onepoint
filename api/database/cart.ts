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

export const updateOrder = async (newOrder: Order): Promise<Order> => {
  const order = await prisma.order.update({
    where: {
      id: newOrder.id
    },
    data: {
      transactionId: newOrder.transactionId,
      deliveryDate: newOrder.deliveryDate,
      orderStatusId: 3
    }
  })

  if (!order) {
    throw new Error('Fallo al intentar actualizar el pedido')
  }

  return order
}
