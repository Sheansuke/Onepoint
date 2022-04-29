import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { NavListItem } from '@molecules/NavListItem'
import {
  Box,
  Divider,
  Drawer,
  List,
  Typography,
  useTheme
} from '@mui/material'
import { NavItemsData, NavItemsAdminData } from './NavItemsData'

interface SideMenuProps {
  // name?: string;
}

export const SideMenu: FC<SideMenuProps> = () => {
  const router = useRouter()
  const { palette } = useTheme()

  const navigateTo = (url: string) => {
    router.push(url)
  }

  return (
    <Drawer
      open={true}
      onClose={() => console.log('close')}
      anchor="left"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 275, paddingTop: 5 }}>
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

          {/* TODO: Falta la condicion de admin */}
          {/* ADMIN PANEL */}
          {true && (
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
