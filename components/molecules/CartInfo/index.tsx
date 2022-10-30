import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Button } from '@atoms/Button';
import { CircularProgress } from '@atoms/CircularProgress';
import { SelectDeliveryDate } from '@atoms/SelectDeliveryDate';
import { SelectPaymentType } from '@atoms/SelectPaymentType';
import { useCartState } from '@hooks/useCartState';
import { IOrderModel } from '@interfaces/models';
import { AddressInfo } from '@molecules/AddressInfo';
import { OrderInfo } from '@molecules/OrderInfo/OrderInfo';

import { createOrderRequest, ICreateOrderRequest } from '../../../api/axiosRequest/cartRequest';
import { createEmailRequest } from '../../../api/axiosRequest/emailRequest';
import { IDeliveryAddressModel } from '../../../interfaces/models/IDeliveryAddressModel';
import { dateTwoDaysValidation } from '../../../utils/dateTwoDaysValidation';
import { showNotification } from '../../../utils/showNotification';
import { WarningIcon } from '../../icons/WarningIcon';

interface CartInfoProps {
  canEdit?: boolean
  deliveryAddress?: IDeliveryAddressModel
}

export const CartInfo: FC<CartInfoProps> = ({
  canEdit = true,
  deliveryAddress
}) => {
  const router = useRouter()
  const { cartState, handleClearState } = useCartState()

  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false)
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false)

  const handleConfirm = () => {
    // check if deliveryDate exist and the date is valid
    if (cartState.paymentType.id === 1) {
      if (cartState.deliveryDate) {
        const isValidDate = dateTwoDaysValidation(
          new Date(cartState.deliveryDate)
        )
        if (isValidDate) {
          setIsLoadingConfirm(true)
          return router.push('/cart/resume')
        } else {
          showNotification('El dia debe ser 2 dias apartir de hoy', 'warn')
        }
      } else {
        return showNotification('Debes seleccionar un dia de entrega!', 'warn')
      }
    } else {
      setIsLoadingConfirm(true)
      return router.push('/cart/resume')
    }
  }

  const handleEdit = () => {
    router.replace('/cart')
  }

  const handlePostOrder = () => {
    setIsLoadingPost(true)

    const newOrder: ICreateOrderRequest = {
      deliveryAddress: deliveryAddress,
      paymentType: cartState.paymentType,
      deliveryDate: cartState.deliveryDate,
      items: cartState.items
    }
    createOrderRequest(newOrder)
      .then(order => {
        createEmailRequest(`${order?.id}`, false)
        router.replace(`/user/orders/${order?.id}`)
        handleClearState()
      })
      .catch(() => {
        showNotification(
          'La orden no pudo ser realizada, si el fallo continua comunicate con nosotros',
          'error'
        )
        setIsLoadingPost(false)
      })
  }

  return (
    <div className="card p-4 shadow-lg bg-neutral">
      {canEdit && (
        <div className="mb-1">
          <p className="text-lg">Tipo de pago</p>
          <SelectPaymentType />

          {cartState.paymentType?.id === 1 && (
            <div className="mt-2 mb-4">
              <SelectDeliveryDate tailwindClass="w-full" />
            </div>
          )}
        </div>
      )}

      {/* address info */}
      {!canEdit && (
        <div className="mb-6">
          <AddressInfo deliveryAddress={deliveryAddress} />
        </div>
      )}

      {/* order info */}
      <div className="mt-2">
        <OrderInfo order={cartState as any as IOrderModel} />
      </div>

      <div className="flex justify-center items-center flex-col mt-4">
        {canEdit ? (
          <>
            {/* isLoadingConfirm */}
            {isLoadingConfirm ? (
              <CircularProgress />
            ) : (
              <Button
                type="button"
                arialLabel="confirmar orden"
                onClick={handleConfirm}
                tailwindClass="border-none w-full bg-main-primary text-main-50  hover:bg-main-700"
              >
                Confirmar Orden
              </Button>
            )}

            <div className="mt-1 flex justify-center items-center">
              <WarningIcon tailwindClass="text-mainWarning-primary" />
              <small>
                Si no selecciona un metodo de pago por defecto sera:{' '}
                <strong>efectivo contra entrega</strong>
              </small>
            </div>
          </>
        ) : (
          <>
            {isLoadingPost ? (
              <CircularProgress />
            ) : (
              <>
                <a
                  type="button"
                  onClick={handleEdit}
                  className=" text-lg border-none text-mainInfo-primary mb-2 hover:cursor-pointer"
                >
                  Editar la orden
                </a>
                <Button
                  type="button"
                  arialLabel="realizar orden"
                  onClick={handlePostOrder}
                  tailwindClass="border-none w-full bg-main-primary text-main-50  hover:bg-main-700"
                >
                  Realizar la orden
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
