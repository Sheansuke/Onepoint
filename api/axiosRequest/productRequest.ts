import axios from 'axios';

import { API_PRODUCT_URL } from '@constants';
import { IApiResponse } from '@interfaces/api/IApiResponse';
import { IProductModel } from '@interfaces/models/IProductModel';

export const productRequest = axios.create({
  baseURL: API_PRODUCT_URL
})



export const getAllProducts = () => productRequest.get<IApiResponse<IProductModel[]>>("").then(res => res.data?.data)
