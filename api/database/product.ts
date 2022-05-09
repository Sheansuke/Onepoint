import { Product } from '@prisma/client'
import prisma from '@prisma/prismaClient'

export const findManyProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany()

  if (!products) {
    throw new Error('No se encontraron productos')
  }

  return products
}

export const findUniqueProduct = async (slug: string): Promise<Product> => {
  const product = await prisma.product.findUnique({
    where: {
      slug
    }
  })

  if (!product) {
    throw new Error('No se encontró el producto')
  }

  return product
}