import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import {
    closeSearchModal, closeSideMenu, openSearchModal, openSideMenu
} from '@redux/slices/uiSlice';

export const useCartState = () => {
  const dispatch = useDispatch()
  const uiState = useSelector((state: RootState) => state.uiState)

  const handleOpenSideMenu = useCallback(() => {
    dispatch(openSideMenu())
  }, [])
  const handleCloseSideMenu = useCallback(() => {
    dispatch(closeSideMenu())
  }, [])
  const handleOpenSearchModal = useCallback(() => {
    dispatch(openSearchModal())
  }, [])
  const handleCloseSearchModal = useCallback(() => {
    dispatch(closeSearchModal())
  }, [])

  return {
    uiState,
    handleOpenSideMenu,
    handleCloseSideMenu,
    handleOpenSearchModal,
    handleCloseSearchModal
  }
}
