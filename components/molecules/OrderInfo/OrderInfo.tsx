import { IOrderModel } from '@interfaces/models'
import { FC } from 'react'
import { format } from 'date-fns'

export interface OrderInfoProps {
  order: IOrderModel
}

export const OrderInfo: FC<OrderInfoProps> = ({ order }) => {
  return (
    <>
      <h2 className="text-3xl">Orden</h2>

      <div className="divider mt-1" />

      {order?.paymentType && (
        <div className="flex justify-between">
          <p className="text-lg">Tipo de pago</p>
          <p className="text-lg">{order.paymentType?.name}</p>
        </div>
      )}

      {order?.deliveryDate && (
        <div className="flex justify-between">
          <p className="text-lg">Fecha de entrega</p>
          <p className="text-lg">
            {format(new Date(order.deliveryDate), 'dd-MM-yyyy')}
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <p className="text-lg">No. Productos</p>
        <p className="text-lg">{`${order.numberOfItems}`}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-lg">Sub Total</p>
        <p className="text-lg">{`$${order.subTotal}`}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-lg">{`Impuestos (${process.env.NEXT_PUBLIC_TAX_RATE}%)`}</p>
        <p className="text-lg">{`$${
          order.subTotal * order.tax
        }`}</p>
      </div>

      <div className="flex justify-center mt-6">
        <p className="font-bold text-xl mr-20">
          Total:
        </p>
        <p className="font-bold text-xl ml-20">
          {`$${order.total}`}
        </p>
      </div>
    </>
  )
}
