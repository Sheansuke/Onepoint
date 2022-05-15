import { createOrUpdateDeliveryAddressRequest } from '@api/axiosRequest/userRequest'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { useUser } from '@clerk/nextjs'
import { IDeliveryAddressModel } from '@interfaces/models'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
  useTheme
} from '@mui/material'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form'
import { findUniqueDeliveryAddressByClerkId } from '../../api/database/user'
import { showNotification } from '../../utils/showNotification'

interface AdressPageProps {
  deliveryAddress: IDeliveryAddressModel
}

interface FormData {
  name: string
  lastName: string
  sector: string
  street: string
  referencePlace: string
  phone: string
}

const AddressPage: FC<AdressPageProps> = ({ deliveryAddress }) => {
  const { user } = useUser()
  const { palette } = useTheme()
  const router = useRouter()
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: deliveryAddress
  })

  const onSaved = (data: FormData) => {
    setIsLoadingPost(true)
    const sessionUserEmail = user.emailAddresses[0].emailAddress
    createOrUpdateDeliveryAddressRequest(sessionUserEmail, data)
      .then(() => {
        showNotification('Dirección guardada!', 'success')
        router.back()
      })
      .catch(() => {
        showNotification('Ocurrio un error al guardar la dirección', 'error')
        setIsLoadingPost(false)
      })
  }

  return (
    <ContentLayout title="Direccion de entrega">
      <form onSubmit={handleSubmit(onSaved)}>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={6}>
            <InputLabel>Nombre</InputLabel>
            <TextField
              fullWidth
              {...register('name', {
                required: 'El nombre es requerido'
              })}
              error={!!errors.name}
              helperText={errors.name && errors.name.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel>Apellido</InputLabel>
            <TextField
              fullWidth
              {...register('lastName', {
                required: 'El apellido es requerido'
              })}
              error={!!errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel>Sector</InputLabel>
            <TextField
              fullWidth
              {...register('sector', {
                required: 'El sector es requerido'
              })}
              error={!!errors.sector}
              helperText={errors.sector && errors.sector.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel>Calle</InputLabel>
            <TextField
              fullWidth
              {...register('street', {
                required: 'La calle es requerida'
              })}
              error={!!errors.street}
              helperText={errors.street && errors.street.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel>Lugar de referencia</InputLabel>
            <TextField
              fullWidth
              {...register('referencePlace', {
                required: 'El lugar de referencia es requerido'
              })}
              error={!!errors.referencePlace}
              helperText={
                errors.referencePlace && errors.referencePlace.message
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel>Telefono / Celular</InputLabel>
            <TextField
              fullWidth
              {...register('phone', {
                required: 'El numero es requerido'
              })}
              error={!!errors.phone}
              helperText={errors.phone && errors.phone.message}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {isLoadingPost ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              size="large"
              sx={{
                color: palette.primary[50]
              }}
            >
              Guardar
            </Button>
          )}
        </Box>
      </form>
    </ContentLayout>
  )
}


export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req }) => {
    const { userId } = req.auth
    try {
      const deliveryAddress = await findUniqueDeliveryAddressByClerkId(userId)
      return {
        props: {
          deliveryAddress
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: address.tsx ~ line 178 ~ error', error)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
)

export default AddressPage
