import { FC, ReactNode } from 'react'

export type ITableColumn = {
  name: string
  label: string
  render?: (row: any) => ReactNode
}

interface TableProps {
  data: any[]
  columns: ITableColumn[]
  emptyMessage?: string
  tailwindClassTable?: string
  tailwindClassTableColumns?: string
  tailwindClassTableRows?: string
}

export const Table: FC<TableProps> = ({
  data = [],
  columns = [],
  emptyMessage = 'No data',
  tailwindClassTable,
  tailwindClassTableColumns,
  tailwindClassTableRows
}) => {
  return (
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <>
          <table className="table w-full ">
            <thead>
              <tr>
                {columns.map(({ name, label }) => (
                  <th key={name} className={tailwindClassTableColumns}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <p className="text-center mt-4">{emptyMessage}</p>
        </>
      ) : (
        <table className={tailwindClassTable + ' table w-full'}>
          {/* HEAD */}
          <thead>
            <tr>
              {columns.map(({ name, label }) => (
                <th key={name} className={tailwindClassTableColumns}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((preData, index) => (
              <tr key={index} className="hover">
                {columns.map(({ name, render }) => (
                  <td key={name} className={tailwindClassTableRows}>
                    {<>{render ? render(preData) : preData[name]}</>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
