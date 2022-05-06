import { PrismaClient } from '@prisma/client'
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel';

export const getDeliveryAddressByEmail = async (email: string): Promise<IDeliveryAddressModel> => {
  const prisma = new PrismaClient()
  const deliveryAddress = await prisma.deliveryAddress.findFirst({
    where: {
        user: {
            email
        }
    }
  })

  return deliveryAddress
}
