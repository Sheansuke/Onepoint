import { IconProps } from '@mui/material'
import { ReactElement } from 'react'
import {
  ContactMailOutlined,
  PermContactCalendarOutlined,
  StoreOutlined,
  SupervisedUserCircleOutlined
} from '@mui/icons-material'
import {
  HomeOutlined,
  AssignmentOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  ProductionQuantityLimits
} from '@mui/icons-material'

interface NavItem {
  navigateTo: string
  icon?: ReactElement<IconProps>
  text: string
}

export const NavItemsData: NavItem[] = [
  {
    text: 'Tienda',
    icon: <StoreOutlined />,
    navigateTo: '/'
  },
  {
    text: 'Mi Direccion',
    icon: <ContactMailOutlined />,
    navigateTo: '/user/address'
  },
  {
    text: 'Mis Ordenes',
    icon: <AssignmentOutlined />,
    navigateTo: '/my-orders'
  },
  {
    text: 'Carrito',
    icon: <ShoppingCartOutlined />,
    navigateTo: '/cart'
  },
  {
    text: 'Contactos',
    icon: <PermContactCalendarOutlined />,
    navigateTo: '/contacts'
  }
]

export const NavItemsAdminData: NavItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    navigateTo: '/admin/dashboard'
  },
  {
    text: 'Productos',
    icon: <AssignmentOutlined />,
    navigateTo: '/admin/Products'
  },
  {
    text: 'Ordenes',
    icon: <ProductionQuantityLimits />,
    navigateTo: '/admin/Orders'
  },
  {
    text: 'Usuarios',
    icon: <SupervisedUserCircleOutlined />,
    navigateTo: '/admin/users'
  }
]
