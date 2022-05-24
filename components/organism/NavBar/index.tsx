import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { openSearchModal, openSideMenu } from '@redux/slices/uiSlice'
import { RootState } from 'redux/store'
import { CartIcon } from 'components/icons/CartIcon'
import { MenuIcon } from 'components/icons/MenuIcon'
import { SearchIcon } from 'components/icons/SearchIcon'
import { NextMaterialLink } from '@atoms/NextMaterialLink'

const SearchModal = dynamic(
  () => import('@molecules/SearchModal').then(module => module.SearchModal),
  {
    ssr: true
  }
)

export const NavBar = () => {
  const dispatch = useDispatch()
  const { numberOfItems } = useSelector((state: RootState) => state.cartState)

  const handleOpenSideMenu = () => {
    dispatch(openSideMenu())
  }

  const handleOpenSearchModal = () => {
    dispatch(openSearchModal())
  }

  return (
    <>
      <SearchModal />

      <div className="navbar px-4">
        {/* MENU */}
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle"
            onClick={handleOpenSideMenu}
          >
            <MenuIcon tailwindClass="w-8 h-8" />
          </button>
        </div>

        {/* TITLE */}
        <div className="navbar-center">
          <NextMaterialLink href="/">
            <a className="hover:cursor-pointer normal-case text-2xl text-main-primary font-bold ">
              Onepoint
            </a>
          </NextMaterialLink>
        </div>

        {/* SEARCH AND CART */}
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={handleOpenSearchModal}
          >
            <SearchIcon tailwindClass="w-8 h-8" />
          </button>

          <NextMaterialLink href="/cart">
            <button className="btn btn-ghost btn-circle">
              <CartIcon tailwindClass="w-8 h-8" indicator={numberOfItems} />
            </button>
          </NextMaterialLink>
        </div>
      </div>
    </>
  )
}
