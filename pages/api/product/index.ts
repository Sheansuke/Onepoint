import { findManyProducts } from '@api/database/product'
import { NextApiRequest, NextApiResponse } from 'next'
import { IApiResponse } from '../../../interfaces/api/IApiResponse'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<any>>
) {
  switch (req.method) {
    case 'GET':
      return getAllProductsRequest(req, res)
    default:
      break
  }
}

export const getAllProductsRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<any>>
) => {
  try {
    const products = await findManyProducts()
    return res.status(200).json({
      data: products,
      statusCode: 200,
      message: 'Productos encontrados'
    })
  } catch (error) {
    return res.status(400).json({
      data: [],
      statusCode: 400,
      message: 'Productos no encontrados'
    })
  }
}
