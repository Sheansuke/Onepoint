import { configureStore,createListenerMiddleware  } from '@reduxjs/toolkit'
import {uiSlice} from "./slices/uiSlice"
import {cartSlice, removeProductFromCart,clearCartState} from "./slices/cartSlice"

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: removeProductFromCart,

  effect: (action,listenerApi) => {
   const cartState = (listenerApi.getState() as any).cartState
   if (cartState.items.length === 0) {
     listenerApi.dispatch(clearCartState())
   }
  }
  
})

export const store = configureStore({
  reducer: {
    uiState: uiSlice.reducer,
    cartState: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch