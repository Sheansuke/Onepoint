import prisma from '@prisma/prismaClient'

interface IFiltersOrders {
  isPaid?: boolean
}

/** empty argument  return all orders */
export const findManyOrdersOnlyCount = async (filters?: IFiltersOrders) => {
  const orders = await prisma.order.count({
    where: filters
  })

  return orders
}

interface IFiltersProducts {
  inStock?: number
}

export const findManyProductsOnlyCount = async (filters?: IFiltersProducts) => {
  const products = await prisma.product.count({
    where: filters
  })

  return products
}
