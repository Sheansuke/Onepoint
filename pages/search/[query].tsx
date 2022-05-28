import { ContentLayout } from '@organism/layouts/ContentLayout'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IProductModel } from '@interfaces/models/IProductModel'
import { findManyProducstByTitle } from '../../api/database/product'

const ProductList = dynamic(() =>
  import('@organism/ProductList').then(module => module.ProductList)
)

interface SearchPageProps {
  products: IProductModel[]
  query: string
}

const SearchPage: FC<SearchPageProps> = ({ products, query }) => {
  return (
    <>
      <NextSeo
        title={`Onepoint - Buscando por: ${query}`}
        description={`Onepoint resultados de la busqueda: ${query}`}
      />
      <ContentLayout title={`Buscando por: ${query}`}>
        <div className="mt-10">
          <ProductList products={products} />
        </div>
      </ContentLayout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ctx => {
  const query = ctx.query.query as string

  try {
    const products = await findManyProducstByTitle(query)

    return {
      props: {
        products,
        query: ctx.query.query
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export default SearchPage
