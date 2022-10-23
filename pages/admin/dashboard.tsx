import { GetServerSideProps, NextPage } from 'next'
import { getAuth } from "@clerk/nextjs/server";
import { isUserAdmin } from '../../utils/isUserAdmin';
import { findManyOrdersOnlyCount, findManyProductsOnlyCount } from '../../api/database/dashboard';
import { FC } from 'react';
import { Stat } from '@atoms/Stat';
import { ContentLayout } from '@organism/layouts/ContentLayout';



interface IDashboardPage {
  allOrders: number, isPaidOrders: number, noPaidOrders: number,
  allProducts: number, noStockProducts: number
}

const DashboardPage: FC<IDashboardPage> = ({ allOrders, isPaidOrders, noPaidOrders, allProducts, noStockProducts }) => {
  return (
    <ContentLayout title='Dashboard'>

      {/* ORDERS ZONE */}
      <div className="mt-8">
        <h2 className='text-xl font-bold text-main-500 mb-2'>Ordenes:</h2>
        <div className='stats  shadow stats-vertical  w-full md:stats-horizontal '>
          <Stat
            title='Ordenes'
            value={allOrders}
            shortDescription={'Total de las ordenes'}
          />
          <Stat
            title='Ordenes Pagadas'
            value={isPaidOrders}
            shortDescription={'Total de las ordenes pagadas'}
          />
          <Stat
            title='Ordenes No Pagadas'
            value={noPaidOrders}
            shortDescription={'Total de las ordenes no pagadas'}
          />
        </div>
      </div>

      {/* PRODUCTS ZONE */}
      <div className="mt-8">
        <h2 className='text-xl font-bold text-main-500 mb-2'>Products:</h2>
        <div className='stats  shadow stats-vertical  w-full md:stats-horizontal '>
          <Stat
            title='Productos'
            value={allProducts}
            shortDescription={'Todos los productos existentes'}
          />
          <Stat
            title='Sin Stock'
            value={noStockProducts}
            shortDescription={'Productos que no tienen stock en existencia'}
          />

        </div>
      </div>
    </ContentLayout>
  )
}

export default DashboardPage;


export const getServerSideProps: GetServerSideProps =
  async ({ req }) => {
    const { userId } = getAuth(req);

    const isAdmin = await isUserAdmin(userId);

    if (!isAdmin) return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }


    const [allOrders, isPaidOrders, noPaidOrders, allProducts, noStockProducts] = await Promise.all([
      findManyOrdersOnlyCount(),
      findManyOrdersOnlyCount({ isPaid: true }),
      findManyOrdersOnlyCount({ isPaid: false }),
      findManyProductsOnlyCount(),
      findManyProductsOnlyCount({ inStock: 0 })
    ])


    return {
      props: { allOrders, isPaidOrders, noPaidOrders, allProducts, noStockProducts }
    }

  }

