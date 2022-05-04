import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { ICartProduct } from '../../interfaces/frontend/ICartProduct'


export type PaymentType = "contra entrega" | "transferencia"

export interface ICartState {
  isLoading: boolean
  deliveryDate?: string
  paymentType?: PaymentType
  items: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
}

const initialState: ICartState = {
  isLoading: true,
  paymentType: "contra entrega",
  items: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: Number(process.env.NEXT_PUBLIC_TAX_RATE),
  total: 0
}

export const cartSlice = createSlice({
  name: 'cartState',
  initialState,
  reducers: {
    // currently this function is execute in MainLayout inside useEffect
    setInitialState: (state, action?: PayloadAction<ICartState>) => {
      state.isLoading = false
      state.deliveryDate = action.payload?.deliveryDate ?? undefined
      state.paymentType = action.payload?.paymentType ?? "contra entrega"
      state.items = action.payload?.items ?? []
      state.numberOfItems = action.payload?.numberOfItems ?? 0
      state.subTotal = action.payload?.subTotal ?? 0
      state.tax = action.payload?.tax ?? Number(process.env.NEXT_PUBLIC_TAX_RATE)
      state.total = action.payload?.total?? 0
    },

    // if product exist in cart, update quantity, else add product to cart
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
    },

    removeProductFromCart: (state, action: PayloadAction<ICartProduct>) => {
      state.items = state.items.filter(
        product => product.id !== action.payload.id
      )

      // ACCOUNTING
      state.numberOfItems -= action.payload.quantity
      state.subTotal -= action.payload.price * action.payload.quantity
      state.total = state.subTotal * state.tax + state.subTotal
      localStorage.setItem('cartState', JSON.stringify(state))
    },

    incrementProductQuantity: (state, action: PayloadAction<ICartProduct>) => {
      state.items = state.items.map(product => {
        if (product.id === action.payload.id) {
          if (product.quantity < product.inStock) {
            product.quantity += 1

            // ACCOUNTING
            state.numberOfItems += 1
            state.subTotal += product.price 
            state.total = state.subTotal * state.tax + state.subTotal
            localStorage.setItem('cartState', JSON.stringify(state))
          }
        }
        return product
      })
    },

    decrementProductQuantity: (state, action: PayloadAction<ICartProduct>) => {
      state.items = state.items.map(product => {
        if (product.id === action.payload.id) {
          if (product.quantity > 1) {
            product.quantity -= 1

            // ACCOUNTING
            state.numberOfItems -= 1
            state.subTotal -= product.price 
            state.total = state.subTotal * state.tax + state.subTotal
            localStorage.setItem('cartState', JSON.stringify(state))
          }
        }
        return product
      })
    },

    setPaymentType: (state, action: PayloadAction<PaymentType>) => {
      state.paymentType = action.payload
      localStorage.setItem('cartState', JSON.stringify(state))
    },

    setDeliveryDate: (state, action: PayloadAction<string>) => {
      state.deliveryDate = action.payload
      localStorage.setItem('cartState', JSON.stringify(state))
    },
    clearCartState: (state) => {
      state.deliveryDate = undefined
      state.numberOfItems = 0
      state.subTotal = 0
      state.total = 0
    }
  }
})

export const {
  addProductToCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  setPaymentType,
  setDeliveryDate,
  clearCartState,
  setInitialState
} = cartSlice.actions

export default cartSlice.reducer
