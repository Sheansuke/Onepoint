import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@atoms/Button';
import { NextMaterialLink } from '@atoms/NextMaterialLink';
import { useCartState } from '@hooks/useCartState';
import { MinusIcon } from '@icons/MinusIcon';
import { PlusIcon } from '@icons/PlusIcon';
import { ICartProduct } from '@interfaces/frontend/ICartProduct';

interface CartProductCardProps {
  product: ICartProduct
  canEdit: boolean
}

export const CartProductCard: FC<CartProductCardProps> = ({
  product,
  canEdit = false
}) => {
  const { handleRemoveProductFromCart, handleSetProductQuantity } =
    useCartState()

  return (
    <div className="flex p-2 mt-2 shadow-lg rounded-lg bg-neutral">
      <div>
        <NextMaterialLink href={`/product/${product.slug}`}>
          <div className="flex justify-center">
            <Image
              src={product.imageUrl}
              width={100}
              height={100}
              alt={product.title}
             
            />
          </div>
        </NextMaterialLink>
      </div>

      <div className="ml-2 w-full">
        {/* TEXT */}
        <div>
          <p className="font-bold text-xl">{product.title}</p>
          <p className="text-lg text-main2-600">{`$${product.price}`}</p>
        </div>

        {/* INCREMENT DECREMENT ICONS */}
        {canEdit && (
          <div className="flex gap-2 mt-1">
            <button
              aria-label="incrementar cantidad"
              onClick={() =>
                handleSetProductQuantity({
                  ...product,
                  quantity: -1
                })
              }
            >
              <MinusIcon tailwindClass="w-8 h-8 text-main-primary " />
            </button>

            <p className="text-xl">{product.quantity}</p>

            <button
              aria-label="disminuir cantidad"
              onClick={() =>
                handleSetProductQuantity({
                  ...product,
                  quantity: 1
                })
              }
            >
              {' '}
              <PlusIcon tailwindClass="w-8 h-8 text-main-primary " />
            </button>
          </div>
        )}

        {/* REMOVE ICON */}
        <div className="flex justify-end">
          {/* canEdit */}
          {canEdit ? (
            <Button
              type="button"
              arialLabel="eliminar producto"
              tailwindClass="btn-ghost border-none text-mainError-primary"
              onClick={() => handleRemoveProductFromCart(product)}
            >
              Eliminar
            </Button>
          ) : (
            <p className="m-2">Cantidad: {product.quantity}</p>
          )}
        </div>
      </div>
    </div>
  )
}
