import { Box } from '@mui/material'
import { ProductsTestData } from "@utils/ProductsTestData"
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { ContentLayout } from '../components/organism/layouts/ContentLayout'
import { ProductList } from '../components/organism/ProductList/index'
import { findManyProducts } from '../api/database/product';
import { IProductModel } from '../interfaces/models/IProductModel';
import { FC } from 'react'


// TODO: CREATE 404 PAGE
// TODO: USE REVALIDATE OR ON-DEMAND FOR STATICS PAGES
// TODO: direct access to: prisma studio, database dashboard, vercel dashboard
//TODO: crear pagina principal de productos estatica + revalidaicon
interface IHomePageProps {
  products: IProductModel[]
}

const HomePage: FC<IHomePageProps> = ({products}) => {
  return (
    <>
      <NextSeo
        title="Onepoint - home"
        description="Onepoint tu papeleria online"
      />
      <ContentLayout title="Todos los productos">
        <Box sx={{ mt: 5 }}>
          <ProductList products={products} />
        </Box>
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
