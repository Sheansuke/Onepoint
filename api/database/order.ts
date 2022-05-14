import { IOrderModel } from '@interfaces/models'
import { Order, PaymentType } from '@prisma/client'
import prisma from '@prisma/prismaClient'

export const findOrderById = async (id: string): Promise<Order> => {
  const order = await prisma.order.findUnique({
    where: {
      id
    },
    include: {
      status: true,
      paymentType: true,
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

export const findManyOrderPaymentType = async (): Promise<PaymentType[]> => {
  const paymentTypes = await prisma.paymentType.findMany()

  if (!paymentTypes) {
    throw new Error('Fallo al intentar encontrar los tipos de pago')
  }

  return paymentTypes
}
