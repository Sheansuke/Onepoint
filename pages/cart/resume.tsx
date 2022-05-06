import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Cart from '../../components/organism/Cart/index'
import { getDeliveryAddressByEmail } from '../../api/database/user';
import { IDeliveryAddressModel } from '../../interfaces/models/IDeliveryAddressModel';


export interface ResumePageProps {
  deliveryAddress: IDeliveryAddressModel
}

const ResumePage: FC<ResumePageProps> = ({deliveryAddress}) => {
  return <Cart title="Resumen de la orden" canEdit={false} deliveryAddress={deliveryAddress} />
}




export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const deliveryAddress = await getDeliveryAddressByEmail("")

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

export default ResumePage
