import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUIState {
  isSideMenuOpen: boolean
}

const initialState: IUIState = {
    isSideMenuOpen: false
}

export const uiSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    openSideMenu: state => {
      state.isSideMenuOpen = true
    },
    closeSideMenu: state => {
      state.isSideMenuOpen = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { openSideMenu, closeSideMenu } = uiSlice.actions

export default uiSlice.reducer
