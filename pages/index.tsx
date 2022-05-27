import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { ContentLayout } from '@organism/layouts/ContentLayout'
import { ProductList } from '@organism/ProductList/index'
import { findManyProducts } from '@api/database/product'
import { IProductModel } from '@interfaces/models/IProductModel'
import { FC } from 'react'

// TODO: CREATE 404 PAGE
// TODO: direct access to: prisma studio, database dashboard, vercel dashboard
// TODO: clerk is in development mode
// TODO: refactor inputs
// TODO: added loading screen with router.on
interface IHomePageProps {
  products: IProductModel[]
}

const HomePage: FC<IHomePageProps> = ({ products }) => {
  return (
    <>
      <NextSeo
        title="Onepoint - home"
        description="Onepoint tu papeleria online"
      />
      <ContentLayout title="Todos los productos">
        <div className='mt-5'>
          <ProductList products={products} />
        </div>
      </ContentLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await findManyProducts()

  return {
    props: {
      products
    }
  }
}

export default HomePage
