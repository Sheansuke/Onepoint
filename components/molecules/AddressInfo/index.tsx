import { NextMaterialLink } from '@atoms/NextMaterialLink'
import { Typography, Divider, Box } from '@mui/material'
import React, { FC } from 'react'
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel'

interface AddressInfoProps {
  deliveryAddress?: IDeliveryAddressModel
}

export const AddressInfo: FC<AddressInfoProps> = ({deliveryAddress}) => {
  return (
    <>
      <Typography variant="h1" fontWeight={500}>
        Direccion
      </Typography>

      <Divider
        sx={{
          mb: 2
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <NextMaterialLink underline href='/user/address'>
        <Typography variant="subtitle1" color="#0284C7">Editar direccion</Typography>
        </NextMaterialLink>

      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Nombre</Typography>
        <Typography variant="subtitle1">{deliveryAddress?.name} {deliveryAddress?.lastName}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Sector</Typography>
        <Typography variant="subtitle1">{deliveryAddress?.sector}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Calle</Typography>
        <Typography variant="subtitle1">{deliveryAddress?.street}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Lugar de referencia</Typography>
        <Typography variant="subtitle1">{deliveryAddress?.referencePlace}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Celular / Telefono</Typography>
        <Typography variant="subtitle1">{deliveryAddress?.phone}</Typography>
      </Box>
    </>
  )
}
