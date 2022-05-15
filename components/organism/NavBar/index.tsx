import dynamic from 'next/dynamic'
import { NextMaterialLink } from '@atoms/NextMaterialLink'
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material'
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openSearchModal, openSideMenu } from '@redux/slices/uiSlice'
import { RootState } from 'redux/store'

interface NavBarProps {
  // name?: string;
}

const SearchModal = dynamic(
  () => import('@molecules/SearchModal').then(module => module.SearchModal),
  {
    ssr: true
  }
)

export const NavBar: FC<NavBarProps> = () => {
  const dispatch = useDispatch()
  const { numberOfItems } = useSelector((state: RootState) => state.cartState)

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
          justifyContent: 'space-between',
          m: 1
        }}
      >
        <Box>
          <IconButton
          aria-label='abrir menu'
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
            aria-label='buscar'
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
              <Badge
                badgeContent={numberOfItems >= 9 ? '+9' : numberOfItems}
                color="info"
              >
                <ShoppingCartOutlined
                  color="secondary"
                  sx={{
                    fontSize: 40
                  }}
                />
              </Badge>
            </NextMaterialLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
