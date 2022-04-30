import { NextMaterialLink } from '@atoms/NextMaterialLink'
import {
  AddShoppingCartOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Typography,
  useTheme
} from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { IProductModel } from '../../../interfaces/models/IProductModel'

interface ProductCardProps {
  product: IProductModel
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { palette } = useTheme()
  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          p: 2
        }}
      >
        <NextMaterialLink href={`/product/${product.slug}`} prefetch={false}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* <CardMedia
              component="img"
              className="fadeIn"
              image={product.imageUrl}
              alt={product.title}
              sx={{ width: 205 }}
            /> */}

            <Image src={product.imageUrl} width={205} height={205}/>
          </Box>
        </NextMaterialLink>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            mt: 4
          }}
        >
          <Box>
            <Typography variant="h2" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: 'text.secondary'
              }}
            >
              {`$${product.price}`}
            </Typography>
          </Box>

          <Box>
            <Button
              sx={{
                width: 60,
                height: 60,
                borderRadius: '100%'
              }}
            >
              <AddShoppingCartOutlined
                sx={{
                  fontSize: 34,
                  color: palette.primary[50]
                }}
              />
            </Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}
