import { setInitialState } from '@redux/slices/cartSlice'
import dynamic from 'next/dynamic'
import React, { FC, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}


const NavBar = dynamic(
  () => import('@organism/NavBar').then(module => module.NavBar),
  {
    ssr: true
  }
)

const SideMenu = dynamic(
  () => import('@organism/SideMenu').then(module => module.SideMenu),
  {
    ssr: true
  }
)

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const cartState = Cookies.get('cartState')
    if (cartState) {
      dispatch(setInitialState(JSON.parse(cartState)))
    } else {
      dispatch(setInitialState())
    }
  }, [])

  return (
    <SideMenu>
      <nav>
        <NavBar />
      </nav>

      <main>{children}</main>
    </SideMenu>
  )
}
