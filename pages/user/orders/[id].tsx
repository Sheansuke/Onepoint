import { findOrderById } from '@api/database/order'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { IOrderModel } from '@interfaces/models'
import { AddressInfo } from '@molecules/AddressInfo'
import { OrderInfo } from '@molecules/OrderInfo/OrderInfo'
import { InfoOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  useTheme
} from '@mui/material'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react';
import { CartProductCard } from '../../../components/molecules/CartProductCard/index'

interface OrderPageProps {
  order: IOrderModel
}

const OrderPage: FC<OrderPageProps> = ({ order }) => {
  const [loadingTransferPage, setLoadingTransferPage] = useState(false)
  const router = useRouter()
  const { palette } = useTheme()

  const handleTransfer = () => {
    setLoadingTransferPage(true)
    router.push(`/user/orders/transaction/${order.id}`)
  }
  return (
    <ContentLayout title={`orden: ${order.id.slice(0, 8)}`}>
      <Typography
        variant="subtitle1"
        fontWeight={500}
        sx={{
          color: palette.info.main
        }}
      >
        Estado: {order.status.name}
      </Typography>
      <Box mt={1}>
        {order.isPaid ? (
          <Chip label="Pagada" variant="outlined" color="primary" />
        ) : (
          <Chip label="No pagada" variant="outlined" color="error" />
        )}
      </Box>

      <Grid container spacing={8}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: 400,
            overFlowY: 'scroll'
          }}
        >
          {order?.items.map((product, index) => (
            <Grid item key={product.id}>
              <CartProductCard key={index} product={product} canEdit={false} />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2
            }}
          >
            <Box mb={4}>
              <AddressInfo
                isOrderPage
                deliveryAddress={order.user.deliveryAddress}
              />
            </Box>

            <OrderInfo order={order} />

            {order.isPaid && (
              <Chip
                label="Pagada"
                variant="outlined"
                color="primary"
                sx={{
                  display: 'flex',
                  mt: 2
                }}
              />
            )}

            {order.paymentType.id !== 1 &&
              !order.isPaid && order.status.id !== 3 && !order.transactionId &&(
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    flexDirection: 'column'
                  }}
                >
                  {loadingTransferPage ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      aria-label="confirmar orden"
                      size="large"
                      onClick={handleTransfer}
                      sx={{
                        color: palette.primary[50],
                        width: '90%'
                      }}
                    >
                      Hacer transferencia
                    </Button>
                  )}

                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
                  >
                    <InfoOutlined
                      color="info"
                      sx={{
                        fontSize: 20,
                        mr: 0.2
                      }}
                    />
                    <small
                      style={{
                        fontSize: 15
                      }}
                    >
                      Si ya ha realizado o planea realizar la transferencia haga
                      click en el boton e introduzca el numero de la
                      transferencia para que podamos validarla
                    </small>
                  </Box>
                </Box>
              )}
          </Card>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req, query }) => {
    const { userId } = req.auth

    try {
      const data = await findOrderById(query.id as string)
      const order = data as any as IOrderModel

      if (userId !== order.user.clerkId) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

      return {
        props: {
          order: JSON.parse(JSON.stringify(order))
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: [id].tsx ~ line 164 ~ error', error)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
)

export default OrderPage
