import { DocumentData } from 'firebase/firestore'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartProductType, addNewProductToUserCart, changeProductQuantity, updateList } from '../firebaseApi/CartApi'

interface CartStore {
  products: CartProductType[]
  totalItems: number
  updateProducts: (products: CartProductType[]) => void
  updateTotalItems: (totalItems: number) => void
  clearCart: () => void
  addToCart: (productId: string, productData: DocumentData) => void
  removeFromCart: (productId: string) => void
  // updateList: (props: CartProductType[]) => void
  // changeProductQuantity: (productId: string, quantity: number) => void
  // getProductQuantity: (productId: string) => number
}

export const cartInitialState = {
  products: [],
  totalItems: 0,
}

export const useCartStore = create<CartStore>()(
  persist(
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
      // getCart: async () => {
      //   const result = await getUserCartData()
      //   if (result) return set(result)
      //   return set(cartInitialState)
      // },
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        products: state.products,
        totalItems: state.totalItems
      }),
    }
  )
)
