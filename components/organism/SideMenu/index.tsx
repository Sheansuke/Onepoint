import { FC, useEffect, useState } from 'react'
import { NavItemsData, NavItemsAdminData } from './NavItemsData'
import { useQuery } from 'react-query'
import { getUserRequest } from '@api/axiosRequest/userRequest'
import { NextMaterialLink } from '@atoms/NextMaterialLink'
import dynamic from 'next/dynamic'


const NavListItem = dynamic(() =>
  import('@atoms/NavListItem').then(module => module.NavListItem)
)

interface ISideMenuProps {
  children: React.ReactNode | React.ReactNode[]
}

// TODO: add avatar user icon to header
export const SideMenu: FC<ISideMenuProps> = ({ children }) => {
  const { data } = useQuery('user', () => getUserRequest())
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      const userRole = data?.data?.role?.name

      if (userRole === 'admin') {
        setIsAdmin(true)
      }
    }
  }, [data])

  return (
    <div className="drawer">
      <input id="sideMenu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="sideMenu" className="drawer-overlay"></label>

        {/* USER PANEL */}
        <ul className="menu p-2 overflow-y-auto w-80 bg-base-100">
          {/* TITLE */}
          <div className="mb-4 ">
            <p className="normal-case text-3xl text-main-primary font-bold ">
              Onepoint
            </p>
          </div>

          {NavItemsData.map((item, index) => (
            <NextMaterialLink key={index} href={item.navigateTo}>
              <label htmlFor="sideMenu">
                <NavListItem text={item.text} icon={item.icon} />
              </label>
            </NextMaterialLink>
          ))}

          {/* ADMIN PANEL */}
          {isAdmin && (
            <>
              <div className="divider mt-8">Admin Panel</div>
              {NavItemsAdminData.map((item, index) => (
                <NextMaterialLink key={index} href={item.navigateTo}>
                  <label htmlFor="sideMenu">
                    <NavListItem text={item.text} icon={item.icon} />
                  </label>
                </NextMaterialLink>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
