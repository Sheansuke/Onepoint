import { FC, useState } from 'react'
import { SelectDeliveryDate } from '@atoms/SelectDeliveryDate'
import { SelectPaymentType } from '@atoms/SelectPaymentType'
import { useCartState } from '@hooks/useCartState'
import { InfoOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  useTheme
} from '@mui/material'
import { showNotification } from '../../../utils/showNotification'
import { useRouter } from 'next/router'
import { AddressInfo } from '@molecules/AddressInfo'
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel'
import { dateTwoDaysValidation } from '../../../utils/dateTwoDaysValidation'
import {
  createOrderRequest,
  ICreateOrderRequest
} from '../../../api/axiosRequest/cartRequest'
import { OrderInfo } from '@molecules/OrderInfo/OrderInfo'
import { IOrderModel } from '@interfaces/models'

interface CartInfoProps {
  canEdit?: boolean
  deliveryAddress?: IDeliveryAddressModel
}

export const CartInfo: FC<CartInfoProps> = ({
  canEdit = true,
  deliveryAddress
}) => {
  const { palette } = useTheme()
  const router = useRouter()
  const { cartState, handleClearState } = useCartState()

  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false)
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false)

  const handleConfirm = () => {
    if (cartState.paymentType.id === 1) {
      if (cartState.deliveryDate) {
        const isValidDate = dateTwoDaysValidation(
          new Date(cartState.deliveryDate)
        )
        if (isValidDate) {
          setIsLoadingConfirm(true)
          return router.push('/cart/resume')
        } else {
          showNotification('El dia debe ser 2 dias apartir de hoy', 'warn')
        }
      } else {
        return showNotification('Debes seleccionar un dia de entrega!', 'warn')
      }
    } else {
      setIsLoadingConfirm(true)
      return router.push('/cart/resume')
    }
  }

  const handleEdit = () => {
    router.replace('/cart')
  }

  const handlePostOrder = () => {
    setIsLoadingPost(true)

    const newOrder: ICreateOrderRequest = {
      deliveryAddress: deliveryAddress,
      paymentType: cartState.paymentType,
      deliveryDate: cartState.deliveryDate,
      items: cartState.items
    }
    createOrderRequest(newOrder)
      .then(order => {
        router.replace(`/user/orders/${order?.id}`)
        handleClearState()
      })
      .catch(() => {
        showNotification(
          'La orden no pudo ser realizada, si el fallo continua comunicate con nosotros',
          'error'
        )
        setIsLoadingPost(false)
      })
  }

  return (
    <Card
      sx={{
        p: 2
      }}
    >
      {canEdit && (
        <Box mb={1}>
          <Typography variant="subtitle1" fontWeight={500}>
            Tipo de pago
          </Typography>
          <SelectPaymentType />

          {cartState.paymentType?.id === 1 && (
            <Box
              sx={{
                mt: 2,
                mb: 4
              }}
            >
              <SelectDeliveryDate tailwindClass="w-full" />
            </Box>
          )}
        </Box>
      )}

      {!canEdit && (
        <Box mb={4}>
          <AddressInfo deliveryAddress={deliveryAddress} />
        </Box>
      )}

      {/* order info */}
      <OrderInfo order={cartState as any as IOrderModel} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
          flexDirection: 'column'
        }}
      >
        {canEdit ? (
          <>
            {isLoadingConfirm ? (
              <CircularProgress />
            ) : (
              <Button
                aria-label="confirmar orden"
                size="large"
                onClick={handleConfirm}
                sx={{
                  color: palette.primary[50],
                  width: '90%'
                }}
              >
                Confirmar Orden
              </Button>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <InfoOutlined
                color="info"
                sx={{
                  fontSize: 20,
                  mr: 0.2
                }}
              />
              <small>
                Si no selecciona un metodo de pago por defecto sera:{' '}
                <strong>efectivo contra entrega</strong>
              </small>
            </Box>
          </>
        ) : (
          <>
            {isLoadingPost ? (
              <CircularProgress />
            ) : (
              <>
                <Button
                  aria-label="editar orden"
                  size="large"
                  variant="text"
                  onClick={handleEdit}
                  sx={{
                    color: '#0284C7',
                    width: '90%'
                  }}
                >
                  Editar la orden
                </Button>
                <Button
                  aria-label="confirmar orden"
                  size="large"
                  onClick={handlePostOrder}
                  sx={{
                    color: palette.primary[50],
                    width: '90%'
                  }}
                >
                  Realizar la orden
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Card>
  )
}
