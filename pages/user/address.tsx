import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createOrUpdateDeliveryAddressRequest } from '@api/axiosRequest/userRequest';
import { findUniqueDeliveryAddressByClerkId } from '@api/database/user';
import { Button } from '@atoms/Button';
import { Input } from '@atoms/Input';
import { useUser } from '@clerk/nextjs';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { IDeliveryAddressModel } from '@interfaces/models';
import { ContentLayout } from '@organism/layouts/ContentLayout';
import { showNotification } from '@utils/showNotification';

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

const Address2Page: FC<AdressPageProps> = ({ deliveryAddress }) => {
  const { user } = useUser()
  const router = useRouter()
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10 pt-10 place-items-center">
          <Input
            tailwindClass="w-full sm:max-w-xl"
            label="Nombre"
            hasError={errors.name?.message}
            rest={{
              ...register('name', {
                required: 'El nombre es requerido'
              })
            }}
          />

          <Input
            tailwindClass="w-full sm:max-w-xl"
            label="Apellido"
            hasError={errors.lastName?.message}
            rest={{
              ...register('lastName', {
                required: 'El apellido es requerido'
              })
            }}
          />

          <Input
            tailwindClass="w-full sm:max-w-xl"
            label="Sector"
            hasError={errors.sector?.message}
            rest={{
              ...register('sector', {
                required: 'El sector es requerido'
              })
            }}
          />

          <Input
            tailwindClass="w-full sm:max-w-xl"
            label="Calle"
            hasError={errors.street?.message}
            rest={{
              ...register('street', {
                required: 'La calle es requerida'
              })
            }}
          />

          <Input
            tailwindClass="w-full sm:max-w-xl"
            label="Lugar de referencia"
            hasError={errors.referencePlace?.message}
            rest={{
              ...register('referencePlace', {
                required: 'El lugar de referencia es requerido'
              })
            }}
          />

          <Input
            tailwindClass="w-full sm:max-w-xl"
            label="Telefono / Celular"
            hasError={errors.phone?.message}
            rest={{
              ...register('phone', {
                required: 'El numero es requerido'
              })
            }}
          />
        </div>
        <div className="text-center mt-10">
          <Button
            type="submit"
            arialLabel="guardar"
            text="Guardar"
            isLoading={isLoadingPost}
            tailwindClass="border-none w-56 bg-main-primary text-main-50  hover:bg-main-700"
          />
        </div>
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

export default Address2Page
