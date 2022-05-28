import { Product } from '@prisma/client'
import prisma from '@prisma/prismaClient'

export const findManyProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany()

  if (!products) {
    throw new Error('No se encontraron productos')
  }

  return products
}

export const findManyProductsByArrayId = async (
  productsIds: number[]
): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds
      }
    }
  })

  if (!products) {
    throw new Error('No se encontraron productos')
  }

  return products
}

export const findManyProducstByTitle = async (
  title: string
): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: {
      title: {
        startsWith: title
      }

    }
  })

  if (!products || products.length === 0) {
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
