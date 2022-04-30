import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import { ProductCard } from '../../molecules/ProductCard/index'
import { IProductModel } from '../../../interfaces/models/IProductModel'

interface ProductListProps {
  products?: IProductModel[]
}

export const ProductList: FC<ProductListProps> = ({ products = [] }) => {
  return (
    <Grid container spacing={4}>
      {products.length > 0 ? (
        products.map((product, index) => <ProductCard key={index} product={product} />)
      ) : (
        <Typography>No se encontraron productos...</Typography>
      )}
    </Grid>
  )
}