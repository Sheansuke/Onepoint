import { createSlice } from '@reduxjs/toolkit'

export interface IUIState {
  isSideMenuOpen: boolean
  isSearchModalOpen: boolean
}

const initialState: IUIState = {
  isSideMenuOpen: false,
  isSearchModalOpen: false
}

export const uiSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    openSideMenu: state => {
      state.isSideMenuOpen = true
    },
    closeSideMenu: state => {
      state.isSideMenuOpen = false
    },
    openSearchModal: state => {
      state.isSearchModalOpen = true
    },
    closeSearchModal: state => {
      state.isSearchModalOpen = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { openSideMenu, closeSideMenu,openSearchModal,closeSearchModal } = uiSlice.actions

export default uiSlice.reducer
