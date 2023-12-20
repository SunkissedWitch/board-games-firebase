import { DocumentData, DocumentReference, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { cartsRef, productsRef } from '../utils/collectionRefferences'
import { db } from '../firebase'
import { useLocation, useNavigate } from 'react-router-dom'

export type CartProductType = {
  productId: string
  productData: DocumentReference<DocumentData, DocumentData>
  quantity: number
}

interface CartContextProps {
  products: CartProductType[]
  totalItems: number
  clearCart: () => void
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateList: (props: CartProductType[]) => void
  changeProductQuantity: (productId: string, quantity: number) => void
  getProductQuantity: (productId: string) => number
}

const cartCtxDefaultValue = {
  products: [],
  totalItems: 0,
  clearCart: () => {},
  addToCart: (_productId: string) => {},
  removeFromCart: (_productId: string) => {},
  updateList: (_props: CartProductType[]) => {},
  changeProductQuantity: (_productId: string, _quantity: number) => {},
  getProductQuantity: (_productId: string) => 0,
}

const CartContext = createContext<CartContextProps>(cartCtxDefaultValue)

export function useCart() {
  return useContext(CartContext)
}


const sumItems = (arrayCollection: CartProductType[]) => {
  let sum = 0
  arrayCollection.forEach(element => {
    return  sum = sum + element.quantity
  })
  console.log('sum', sum)
  return sum
}

export function CartProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<CartProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalItems, setTotalItems] = useState<number>(0)
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const orderRef = doc(cartsRef, currentUser?.uid)

  async function getCartData() {
    if (currentUser?.uid) {
      const docsRef = doc(cartsRef, currentUser?.uid)
      const docSnap = await getDoc(docsRef)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        const orderList: CartProductType[] = docSnap.get('orderList')
        setTotalItems(sumItems(orderList))
        setProducts(orderList)
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
        setProducts([])
        setTotalItems(0)
        setLoading(false)
      }
    }
    return setLoading(false)
  }

  const updateList = async(newValue: CartProductType[] | []) => {
    try {
      await updateDoc(orderRef, {
        orderList: newValue,
      })
      getCartData()
    } catch (error) {
      console.log('updateList [error]', error)
    }
  }

  useEffect(() => {
    getCartData()
  }, [currentUser])

  function clearCart() {
    return updateList([])
  }

  function changeProductQuantity(productId: string, quantity: number) {
    const newValue = products.map((product) => {
      if (product?.productId === productId) {
        return {
          ...product,
          quantity: quantity,
        }
      }
      return product
    })
    updateList(newValue)
  }

  function getProductQuantity(productId: string) {
    return (
      products?.filter((product) => product?.productId === productId)[0]?.quantity || 0
    )
  }

  async function addToCart(incomingProductId: string) {
    if (currentUser) {
      const indexProduct = products.findIndex(
        ({ productId }) => productId === incomingProductId
      )
      if (indexProduct === -1) {
        const docData = {
          orderList: [
            ...products,
            {
              productId: incomingProductId,
              productData: doc(productsRef, incomingProductId),
              quantity: 1,
            },
          ],
        }
        try {
          await setDoc(doc(db, 'carts', currentUser?.uid), docData)
          return getCartData()
        } catch (error) {
          console.log('error [setDoc][addToCart]', error)
        }
      }
      return changeProductQuantity(
        incomingProductId,
        products[indexProduct]?.quantity + 1
      )
    }
    return navigate('/login', { replace: true, state: location })
  }

  function removeFromCart(removeProduct: string) {
    const newList = products.filter(function ({ productId }) {
      return productId !== removeProduct
    })
    updateList(newList)
  }

  const value: CartContextProps = {
    products,
    totalItems,
    changeProductQuantity,
    getProductQuantity,
    clearCart,
    addToCart,
    removeFromCart,
    updateList,
  }

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  )
}
