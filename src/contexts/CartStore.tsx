import { DocumentData } from 'firebase/firestore'
import { create } from 'zustand'
import { CartProductType, addNewProductToUserCart, changeProductQuantity, updateList } from '../firebaseApi/CartApi'

interface CartStore {
  products: CartProductType[]
  totalItems: number
  updateProducts: (products: CartProductType[]) => void
  updateTotalItems: (totalItems: number) => void
  clearCart: () => void
  addToCart: (productId: string, productData: DocumentData) => void
  removeFromCart: (productId: string) => void
  changeProductQuantity: (productId: string, quantity: number) => void
}

export const cartInitialState = {
  products: [],
  totalItems: 0,
}

export const useCartStore = create<CartStore>()(
  (set, get) => ({
    ...cartInitialState,
    updateProducts: (products) => set({ products }),
    updateTotalItems: (totalItems) => set({ totalItems }),
    clearCart: () => updateList([]),
    addToCart: (productId, productData) => {
      const indexProduct = get().products.findIndex(({ productId: id }) => id === productId)
      if (indexProduct === -1) {
        addNewProductToUserCart({
          productId,
          productData
        })
      } else {
        changeProductQuantity(productId, get().products[indexProduct]?.quantity + 1)
      }
    },
    removeFromCart: (productId: string) => {
      const products = get().products
      const newList = products.filter(({ productId: id }) => id !== productId)
      updateList(newList)
    },
    changeProductQuantity
  })
)
