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
import { tw } from '@utils/tailwindClass'

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
  const { handleSubmit, register } = useForm<FormData>({
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 place-items-center">
          <div className=" w-full sm:max-w-lg">
            <label className="label">
              <span className="text-main2-400">Nombre</span>
            </label>
            <input
              className="input input-bordered w-full"
              {...register('lastName', {
                required: 'El apellido es requerido'
              })}
            />
          </div>

          <div className="w-full sm:max-w-lg">
            <label className="label">
              <span className="text-main2-400">Nombre</span>
            </label>
            <input
              className="input input-bordered w-full"
              {...register('lastName', {
                required: 'El apellido es requerido'
              })}
            />
          </div>

          <div className="w-full sm:max-w-lg">
            <label className="label">
              <span className="text-main2-400">Nombre</span>
            </label>
            <input
              className="input input-bordered w-full "
              {...register('sector', {
                required: 'El sector es requerido'
              })}
            />
          </div>

          <div className="w-full sm:max-w-lg">
            <label className="label">
              <span className="text-main2-400">Nombre</span>
            </label>
            <input
              className="input input-bordered w-full "
              {...register('street', {
                required: 'La calle es requerida'
              })}
            />
          </div>

          <div className="w-full sm:max-w-lg">
            <label className="label">
              <span className="text-main2-400">Nombre</span>
            </label>
            <input
              className="input input-bordered w-full "
              {...register('referencePlace', {
                required: 'El lugar de referencia es requerido'
              })}
            />
          </div>

          <div className="w-full sm:max-w-lg">
            <label className="label">
              <span className="text-main2-400">Nombre</span>
            </label>
            <input
              className="input input-bordered w-full "
              {...register('phone', {
                required: 'El numero es requerido'
              })}
            />
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            className={tw(
              'btn bg-main-primary text-main-50 border-none',
              'w-56',
              isLoadingPost && 'loading'
            )}
            disabled={isLoadingPost}
          >
            Guardar
          </button>
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
