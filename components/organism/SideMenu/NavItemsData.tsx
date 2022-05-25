import { ReactElement } from 'react'
import { StoreIcon } from 'components/icons/StoreIcon'
import { AddressIcon } from 'components/icons/AddressIcon'
import { OrdersIcon } from 'components/icons/OrdersIcon'
import { CartIcon } from 'components/icons/CartIcon'
import { ContactIcon } from 'components/icons/ContactIcon'
import { DashboardIcon } from 'components/icons/DashboardIcon'
import { ProductsIcon } from 'components/icons/ProductsIcon'
import { UsersIcon } from 'components/icons/UsersIcon'

interface NavItem {
  navigateTo: string
  icon?: ReactElement
  text: string
}

export const NavItemsData: NavItem[] = [
  {
    text: 'Tienda',
    icon: <StoreIcon />,
    navigateTo: '/'
  },
  {
    text: 'Mi Direccion',
    icon: <AddressIcon />,
    navigateTo: '/user/address'
  },
  {
    text: 'Mis Ordenes',
    icon: <OrdersIcon />,
    navigateTo: '/user/orders'
  },
  {
    text: 'Carrito',
    icon: <CartIcon />,
    navigateTo: '/cart'
  },
  {
    text: 'Contactos',
    icon: <ContactIcon />,
    navigateTo: '/contacts'
  }
]

export const NavItemsAdminData: NavItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    navigateTo: '/admin/dashboard'
  },
  {
    text: 'Productos',
    icon: <ProductsIcon />,
    navigateTo: '/admin/Products'
  },
  {
    text: 'Ordenes',
    icon: <OrdersIcon />,
    navigateTo: '/admin/Orders'
  },
  {
    text: 'Usuarios',
    icon: <UsersIcon />,
    navigateTo: '/admin/users'
  }
]
