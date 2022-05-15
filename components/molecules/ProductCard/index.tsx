import { NextMaterialLink } from '@atoms/NextMaterialLink'
import { AddShoppingCartOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Chip,
  Typography,
  useTheme
} from '@mui/material'
import { useCartState } from '@hooks/useCartState'
import Image from 'next/image'
import { FC } from 'react';
import { IProductModel } from '../../../interfaces/models/IProductModel'

interface ProductCardProps {
  product: IProductModel
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { palette } = useTheme()
  const { handleAddProductToCart } = useCartState()

  const handleProductToCard = (product: IProductModel, quantity: number) => {
    handleAddProductToCart(product, quantity)
  }

  return (
    <Card
      sx={{
        p: 2,
        position: 'relative'
      }}
    >
      {product.inStock > 0 ? (
        <Chip label="Disponible" color="primary" variant="outlined" />
      ) : (
        <Chip label="Agotado" color="secondary" variant="outlined" />
      )}

      <NextMaterialLink href={`/product/${product.slug}`} prefetch={false}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={product.imageUrl}
            width={410}
            height={410}
            alt={product.title}
          />
        </Box>
      </NextMaterialLink>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mt: 4,
          height: 100
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

        <Box sx={{ alignSelf: 'flex-end' }}>
          <Button
            aria-label="Agregar al carrito"
            onClick={() => handleProductToCard(product, 1)}
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
  )
}
