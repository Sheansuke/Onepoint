import { NextMaterialLink } from '@atoms/NextMaterialLink'
import { useCartState } from '@hooks/useCartState'
import {
  RemoveCircleOutline,
  ControlPointOutlined,
  DeleteOutline
} from '@mui/icons-material'
import { Box, Button, Card, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { ICartProduct } from '../../../interfaces/frontend/ICartProduct'

interface CartProductCardProps {
  product: ICartProduct
  canEdit: boolean
}

export const CartProductCard: FC<CartProductCardProps> = ({
  product,
  canEdit = false
}) => {
  const { handleRemoveProductFromCart, handleSetProductQuantity } =
    useCartState()

  return (
    <Card
      sx={{
        display: 'flex',
        p: 2,
        mt: 2
      }}
    >
      <Box>
        <NextMaterialLink href={`/product/${product.slug}`} prefetch={false}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Image
              src={product.imageUrl}
              width={100}
              height={100}
              alt={product.title}
            />
          </Box>
        </NextMaterialLink>
      </Box>

      <Box
        sx={{
          ml: 2,
          width: '100%'
        }}
      >
        {/* TEXT */}
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

        {/* INCREMENT DECREMENT ICONS */}
        {canEdit && (
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            <IconButton
              aria-label="disminuir cantidad"
              sx={{ p: 0, m: 0 }}
              onClick={() =>
                handleSetProductQuantity({
                  ...product,
                  quantity: -1
                })
              }
            >
              <RemoveCircleOutline fontSize="large" color="primary" />
            </IconButton>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
            >
              {product.quantity}
            </Typography>
            <IconButton
              aria-label="aumentar cantidad"
              sx={{ p: 0, m: 0 }}
              onClick={() =>
                handleSetProductQuantity({
                  ...product,
                  quantity: 1
                })
              }
            >
              <ControlPointOutlined fontSize="large" color="primary" />
            </IconButton>
          </Box>
        )}

        {/* REMOVE ICON */}
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          {canEdit ? (
            <Button
              aria-label="eliminar producto"
              color="error"
              onClick={() => handleRemoveProductFromCart(product)}
            >
              <DeleteOutline
                sx={{
                  mr: 0.2,
                  fontSize: 20
                }}
              />{' '}
              Eliminar
            </Button>
          ) : (
            <Typography>Cantidad: {product.quantity}</Typography>
          )}
        </Box>
      </Box>
    </Card>
  )
}
