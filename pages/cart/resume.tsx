import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Cart from '../../components/organism/Cart/index'
import { findUniqueDeliveryAddressByClerkId } from '../../api/database/user'
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel'
import { withServerSideAuth } from '@clerk/nextjs/ssr'

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
    if (!userId)
      return {
        redirect: {
          destination: '/user/address',
          permanent: false
        }
 }

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
  }
)

export default ResumePage