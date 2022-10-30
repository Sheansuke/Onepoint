import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { findManyProducts, findUniqueProduct } from '@api/database/product';
import { Button } from '@atoms/Button';
import { useCartState } from '@hooks/useCartState';
import { MinusIcon } from '@icons/MinusIcon';
import { PlusIcon } from '@icons/PlusIcon';
import { IProductModel } from '@interfaces/models/IProductModel';
import { ContentLayout } from '@organism/layouts/ContentLayout';
import { showNotification } from '@utils/showNotification';

interface ProductBySlugPageProps {
  product: IProductModel
}

const ProductBySlugPage: FC<ProductBySlugPageProps> = ({ product }) => {
  const router = useRouter()
  const { handleAddProductToCart } = useCartState()
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = (product: IProductModel, quantity: number) => {
    if (quantity === 0)
      return showNotification('El valor minimo aceptado es de: 1', 'error')

    handleAddProductToCart(product, quantity)
    router.push('/cart')
  }

  return (
    <>
      <NextSeo
        title={`Onepoint - product ${product?.title}`}
        description={`Descripción del producto ${product?.title}`}
      />
      <ContentLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 md:pt-10 gap-10">

          {/* IMAGE COLUMN */}
          <div className="flex justify-center card shadow-lg">
            <Image
              src={product.imageUrl}
              width={500}
              height={500}
              alt={product.title}
            />
          </div>

          {/* DESCRIPTION COLUMN */}
          <div>
            <p className="text-2xl font-bold">{product.title}</p>
            <p className="text-xl text-main2-600">{`$${product.price}`}</p>
            <div className="mt-8">
              <p className="text-main2-500 font-bold text-lg">Descripcion:</p>
              <p className="text-lg">{`${product.description}`}</p>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <button
                aria-label="incrementar cantidad"
                onClick={decrementQuantity}
              >
                <MinusIcon tailwindClass="w-8 h-8 text-main-primary " />
              </button>

              <input
                type="text"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="text-center w-16 input input-bordered"
              />

              <button
                aria-label="disminuir cantidad"
                onClick={incrementQuantity}
              >
                <PlusIcon tailwindClass="w-8 h-8 text-main-primary " />
              </button>
            </div>

            <p className="mt-8 font-bold text-center text-xl">
              {` Total: $${quantity * product.price}`}
            </p>

            <div>
              <Button
                type="button"
                arialLabel="agregar al carrito"
                tailwindClass="w-full mt-6 border-none bg-main-primary text-main-50  hover:bg-main-700"
                onClick={() => handleAddToCart(product, quantity)}
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await findManyProducts()
  const products = data.map(product => ({ params: { slug: product.slug } }))
  return {
    paths: products,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params?.slug as string
  const product = await findUniqueProduct(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

export default ProductBySlugPage
