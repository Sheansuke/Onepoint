import { NavBar } from '@organism/NavBar'
import { setInitialState } from '@redux/slices/cartSlice'
import dynamic from 'next/dynamic'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()

  useEffect(() => {
    const cartState = localStorage.getItem('cartState')
    if (cartState) {
      dispatch(setInitialState(JSON.parse(cartState)))
    } else {
      dispatch(setInitialState())
    }
  }, [])

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
