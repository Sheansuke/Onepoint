import { IOrderModel } from '@interfaces/models'
import { Typography, Divider, Box } from '@mui/material'
import { FC } from 'react';
import { format } from 'date-fns';

export interface OrderInfoProps {
  order: IOrderModel
}

export const OrderInfo: FC<OrderInfoProps> = ({order}) => {
  return (
    <>
      <Typography variant="h1" fontWeight={500}>
        Orden
      </Typography>

      <Divider
        sx={{
          mb: 2
        }}
      />

      {order?.paymentType && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Tipo de pago</Typography>
          <Typography variant="subtitle1">{order.paymentType?.name}</Typography>
        </Box>
      )}

      {order?.deliveryDate && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Fecha de entrega</Typography>
          <Typography variant="subtitle1">{format(new Date(order.deliveryDate),"dd-MM-yyyy")}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">No. Productos</Typography>
        <Typography variant="subtitle1">{`${order.numberOfItems}`}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Sub Total</Typography>
        <Typography variant="subtitle1">{`$${order.subTotal}`}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">{`Impuestos (${process.env.NEXT_PUBLIC_TAX_RATE}%)`}</Typography>
        <Typography variant="subtitle1">{`$${
          order.subTotal * order.tax
        }`}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h2" mr={10} fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="h2" ml={10} fontWeight="bold">
          {`$${order.total}`}
        </Typography>
      </Box>
    </>
  )
}
