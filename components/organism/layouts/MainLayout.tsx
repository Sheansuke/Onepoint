import { setInitialState } from '@redux/slices/cartSlice'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from '@atoms/Button'

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
  const [isLoadingRoute, setIsLoadingRoute] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const cartState = Cookies.get('cartState')
    if (cartState) {
      dispatch(setInitialState(JSON.parse(cartState)))
    } else {
      dispatch(setInitialState())
    }

    const handleRouteChange = () => {
      setIsLoadingRoute(true)
    }

    const handleRouteComplete = () => {
      setIsLoadingRoute(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  return (
    <SideMenu>
      <nav>
        <NavBar />
      </nav>

      <main>
        {isLoadingRoute ? (
          <div className="flex justify-center items-center h-96">
            <Button
              type="button"
              arialLabel="loading route"
              tailwindClass="loading btn-ghost btn-xl text-mainInfo-primary"
              text="Cargando..."
            />
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
    </SideMenu>
  )
}
