import { ITableColumn, Table } from '@atoms/Table'
import { IOrderModel } from '../../../interfaces/models/IOrderModel'
import { ContentLayout } from '../../../components/organism/layouts/ContentLayout'
import { useQuery } from 'react-query'
import { getAllOrders } from '@api/axiosRequest/userRequest'
import { CircularProgress } from '@atoms/CircularProgress'
import { NextSeo } from 'next-seo'
import { NextMaterialLink } from '../../../components/atoms/NextMaterialLink'

const tableColumns: ITableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    render: (row: IOrderModel) => <span>{`${row.id.slice(0, 8)}`}</span>
  },
  {
    name: 'id',
    label: 'Orden',
    render: (row: IOrderModel) => (
      <NextMaterialLink href={`/user/orders/${row?.id}`}>
        <a className='underline text-info'>ver esta orden</a>
      </NextMaterialLink>
    )
  },
  {
    name: 'status',
    label: 'Estado',
    render: (row: IOrderModel) => <span>{row?.status?.name}</span>
  },

  {
    name: 'numberOfItems',
    label: 'Numero de productos'
  },
  {
    name: 'subTotal',
    label: 'Sub total',
    render: (row: IOrderModel) => <span>{`$${row.subTotal}`}</span>
  },
  {
    name: 'tax',
    label: 'Impuesto',
    render: (row: IOrderModel) => <span>{`$${row?.subTotal * row?.tax}`}</span>
  },
  {
    name: 'total',
    label: 'Total',
    render: (row: IOrderModel) => <span>{`$${row.total}`}</span>
  },
  {
    name: 'isPaid',
    label: 'Pagado?',
    render: (row: any) =>
      row.isPaid ? (
        <>
          <div className="badge badge-outline badge-primary ">Pagada</div>
        </>
      ) : (
        <div className="badge badge-outline badge-error ">No Pagada</div>
      )
  },
  {
    name: 'paidAt',
    label: 'Fecha de pago'
  },
  {
    name: 'paymentType',
    label: 'Tipo de pago',
    render: (row: IOrderModel) => <span>{row?.paymentType?.name}</span>
  },
  {
    name: 'transactionId',
    label: 'ID de transferencia'
  },
  {
    name: 'deliveryDate',
    label: 'Fecha de entrega'
  }
]

const OrdersPage = () => {
  const { data, isLoading, error } = useQuery('userOrders', () =>
    getAllOrders()
  )

  if (error) {
    return (
      <div className="flex justify-center pt-10 flex-col items-center text-error">
        <div className="text-xl">
          No se pudieron cargar sus ordenes lo sentimos{' '}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center pt-10 flex-col items-center text-info">
        <CircularProgress tailwindClass="btn-xl " />
        <div className="text-xl">Cargando ordenes...</div>
      </div>
    )
  }

  return (
    <>
      <NextSeo
        title="Onepoint - Mis ordenes realizadas"
        description="Ordenes realizadas por el cliente"
      />
      <ContentLayout title="Mis ordenes realizadas">
        <div className="mt-5">
          <Table
            data={data}
            columns={tableColumns}
            emptyMessage="No se encontraron ordenes"
            tailwindClassTableColumns="bg-main-primary text-main-50 text-center"
            tailwindClassTableRows="text-center"
          />
        </div>
      </ContentLayout>
    </>
  )
}

export default OrdersPage
