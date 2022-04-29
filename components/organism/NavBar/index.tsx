import dynamic from 'next/dynamic'
import { NextMaterialLink } from '@atoms/NextMaterialLink'
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import React, { FC, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { openSearchModal, openSideMenu } from '@redux/slices/uiSlice'

interface NavBarProps {
  // name?: string;
}

const SearchModal = dynamic(
  () => import('@molecules/SearchModal').then(module => module.SearchModal),
  {
    ssr: false
  }
)

export const NavBar: FC<NavBarProps> = () => {
  const dispatch = useDispatch()

  const handleOpenSideMenu = () => {
    dispatch(openSideMenu())
  }

  const handleOpenSearchModal = () => {
    dispatch(openSearchModal())
  }

  return (
    <AppBar>
      <SearchModal />

      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <IconButton
            size="small"
            sx={{ m: 0, p: 0 }}
            onClick={handleOpenSideMenu}
          >
            <MenuOutlined
              color="secondary"
              sx={{
                fontSize: 40
              }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex'
          }}
        >
          <Box
            sx={{
              mr: 2
            }}
          >
            <IconButton
              size="small"
              sx={{ m: 0, p: 0 }}
              onClick={handleOpenSearchModal}
            >
              <SearchOutlined
                color="secondary"
                sx={{
                  fontSize: 40
                }}
              />
            </IconButton>
          </Box>

          <Box>
            <NextMaterialLink href="/cart">
              <ShoppingCartOutlined
                color="secondary"
                sx={{
                  fontSize: 40
                }}
              />
            </NextMaterialLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
