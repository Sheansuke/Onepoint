import { DeliveryAddress, PrismaClient } from '@prisma/client'
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel'

export const findFirstDeliveryAddressByClerkId = async (
  clerkId: string
): Promise<IDeliveryAddressModel> => {
  if (clerkId) {
    const prisma = new PrismaClient()
    const user = await prisma.user.findFirst({
      where: {
        clerkId
      },
      include: {
        order: true,
        role: true
      }
    })

    if (!user) {
      throw new Error('No se encontro el usuario')
    }

    const deliveryAddress = await prisma.deliveryAddress.findFirst({
      where: {
        user: {
          id: user.id
        }
      }
    })
    return deliveryAddress
  }

  return null
}

export const upSertDeliveryAddress = async (
  email: string,
  deliveryAddress: DeliveryAddress
): Promise<DeliveryAddress> => {
  if (email && deliveryAddress) {
    const prisma = new PrismaClient()
    const user = await prisma.user.findFirst({
      where: {
        email
      },
      include: {
        order: true,
        role: true
      }
    })

    if (!user) {
      throw new Error('No se encontro el usuario')
    }

    const deliveryAddressUpdated = await prisma.deliveryAddress.upsert({
      where: {
        userId: user.id
      },
      create: {
        userId: user.id,
        ...deliveryAddress
      },
      update: deliveryAddress
    })

    return deliveryAddressUpdated
  }
}
