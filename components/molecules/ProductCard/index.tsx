import { NextMaterialLink } from '@atoms/NextMaterialLink'
import { useCartState } from '@hooks/useCartState'
import Image from 'next/image'
import { FC } from 'react'
import { IProductModel } from '@interfaces/models/IProductModel'
import { Button } from '@atoms/Button'
import { CartAddIcon } from '@icons/CartAddIcon'

interface ProductCardProps {
  product: IProductModel
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { handleAddProductToCart } = useCartState()

  const handleProductToCard = (product: IProductModel, quantity: number) => {
    handleAddProductToCart(product, quantity)
  }

  return (
    <div className="card p-4 bg-neutral shadow-xl relative ">
      {product.inStock > 0 ? (
        <div className="badge badge-outline badge-primary absolute z-50">
          Disponible
        </div>
      ) : (
        <div className="badge badge-outline badge-error absolute z-50">
          Agotado
        </div>
      )}

      <NextMaterialLink href={`/product/${product.slug}`}>
        <figure>
          <Image
            src={product.imageUrl}
            width={410}
            height={410}
            alt={product.title}
            className="hover:cursor-pointer "
          />
        </figure>
      </NextMaterialLink>

      <div className="flex justify-between gap-2 mt-4">
        <div>
          <p className="font-bold text-xl">{product.title}</p>
          <p className="text-lg text-main2-600">{`$${product.price}`}</p>
        </div>

        <div>
          <Button
            type="button"
            arialLabel="Agregar al carrito"
            onClick={() => handleProductToCard(product, 1)}
            tailwindClass="rounded-full border-none w-16 h-16 bg-main-primary text-main-50  hover:bg-main-700"
          >
            <CartAddIcon tailwindClass="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}
