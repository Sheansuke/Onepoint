import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '@clerk/nextjs/api'
import { IApiResponse } from '@interfaces/api/IApiResponse'
import { ICreateOrderRequest } from '@api/axiosRequest/cartRequest'
import { findManyProductsByArrayId } from '@api/database/product'
import { findUniqueUserByClerkId } from '@api/database/user'
import { Order } from '@prisma/client'
import { createOrder } from '@api/database/cart'

export default withAuth(
  (req: NextApiRequest, res: NextApiResponse<IApiResponse<null>>) => {
    switch (req.method) {
      case 'POST':
        return createOrderApi(req, res)

      default:
        return res.status(400).json({
          data: null,
          statusCode: 400,
          message: 'Bad request'
        })
    }
  }
)

export const createOrderApi = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<Order>>
) => {
  const { userId } = (req as any).auth
  const { items, deliveryDate, paymentType } = req.body as ICreateOrderRequest

  // obtain db products by ids
  const productsIds = items.map(item => item.id)
  const numberOfItems = items.reduce(
    (prev, current) => prev + current.quantity,
    0
  )

  // check if user exist in database and get products
  const [user, dbProducts] = await Promise.all([
    findUniqueUserByClerkId(userId),
    findManyProductsByArrayId(productsIds)
  ])

  if (!user || !dbProducts) {
    console.log(
      '🚀 ~ file: order.ts ~ line 35 ~ user',
      'Fallo algo al intentar obtener el usuario o los productos'
    )
    return res.status(401).json({
      data: null,
      statusCode: 401,
      message: 'Fallo algo al intentar obtener el usuario o los productos'
    })
  }

  // optain taxRate by .env
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
  try {
    // optain subTotal by dbProducts
    const subTotal = items.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        product => product.id === current.id
      )?.price
      if (!currentPrice) {
        throw new Error('Product price not found')
      }

      return currentPrice * current.quantity + prev
    }, 0)

    const total = subTotal * (1 + taxRate)

    // in this point all is correct (taxRate,subTotal,total, user)

    const newOrder: Order = {
      id: undefined,
      userId: user.id,
      items: JSON.parse(JSON.stringify(items)),
      numberOfItems,
      subTotal,
      tax: taxRate,
      total,
      orderStatusId: 1,
      paymentTypeId: paymentType?.id,
      deliveryDate: new Date(deliveryDate),
      isPaid: false,
      paidAt: null,
      transactionId: null,
      createAt:  new Date(Date.now())


    }

    // create order in database
    const order = await createOrder(newOrder)
    if (order) {
      return res.status(200).json({
        data: order,
        statusCode: 200,
        message: 'Orden creada con exito'
      })
    }
  } catch (error) {
    console.log('🚀 ~ file: order.ts ~ line 47 ~ error', error)
    return res.status(400).json({
      data: null,
      statusCode: 400,
      message: 'Ocurrio un error y no se pudo generar la orden'
    })
  }
}
