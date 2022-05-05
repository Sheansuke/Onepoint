import React, { FC } from 'react'
import { SelectDeliveryDate } from '@atoms/SelectDeliveryDate'
import { SelectPaymentType } from '@atoms/SelectPaymentType'
import { useCartState } from '@hooks/useCartState'
import { InfoOutlined } from '@mui/icons-material'
import { Box, Button, Card, Divider, Typography, useTheme } from '@mui/material'
import { format } from 'date-fns'
import {toast} from "react-toastify"

interface CartInfoProps {
  // name?: string;
}



// TODO: no ejecutar la validacion de fecha si el metodo de pago es transferencia
// TODO: cuando el usuario eliga transferencia borrar la fecha
export const CartInfo: FC<CartInfoProps> = () => {
  const { palette } = useTheme()
  const { cartState } = useCartState()


  const handleConfirm = () => {
    if (!cartState.deliveryDate && cartState.paymentType === "contra entrega") {
      toast.warn('Debes seleccionar un dia de entrega!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  return (
    <Card
      sx={{
        p: 2
      }}
    >
      <Box mb={1}>
      <Typography variant="subtitle1" fontWeight={500}>
        Tipo de pago
      </Typography>
        <SelectPaymentType />

        {cartState.paymentType === 'contra entrega' && (
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} onClick={handleConfirm}>
        <Button
          size="large"
          sx={{
            color: palette.primary[50],
            width: '90%'
          }}
        >
          Confirmar Orden
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <InfoOutlined
          color="info"
          sx={{
            fontSize: 20,
            mr: 0.2
          }}
        />
        <small>
          Si no selecciona un metodo de pago por defecto sera: <strong>contra entrega</strong>
        </small>
      </Box>
    </Card>
  )
}
