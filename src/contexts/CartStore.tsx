import { DocumentData, DocumentReference } from 'firebase/firestore'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartProductType = {
  productId: string
  productData: DocumentData
  productReference: DocumentReference<DocumentData, DocumentData>
  quantity: number
}

interface CartStore {
  products: CartProductType[]
  totalItems: number
  setProducts: (products: CartProductType[]) => void
  setTotalItems: (totalItems: number) => void
  // clearCart: () => void
  // addToCart: (productId: string, productData: DocumentData) => void
  // removeFromCart: (productId: string) => void
  // updateList: (props: CartProductType[]) => void
  // changeProductQuantity: (productId: string, quantity: number) => void
  // getProductQuantity: (productId: string) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      totalItems: 0,
      setProducts: (products) => set({ products }),
      setTotalItems: (totalItems) => set({ totalItems }),

      // logout: async () => {
      //   try {
      //     await signOut(auth);
      //     return set({ currentUser: null });
      //   } catch (error) {
      //     return console.log('SignOut [error]:', error);
      //   }
      // },
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        currentUser: state.products,
        totalItems: state.totalItems
      }),
    }
  )
)
