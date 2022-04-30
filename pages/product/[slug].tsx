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
import React, { FC } from 'react'
import { IProductModel } from '../../interfaces/models/IProductModel'

interface ProductBySlugPageProps {
  product: IProductModel
}

const ProductBySlugPage: FC<ProductBySlugPageProps> = ({ product }) => {
  const { palette } = useTheme()
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
              <IconButton sx={{ p: 0, m: 0 }}>
                <RemoveCircleOutline fontSize="large" color="primary" />
              </IconButton>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
              >
                1
              </Typography>
              <IconButton sx={{ p: 0, m: 0 }}>
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
              Total: 500
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

export const getStaticPaths: GetStaticPaths = async ctx => {
  const data = ProductsTestData 
  const products = data.map(product => ({ params: { slug: product.slug } }))
  return {
    paths: products,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params?.slug

  // TODO: get products by slug
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
