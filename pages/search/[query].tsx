import { ContentLayout } from '@organism/layouts/ContentLayout'
import { ProductList } from '@organism/ProductList'
import { ProductsTestData } from '@utils/ProductsTestData'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react';
import { IProductModel } from '../../interfaces/models/IProductModel'

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
        <div className='mt-10'>
          <ProductList products={products} />
        </div>
      </ContentLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const query = ctx.query.query as string
  const queryRegex = new RegExp(query, 'gi')

  // first find by tags if not found find by name
  const products = ProductsTestData.filter(product => {
    const isMatch = product.tags.filter(tag => tag.match(queryRegex))
     const success = isMatch && isMatch.length > 0 ? true : false
     if (!success){
       return product.title.match(queryRegex)
     }
      return success
  })

  return {
    props: {
      products,
      query: ctx.query.query
    }
  }
}

export default SearchPage
