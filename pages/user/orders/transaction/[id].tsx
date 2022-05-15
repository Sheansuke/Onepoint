import { findOrderById } from '@api/database/order'
import { SelectDeliveryDate } from '@atoms/SelectDeliveryDate'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { useCartState } from '@hooks/useCartState'
import { IOrderModel } from '@interfaces/models'
import { InfoOutlined, Router } from '@mui/icons-material'
import {
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  useTheme
} from '@mui/material'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { dateTwoDaysValidation } from '@utils/dateTwoDaysValidation'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { showNotification } from '@utils/showNotification'
import { updateOrderRequest } from '../../../../api/axiosRequest/orderRequest'
import { useRouter } from 'next/router'

interface TransactionPageProps {
  order: IOrderModel
}

interface FormData {
  code: string
}

// TODO: improve design

const TransactionPage: FC<TransactionPageProps> = ({ order }) => {
  const router = useRouter()
  const { palette } = useTheme()
  const { cartState } = useCartState()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSendTransfer = async (data: FormData) => {
    if (!cartState?.deliveryDate) {
      return showNotification('No ha seleccionado un dia de entrega', 'error')
    }

    const updateOrder: IOrderModel = {
      ...order,
      deliveryDate: new Date(cartState.deliveryDate),
      transactionId: data.code
    }

    await updateOrderRequest(updateOrder)
      .then(() => {
        showNotification('Tu orden estara en revision cuando sea revisada te avisaremos!', 'success')
        return router.replace(`/user/orders/${order.id}`)
      })
      .catch(() => {
        return showNotification('Algo fallo al actualizar la orden', 'error')
      })
  }
  return (
    <ContentLayout title={`orden: ${order.id.slice(0,8)}`}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2
            }}
          >
            <Typography variant="h2" fontWeight="bold" mt={2}>
              Tenga encuenta que:
            </Typography>

            <Box display="flex" alignItems="center" mt={4}>
              <InfoOutlined
                color="info"
                sx={{
                  fontSize: 20,
                  mr: 0.2
                }}
              />
              <small
                style={{
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                Entre la transferencia y la comprobacion de esta puede tomar un
                tiempo de 24hrs
              </small>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle1" mt={2} maxWidth={600}>
                <li>Realice la transferencia a la cuenta correspondiente.</li>
              </Typography>
              <Typography variant="subtitle1" mt={2} maxWidth={600}>
                <li>
                  Una vez realizada la transferencia tome el codigo de
                  referencia o numero de dicha transferencia.
                </li>
              </Typography>
              <Typography variant="subtitle1" mt={2} maxWidth={600}>
                <li>
                  Coloquelo en el cuadro de texto a continuacion y presione en
                  enviar.
                </li>
              </Typography>
              <Typography variant="subtitle1" mt={2} maxWidth={600}>
                <li>
                  Se le enviara un correo notificando que el envio fue exitoso y
                  se le notificara nuevamente cuando se realice la confirmacion
                  y la orden se registre como pagada.
                </li>
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2
            }}
          >
            <SelectDeliveryDate />

            <form onSubmit={handleSubmit(onSendTransfer)}>
              <Box mt={4}>
                <TextField
                  fullWidth
                  label="Ingrese el codigo de la transferencia"
                  {...register('code', {
                    required: 'El codigo es requerido'
                  })}
                  error={!!errors.code}
                  helperText={errors.code && errors.code.message}
                />
              </Box>

              <Box mt={2}>
                <Button
                  fullWidth
                  type="submit"
                  size="large"
                  sx={{
                    color: palette.primary[50]
                  }}
                >
                  Enviar codigo de transferencia
                </Button>
              </Box>
            </form>
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

      // si la orden ya esta paga o no es del tipo transferencia no se puede acceder a esta pagina
      if (order.isPaid || order.paymentType.id !== 2 || order.transactionId) {
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

export default TransactionPage
