import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { NavListItem } from '@molecules/NavListItem'
import { Box, Divider, Drawer, List, Typography, useTheme } from '@mui/material'
import { RootState } from 'redux/store'
import { closeSideMenu } from '@redux/slices/uiSlice'
import { NavItemsData, NavItemsAdminData } from './NavItemsData'
import { useQuery } from 'react-query'
import { getUserRequest } from '../../../api/axiosRequest/userRequest'

export const SideMenu: FC = () => {
  const router = useRouter()
  const { palette } = useTheme()
  const { data } = useQuery('user', () => getUserRequest())

  // redux
  const { isSideMenuOpen } = useSelector((state: RootState) => state.uiState)
  const dispatch = useDispatch()

  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const navigateTo = (url: string) => {
    router.push(url)
    handleClose()
  }

  const handleClose = () => {
    dispatch(closeSideMenu())
  }

  useEffect(() => {
    if (data) {
      const userRole = data?.data?.role?.name

      if (userRole === 'admin') {
        setIsAdmin(true)
      }
    }
  }, [data])

  return (
    <Drawer
      open={isSideMenuOpen}
      onClose={handleClose}
      anchor="left"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{
          mt: 2,
          mb: 2,
          ml: 1,
          fontWeight: 400
        }}
      >
        Onepoint
      </Typography>
      <Box sx={{ width: 275 }}>
        <List>
          {/* CLIENTE */}
          {NavItemsData.map((item, index) => (
            <NavListItem
              key={index}
              text={item.text}
              icon={item.icon}
              onClick={() => navigateTo(item.navigateTo)}
            />
          ))}

          {/* ADMIN PANEL */}
          {isAdmin && (
            <>
              <Divider
                style={{
                  marginTop: 10
                }}
              />
              <Typography
                sx={{
                  color: palette.secondary[400],
                  ml: 1
                }}
              >
                Admin Panel
              </Typography>
              {NavItemsAdminData.map((item, index) => (
                <NavListItem
                  key={index}
                  text={item.text}
                  icon={item.icon}
                  onClick={() => navigateTo(item.navigateTo)}
                />
              ))}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
