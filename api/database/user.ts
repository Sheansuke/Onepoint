import { IApiResponse } from '@interfaces/api'
import { PrismaClient } from '@prisma/client'
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel'

export const getDeliveryAddressByClerkId = async (
  clerkId: string
): Promise<IDeliveryAddressModel> => {
  const prisma = new PrismaClient()
  const deliveryAddress = await prisma.deliveryAddress.findFirst({
    where: {
      user: {
        clerkId
      }
    }
  })

  return deliveryAddress
}
