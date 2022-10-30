import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { FC } from 'react';

import { findManyProducts } from '@api/database/product';
import { IProductModel } from '@interfaces/models/IProductModel';
import { ContentLayout } from '@organism/layouts/ContentLayout';
import { ProductList } from '@organism/ProductList/index';

// TODO: direct access to: prisma studio, database dashboard, vercel dashboard
// TODO: clerk is in development mode
// TODO: change all CLERK withServerSideAuth by https://clerk.dev/docs/nextjs/api-routes
// TODO: Complete Supabase migration
// TODO: change email to onepoint email on all platform

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
  try {
    const products = await findManyProducts()
    return {
      props: {
        products
      }
    }

  } catch (error) {
    return {
      props: {
        products: []
      }
    }
    
  }
}

export default HomePage
