import { Button } from '@mui/material'
import { NavBar } from '@organism/NavBar'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'

interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const SideMenu = dynamic(
  () => import('@organism/SideMenu').then(module => module.SideMenu),
  {
    ssr: false
  }
)

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
