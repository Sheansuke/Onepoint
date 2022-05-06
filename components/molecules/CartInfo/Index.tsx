import React, { FC } from 'react'
import { SelectDeliveryDate } from '@atoms/SelectDeliveryDate'
import { SelectPaymentType } from '@atoms/SelectPaymentType'
import { useCartState } from '@hooks/useCartState'
import { InfoOutlined } from '@mui/icons-material'
import { Box, Button, Card, Divider, Typography, useTheme } from '@mui/material'
import { showNotification } from '../../../utils/showNotification'
import { useRouter } from 'next/router'
import { NextMaterialLink } from '../../atoms/NextMaterialLink'
import { AddressInfo } from '@molecules/AddressInfo'
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel';

interface CartInfoProps {
  canEdit?: boolean
  deliveryAddress?: IDeliveryAddressModel
}

export const CartInfo: FC<CartInfoProps> = ({ canEdit = true,deliveryAddress }) => {
  const { palette } = useTheme()
  const router = useRouter()
  const { cartState } = useCartState()

  const handleConfirm = () => {
    if (
      !cartState.deliveryDate &&
      cartState.paymentType === 'efectivo contra entrega'
    ) {
      return showNotification('Debes seleccionar un dia de entrega!', 'warn')
    }
    router.replace('/cart/resume')
  }

  const handleEdit = () => {
    router.replace('/cart')
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

          {cartState.paymentType === 'efectivo contra entrega' && (
            <Box
              sx={{
                mt: 2,
                mb: 4
              }}
            >
              <SelectDeliveryDate />
            </Box>
          )}
        </Box>
      )}

      {!canEdit && (
        <Box mb={4}>
          <AddressInfo deliveryAddress={deliveryAddress} />
        </Box>
      )}

      <Typography variant="h1" fontWeight={500}>
        Orden
      </Typography>

      <Divider
        sx={{
          mb: 2
        }}
      />

      {cartState.paymentType && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Tipo de pago</Typography>
          <Typography variant="subtitle1">{cartState.paymentType}</Typography>
        </Box>
      )}

      {cartState.deliveryDate && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Fecha de entrega</Typography>
          <Typography variant="subtitle1">{cartState.deliveryDate}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">No. Productos</Typography>
        <Typography variant="subtitle1">{`${cartState.numberOfItems}`}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Sub Total</Typography>
        <Typography variant="subtitle1">{`$${cartState.subTotal}`}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">{`Impuestos (${process.env.NEXT_PUBLIC_TAX_RATE}%)`}</Typography>
        <Typography variant="subtitle1">{`$${
          cartState.subTotal * cartState.tax
        }`}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h2" mr={10} fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="h2" ml={10} fontWeight="bold">
          {`$${cartState.total}`}
        </Typography>
      </Box>

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
              sx={{
                color: palette.primary[50],
                width: '90%'
              }}
            >
              Realizar la orden
            </Button>
          </>
        )}
      </Box>
    </Card>
  )
}
