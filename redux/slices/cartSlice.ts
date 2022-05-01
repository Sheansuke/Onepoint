import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { ICartProduct } from '../../interfaces/frontend/ICartProduct'

export interface ICartState {
  items: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
}

const initialState: ICartState = {
  items: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0.18,
  total: 0
}

export const cartSlice = createSlice({
  name: 'cartState',
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<ICartState>) => {
      state.items = action.payload.items
      state.numberOfItems = action.payload.numberOfItems
      state.subTotal = action.payload.subTotal
      state.tax = action.payload.tax
      state.total = action.payload.total
    },

    addProductToCart: (state, action: PayloadAction<ICartProduct>) => {
      const currentState = current(state)
      const productExistInCart = currentState.items.find(
        product => product.id === action.payload.id
      )

      if (productExistInCart) {
        state.items = state.items.map(product => {
          if (product.id === action.payload.id) {
            product.quantity += action.payload.quantity
          }
          return product
        })

        state.numberOfItems += action.payload.quantity
      } else {
        state.numberOfItems += action.payload.quantity
        state.items.push(action.payload)
      }

      // ACCOUNTING
      state.subTotal += action.payload.price * action.payload.quantity
      state.total = state.subTotal * state.tax + state.subTotal
      localStorage.setItem('cartState', JSON.stringify(state))
    }
  }
})

// Action creators are generated for each case reducer function
export const { addProductToCart, setInitialState } = cartSlice.actions

export default cartSlice.reducer
