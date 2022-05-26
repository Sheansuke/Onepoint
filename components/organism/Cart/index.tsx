import { FC } from 'react'
import dynamic from 'next/dynamic'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { useRouter } from 'next/router'
import { useCartState } from '@hooks/useCartState'
import { IDeliveryAddressModel } from '@interfaces/models/IDeliveryAddressModel'
import { CircularProgress } from '@atoms/CircularProgress'
import { Button } from '@atoms/Button'

const CartInfo = dynamic(() =>
  import('@molecules/CartInfo').then(module => module.CartInfo)
)

const CartProductCard = dynamic(() =>
  import('@molecules/CartProductCard').then(module => module.CartProductCard)
)

interface ICart {
  canEdit?: boolean
  title: string
  deliveryAddress?: IDeliveryAddressModel
}

const Cart: FC<ICart> = ({ title, canEdit = true, deliveryAddress }) => {
  const router = useRouter()
  const { cartState } = useCartState()

  const navigateTo = (path: string) => {
    router.replace(path)
  }

  if (cartState.isLoading)
    return (
      <ContentLayout title="Loading...">
        <CircularProgress tailwindClass="btn-lg" />
      </ContentLayout>
    )

  return (
    <ContentLayout title={title}>
      {cartState?.items.length > 0 ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="max-h-96  overflow-y-auto p-2">
            {cartState?.items.map((product, index) => (
              <div key={product.id}>
                <CartProductCard
                  key={index}
                  product={product}
                  canEdit={canEdit}
                />
              </div>
            ))}
          </div>
          <div className="p-2">
            <CartInfo canEdit={canEdit} deliveryAddress={deliveryAddress} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-5">No tienes ningun producto aun!</p>

          <Button
            type="button"
            arialLabel="ir a la pagina de inicio"
            onClick={() => navigateTo('/')}
            tailwindClass="btn-ghost text-mainInfo-primary mt-2"
          >
            Ir a la tienda
          </Button>
        </div>
      )}
    </ContentLayout>
  )
}

export default Cart
