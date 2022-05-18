import { createOrUpdateDeliveryAddressRequest } from '@api/axiosRequest/userRequest'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { useUser } from '@clerk/nextjs'
import { IDeliveryAddressModel } from '@interfaces/models'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
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

const Address2Page: FC<AdressPageProps> = ({ deliveryAddress }) => {
  const { user } = useUser()
  const router = useRouter()
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const {
    handleSubmit,
    register  } = useForm<FormData>({
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
    <div>
      <form onSubmit={handleSubmit(onSaved)}>
        <div className="grid grid-cols-2 gap-14">
          <div>
            <label>Telefono / Celular</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register('lastName', {
                required: 'El apellido es requerido'
              })}
            />
          </div>

          <div>
            <label>Telefono / Celular</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register('lastName', {
                required: 'El apellido es requerido'
              })}
            />
          </div>

          <div>
            <label>Telefono / Celular</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register('sector', {
                required: 'El sector es requerido'
              })}
            />
          </div>

          <div>
            <label>Telefono / Celular</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register('street', {
                required: 'La calle es requerida'
              })}
            />
          </div>

          <div>
            <label>Telefono / Celular</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register('referencePlace', {
                required: 'El lugar de referencia es requerido'
              })}
            />
          </div>

          <div>
            <label>Telefono / Celular</label>
            <input
              className="input input-bordered w-full max-w-xs"
              {...register('phone', {
                required: 'El numero es requerido'
              })}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn">
            Guardar
          </button>
        </div>
      </form>
    </div>
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
