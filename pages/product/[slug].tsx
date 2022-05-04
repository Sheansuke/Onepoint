import { ControlPointOutlined, RemoveCircleOutline } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { ProductsTestData } from '@utils/ProductsTestData'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { IProductModel } from '../../interfaces/models/IProductModel'
import { ICartProduct } from '../../interfaces/frontend/ICartProduct'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '@redux/slices/cartSlice'
import { useCartState } from '@hooks/useCartState'

interface ProductBySlugPageProps {
  product: IProductModel
}

const ProductBySlugPage: FC<ProductBySlugPageProps> = ({ product }) => {
  const { palette } = useTheme()
  const { handleAddProductToCart } = useCartState()
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <>
      <NextSeo
        title={`Onepoint - product ${product?.title}`}
        description={`Descripción del producto ${product?.title}`}
      />
      <ContentLayout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image src={product.imageUrl} width={500} height={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" component="h1" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.secondary"
            >
              {`$${product.price}`}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.secondary"
              >
                Descripcion:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {`${product.description}`}
              </Typography>
            </Box>

            <Box
              sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}
            >
              <IconButton sx={{ p: 0, m: 0 }} onClick={decrementQuantity}>
                <RemoveCircleOutline fontSize="large" color="primary" />
              </IconButton>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
              >
                {quantity}
              </Typography>
              <IconButton sx={{ p: 0, m: 0 }} onClick={incrementQuantity}>
                <ControlPointOutlined fontSize="large" color="primary" />
              </IconButton>
            </Box>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
              textAlign="center"
              sx={{
                mt: 4
              }}
            >
              {` Total: $${quantity * product.price}`}
            </Typography>
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <Button
                size="large"
                sx={{
                  color: palette.primary[50],
                  width: '100%'
                }}
                onClick={() => handleAddProductToCart(product, quantity)}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Grid>
        </Grid>
      </ContentLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = ProductsTestData
  const products = data.map(product => ({ params: { slug: product.slug } }))
  return {
    paths: products,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params?.slug

  const product = ProductsTestData.find(product => product.slug === slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

export default ProductBySlugPage
