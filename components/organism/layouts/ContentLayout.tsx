import React, { FC } from 'react'

interface ContentLayoutProps {
  children?: React.ReactNode | React.ReactNode[]
  title?: string
}
export const ContentLayout: FC<ContentLayoutProps> = ({ children, title }) => {
  return (
    <div className="m-4 xl:mx-auto pt-10 max-w-[1440px] ">
      <h1 className="text-3xl font-bold">{title ?? ''}</h1>
      {children}
    </div>
  )
}
