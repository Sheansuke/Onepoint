import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Cart from '@organism/Cart/index'
import { findUniqueDeliveryAddressByClerkId } from '@api/database/user'
import { IDeliveryAddressModel } from '@interfaces/models/IDeliveryAddressModel'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { ICartState } from '@redux/slices/cartSlice'

export interface ResumePageProps {
  deliveryAddress: IDeliveryAddressModel
}

const ResumePage: FC<ResumePageProps> = ({ deliveryAddress }) => {
  return (
    <Cart
      title="Resumen de la orden"
      canEdit={false}
      deliveryAddress={deliveryAddress}
    />
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req }) => {
    const { userId } = req?.auth
    const { cartState } = req?.cookies
    const cookieState = cartState ? JSON.parse(cartState) as ICartState : null

    if (!userId)
      return {
        redirect: {
          destination: '/user/address',
          permanent: false
        }
      }

    if (!cookieState?.deliveryDate && cookieState?.paymentType.id !== 2)
      return {
        redirect: {
          destination: '/cart',
          permanent: false
        }
      }

    try {
      const deliveryAddress = await findUniqueDeliveryAddressByClerkId(userId)

      if (!deliveryAddress) {
        return {
          redirect: {
            destination: '/user/address',
            permanent: false
          }
        }
      }

      return {
        props: {
          deliveryAddress
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: resume.tsx ~ line 51 ~ error', error)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
)

export default ResumePage
