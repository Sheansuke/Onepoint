import {
    Grid,
    Box,
    Typography,
    Button,
    useTheme,
    CircularProgress
  } from '@mui/material'
  import { FC } from 'react';
  import { ContentLayout } from '@organism/layouts/ContentLayout'
  import { CartProductCard } from '@molecules/CartProductCard/index'
  import { useRouter } from 'next/router'
  import { useCartState } from '@hooks/useCartState'
  import { CartInfo } from '@molecules/CartInfo/Index'
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel';
  
  
  interface ICart {
      canEdit?: boolean
      title: string
      deliveryAddress?: IDeliveryAddressModel
  }
  
  const Cart: FC<ICart> = ({title,canEdit = true, deliveryAddress}) => {
    const router = useRouter()
    const { palette } = useTheme()
    const { cartState } = useCartState()
  
    const navigateTo = (path: string) => {
      router.replace(path)
    }

    if (cartState.isLoading)
      return (
        <ContentLayout title="Loading...">
          <CircularProgress />
        </ContentLayout>
      )
  
    return (
      <ContentLayout title={title}>
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
                  <CartProductCard key={index} product={product} canEdit={canEdit} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} md={6} mt={2}>
              <CartInfo canEdit={canEdit} deliveryAddress={deliveryAddress}/>
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
            aria-label='ir a la pagina de inicio'
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
  
  export default Cart
  