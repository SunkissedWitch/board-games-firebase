import { DocumentData, DocumentReference } from 'firebase/firestore'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useAuthStore } from './AuthStore'
import { head, get, pick } from 'lodash'
import { addNewProductToCart, getCartData, changeProductQuantity, updateList } from './CartApiUtils'

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
  clearCart: () => void
  addToCart: (productId: string, productData: DocumentData) => void
  // removeFromCart: (productId: string) => void
  // updateList: (props: CartProductType[]) => void
  // changeProductQuantity: (productId: string, quantity: number) => void
  // getProductQuantity: (productId: string) => number
}

export interface IMinProductData {
  price: number
  photo: string[]
  title: string
  productId: string
  category: string
}

export const cartInitialState = {
  products: [],
  totalItems: 0,
}
const minProductData = (productData: DocumentData) => ({
  ...pick(productData, ['title', 'productId', 'category']),
  price: get(productData, ['description', 'price'], 0),
  photo: head(get(productData,  ['description', 'photo'], []))
}) as IMinProductData

const currentUserUID = useAuthStore.getState().currentUser?.uid;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...cartInitialState,
      setProducts: (products) => set({ products }),
      setTotalItems: (totalItems) => set({ totalItems }),
      clearCart: async () => {
        if (!currentUserUID) return 'Unauthorized'

        await updateList(currentUserUID, [])
        set(cartInitialState)
      },
      addToCart: async (productId, productData) => {
        if (!currentUserUID) return 'Unauthorized'

        const products = get().products
        const indexProduct = products.findIndex(
          ({ productId: id }) => id === productId
        )
        const isNewProduct = indexProduct === -1
        if (isNewProduct) {
          await addNewProductToCart(currentUserUID, products, productId, minProductData(productData))
        } else {
          await changeProductQuantity(currentUserUID, products, productId, products[indexProduct]?.quantity + 1)
        }
        const updatedValue = await getCartData(currentUserUID)
        if (updatedValue !== undefined) set(updatedValue)
      },
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        products: state.products,
        totalItems: state.totalItems
      }),
    }
  )
)
