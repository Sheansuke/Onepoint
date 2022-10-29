import dynamic from 'next/dynamic';

import { FC, useEffect, useState } from 'react';
import { useClerk, SignedOut, SignedIn } from "@clerk/nextjs";
import { useQuery } from 'react-query';

import { getUserRequest } from '@api/axiosRequest/userRequest';
import { NextMaterialLink } from '@atoms/NextMaterialLink';
import { LoginIcon } from '@icons/LoginIcon';

import { showNotification } from '../../../utils/showNotification';
import { LogoutIcon } from '../../icons/LogoutIcon';
import { NavItemsAdminData, NavItemsData } from './NavItemsData';

const NavListItem = dynamic(() =>
  import('@atoms/NavListItem').then(module => module.NavListItem)
)

interface ISideMenuProps {
  children: React.ReactNode | React.ReactNode[]
}

export const SideMenu: FC<ISideMenuProps> = ({ children }) => {
  const { data, error } = useQuery('user', () => getUserRequest())
  const { openSignIn, signOut } = useClerk();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)


  useEffect(() => {
    if (data) {
      const userRole = data?.data?.role?.name

      if (userRole === 'admin') {
        setIsAdmin(true)
      }
    } else if (error) {
      showNotification('No se pudo comprobar el usuario correctamente', 'error')
    }
  }, [data])


  return (
    <div className="drawer">
      <input id="sideMenu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="sideMenu" className="drawer-overlay"></label>


        <ul className="menu p-2 overflow-y-auto w-80 bg-neutral">
          {/* TITLE */}
          <div className="mb-4">
            <p className="normal-case text-3xl text-main-primary font-bold ">
              Onepoint
            </p>
          </div>

          {/* USER PANEL */}
          <SignedOut>
            <label htmlFor="sideMenu" onClick={() => openSignIn()}>
              <NavListItem text="Iniciar Sesión" icon={<LoginIcon />} />
            </label>
          </SignedOut>

          {NavItemsData.map((item, index) => (
            <NextMaterialLink key={index} href={item.navigateTo}>
              <label htmlFor="sideMenu">
                <NavListItem text={item.text} icon={item.icon} />
              </label>
            </NextMaterialLink>
          ))}
          

          <SignedIn>
            <label htmlFor="sideMenu" onClick={() => {
              signOut()
              
            }}>
              <NavListItem text="Cerrar Sesión" icon={<LogoutIcon />} />
            </label>
        

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
            </SignedIn>
        </ul>
      </div>
    </div >
  )
}
