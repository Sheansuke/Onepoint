import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { ContentLayout } from '../components/organism/layouts/ContentLayout'
import { Box } from '@mui/material'
import { ProductList } from '../components/organism/ProductList/index'

import {ProductsTestData} from "@utils/ProductsTestData"

// TODO: CREATE 404 PAGE
// TODO: USE REVALIDATE OR ON-DEMAND FOR STATICS PAGES

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Onepoint - home"
        description="Onepoint tu papeleria online"
      />
      <ContentLayout title="Todos los productos">
        <Box sx={{ mt: 5 }}>
          <ProductList products={ProductsTestData} />
        </Box>
      </ContentLayout>
    </>
  )
}


export default Home
