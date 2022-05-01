import { configureStore } from '@reduxjs/toolkit'
import {uiSlice} from "./slices/uiSlice"
import {cartSlice} from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    uiState: uiSlice.reducer,
    cartState: cartSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch