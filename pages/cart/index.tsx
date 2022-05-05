import {
  Grid,
  Box,
  Typography,
  Button,
  useTheme,
  CircularProgress
} from '@mui/material'
import React, { FC } from 'react'
import { ContentLayout } from '../../components/organism/layouts/ContentLayout'
import { CartProductCard } from '../../components/molecules/CartProductCard/index'
import { useRouter } from 'next/router'
import { useCartState } from '@hooks/useCartState'
import { CartInfo } from '@molecules/CartInfo/Index'



const CartPage: FC = () => {
  const router = useRouter()
  const { palette } = useTheme()
  const { cartState } = useCartState()

  const navigateTo = (path: string) => {
    router.replace(path)
  }
  // cartState.isLoading
  if (cartState.isLoading)
    return (
      <ContentLayout title="Loading...">
        <CircularProgress />
      </ContentLayout>
    )

  return (
    <ContentLayout title="Carrito">
      {cartState?.items.length > 0 ? (
        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              mt: 2,
              height: 400,
              overFlowY: 'scroll'
            }}
          >
            {cartState?.items.map((product, index) => (
              <Grid item key={product.id}>
                <CartProductCard key={index} product={product} canEdit />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} md={6} mt={2}>
            <CartInfo />
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Typography mt={5}>No tienes ningun producto aun!</Typography>

          <Button
            size="large"
            onClick={() => navigateTo('/')}
            sx={{
              color: palette.primary[50]
            }}
          >
            Ir a la tienda
          </Button>
        </Box>
      )}
    </ContentLayout>
  )
}

export default CartPage
