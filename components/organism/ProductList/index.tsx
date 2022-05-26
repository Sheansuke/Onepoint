import { FC } from 'react'
import { ProductCard } from '../../molecules/ProductCard/index'
import { IProductModel } from '../../../interfaces/models/IProductModel'

interface ProductListProps {
  products?: IProductModel[]
}

export const ProductList: FC<ProductListProps> = ({ products = [] }) => {
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="mt-5">No se encontraron productos...</p>
        </div>
      )}
    </>
  )
}
