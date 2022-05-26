import { NextMaterialLink } from '@atoms/NextMaterialLink'
import { FC } from 'react'
import { IDeliveryAddressModel } from '@interfaces/models/IDeliveryAddressModel'

interface AddressInfoProps {
  deliveryAddress?: IDeliveryAddressModel
  isOrderPage?: boolean
}

export const AddressInfo: FC<AddressInfoProps> = ({
  deliveryAddress,
  isOrderPage = false
}) => {
  return (
    <>
      <h2 className="text-3xl">Direccion</h2>

      <div className="divider mt-1" />

      {!isOrderPage && (
        <div>
          <NextMaterialLink href="/user/address">
            <a className="underline text-lg text-mainInfo-primary">
              Editar direccion
            </a>
          </NextMaterialLink>
        </div>
      )}

      <div className="flex justify-between">
        <p className="text-lg">Nombre</p>
        <p className="text-lg">
          {deliveryAddress?.name} {deliveryAddress?.lastName}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-lg">Sector</p>
        <p className="text-lg">{deliveryAddress?.sector}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-lg">Calle</p>
        <p className="text-lg">{deliveryAddress?.street}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-lg">Lugar de referencia</p>
        <p className="text-lg">{deliveryAddress?.referencePlace}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-lg">Celular / Telefono</p>
        <p className="text-lg">{deliveryAddress?.phone}</p>
      </div>
    </>
  )
}
