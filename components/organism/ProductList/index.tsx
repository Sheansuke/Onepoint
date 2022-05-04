import { Box, Grid, Typography } from '@mui/material'
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
        products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Typography mt={5}>No se encontraron productos...</Typography>
        </Box>
      )}
    </Grid>
  )
}
