import { Button } from '@mui/material'
import { NavBar } from '@organism/NavBar'
import React, { FC } from 'react'
import { SideMenu } from '../SideMenu/index'

interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <nav>
        <NavBar />
      </nav>

      <SideMenu />

      <main>{children}</main>
    </>
  )
}
