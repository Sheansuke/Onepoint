import { findOrderById } from '@api/database/order'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { useCartState } from '@hooks/useCartState'
import { IOrderModel } from '@interfaces/models'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { showNotification } from '@utils/showNotification'
import { updateOrderRequest } from '../../../../api/axiosRequest/orderRequest'
import { useRouter } from 'next/router'
import { WarningIcon } from '@icons/WarningIcon'
import { Button } from '@atoms/Button'
import dynamic from 'next/dynamic'

const SelectDeliveryDate = dynamic(() =>
  import('@atoms/SelectDeliveryDate').then(module => module.SelectDeliveryDate)
)


interface TransactionPageProps {
  order: IOrderModel
}

interface FormData {
  code: string
}

const TransactionPage: FC<TransactionPageProps> = ({ order }) => {
  const router = useRouter()
  const { cartState } = useCartState()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSendTransfer = async (data: FormData) => {
    if (!cartState?.deliveryDate) {
      return showNotification('No ha seleccionado un dia de entrega', 'error')
    }

    const updateOrder: IOrderModel = {
      ...order,
      deliveryDate: new Date(cartState.deliveryDate),
      transactionId: data.code
    }

    await updateOrderRequest(updateOrder)
      .then(() => {
        showNotification(
          'Tu orden estara en revision cuando sea revisada te avisaremos!',
          'success'
        )
        return router.replace(`/user/orders/${order.id}`)
      })
      .catch(() => {
        return showNotification('Algo fallo al actualizar la orden', 'error')
      })
  }
  return (
    <ContentLayout title={`orden: ${order.id.slice(0, 8)}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <>
          <div className="card shadow-lg p-8">
            <p className="text-xl font-bold">Tenga encuenta que:</p>

            <div className="mt-2 flex items-center">
              <WarningIcon tailwindClass="text-mainWarning-primary  mr-1" />
              <small className="text-md font-bold">
                Entre la transferencia y la comprobacion de esta puede tomar un
                tiempo de 24hrs
              </small>
            </div>

            <div className="mt-2">
              <li className="text-lg  mt-4">
                Realice la transferencia a la cuenta correspondiente.
              </li>

              <li className="text-lg mt-4">
                Una vez realizada la transferencia tome el codigo de referencia
                o numero de dicha transferencia.
              </li>

              <li className="text-lg mt-4">
                Coloquelo en el cuadro de texto a continuacion y presione en
                enviar.
              </li>

              <li className="text-lg mt-4">
                Se le enviara un correo notificando que el envio fue exitoso y
                se le notificara nuevamente cuando se realice la confirmacion y
                la orden se registre como pagada.
              </li>
            </div>
          </div>
        </>

        <>
          <div className="card shadow-lg p-4 h-full flex clex-col justify-center gap-6">
            <SelectDeliveryDate tailwindClass="w-full" />

            <form onSubmit={handleSubmit(onSendTransfer)}>
              <div className="mt-6">
                <input
                  className="input input-bordered w-full text-center"
                  {...register('code', {
                    required: 'El codigo es requerido'
                  })}
                  placeholder="Ingrese el Codigo de la transferencia"
                />
              </div>

              <div className="mt-4">
                <Button
                  type="submit"
                  arialLabel="Enviar codigo de transferencia"
                  tailwindClass="border-none w-full bg-main-primary text-main-50  hover:bg-main-700"
                >
                  Enviar codigo de transferencia
                </Button>
              </div>
            </form>
          </div>
        </>
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

      // si la orden ya esta paga o no es del tipo transferencia no se puede acceder a esta pagina
      if (order.isPaid || order.paymentType.id !== 2 || order.transactionId) {
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

export default TransactionPage
