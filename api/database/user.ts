import prisma from '@prisma/prismaClient'
import { DeliveryAddress, User } from '@prisma/client'

export const findUniqueDeliveryAddressByClerkId = async (
  clerkId: string
): Promise<DeliveryAddress> => {
  if (clerkId) {
    const user = await prisma.user.findUnique({
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

    const deliveryAddress = await prisma.deliveryAddress.findUnique({
      where: {
        userId: user.id
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
    const user = await prisma.user.findUnique({
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

export const findUniqueUserByClerkId = async (
  clerkId: string
): Promise<User> => {
  if (clerkId) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          clerkId
        },
        include: {
          role: true
        }
      })

      if (!user) {
        throw new Error('No se encontro el usuario')
      }

      return user
    } catch (error) {
      console.log('🚀 ~ file: user.ts ~ line 88 ~ error', error)
      throw new Error('No se encontro el usuario')
    }
  }
}
