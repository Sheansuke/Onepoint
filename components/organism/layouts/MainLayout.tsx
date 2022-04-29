import { Button } from '@mui/material'
import React, { FC } from 'react'

interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      {/* TODO: Navbar */}
      <nav></nav>

      {/* TODO: SideMenu */}

      <main>{children}</main>
    </>
  )
}

export default React.memo(MainLayout)
