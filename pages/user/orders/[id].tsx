import { findOrderById } from '@api/database/order'
import { Button } from '@atoms/Button'
import { CircularProgress } from '@atoms/CircularProgress'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { WarningIcon } from '@icons/WarningIcon'
import { IOrderModel } from '@interfaces/models'
import { AddressInfo } from '@molecules/AddressInfo'
import { OrderInfo } from '@molecules/OrderInfo/OrderInfo'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { CartProductCard } from '../../../components/molecules/CartProductCard/index'

interface OrderPageProps {
  order: IOrderModel
}

const OrderPage: FC<OrderPageProps> = ({ order }) => {
  const [loadingTransferPage, setLoadingTransferPage] = useState(false)
  const router = useRouter()

  const handleTransfer = () => {
    setLoadingTransferPage(true)
    router.push(`/user/orders/transaction/${order.id}`)
  }
  return (
    <ContentLayout title={`orden: ${order.id.slice(0, 8)}`}>
      <p className="text-lg text-mainWarning-primary">
        Estado: {order.status.name}
      </p>
      <div className="mt-2">
        {order.isPaid ? (
          <div className="badge badge-outline badge-primary text-lg p-3">
            Pagada
          </div>
        ) : (
          <div className="badge badge-outline badge-error text-lg p-3 ">
            No pagada
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="max-h-96  overflow-y-auto p-2">
          {order?.items.map((product, index) => (
            <CartProductCard key={index} product={product} canEdit={false} />
          ))}
        </div>

        <div>
          <div className="card shadow-lg p-4">
            <div className="mb-8">
              <AddressInfo
                isOrderPage
                deliveryAddress={order.user.deliveryAddress}
              />
            </div>

            <OrderInfo order={order} />

            {order.isPaid && (
              <div className="badge badge-outline badge-primary text-lg p-4 mt-2 w-full">
                Pagada
              </div>
            )}

            {order.paymentType.id !== 1 &&
              !order.isPaid &&
              order.status.id !== 3 &&
              !order.transactionId && (
                <div className="flex flex-col items-center justify-center mt-4">
                  {loadingTransferPage ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="button"
                      arialLabel="hacer transferencia"
                      onClick={handleTransfer}
                      tailwindClass="border-none w-full bg-main-primary text-main-50  hover:bg-main-700"
                    >
                      Hacer transferencia
                    </Button>
                  )}

                  <div className="flex justify-center mt-2">
                    <WarningIcon tailwindClass="text-mainWarning-primary w-8 h-8 mr-1" />
                    <small>
                      Si ya ha realizado o planea realizar la transferencia haga
                      click en el boton e introduzca el numero de la
                      transferencia para que podamos validarla
                    </small>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req, query }) => {
    const { userId } = req.auth

    try {
      const data = await findOrderById(query.id as string)
      const order = data as any as IOrderModel

      if (userId !== order.user.clerkId) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

      return {
        props: {
          order: JSON.parse(JSON.stringify(order))
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: [id].tsx ~ line 164 ~ error', error)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
)

export default OrderPage
