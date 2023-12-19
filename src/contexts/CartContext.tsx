import { DocumentData, DocumentReference, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { cartsRef, productsRef } from '../utils/collectionRefferences'
import { db } from '../firebase'

export type CartProductType = {
  productId: string,
  productData: DocumentReference<DocumentData, DocumentData>,
  quantity: number
}

interface CartContextProps {
  products: CartProductType[]
  clearCart: () => void
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateList: (props: CartProductType[]) => void
  changeProductQuantity: (productId: string, quantity: number) => void
  getProductQuantity: (productId: string) => number
}

const cartCtxDefaultValue = {
  products: [],
  clearCart: () => {},
  addToCart: (_productId: string) => {},
  removeFromCart: (_productId: string) => {},
  updateList: (_props: CartProductType[]) => {},
  changeProductQuantity: (_productId: string, _quantity: number) => {},
  getProductQuantity: (_productId: string) => 0
}

const CartContext = createContext<CartContextProps>(cartCtxDefaultValue)

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider ({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<CartProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { currentUser } = useAuth()
  console.log('[CartProvider][products]', products)
  
  async function getCartData () {
    console.log('currentUser', currentUser)
    if (currentUser?.uid) {
      const docsRef = doc(cartsRef, currentUser?.uid);
      const docSnap = await getDoc(docsRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setProducts([])
        setLoading(false)
      }
      }
      return setLoading(false)
    }

  useEffect(() => {
    getCartData()
  }, [currentUser])

  function clearCart () {
    return setProducts([])
  }

  async function changeProductQuantity (productId: string, quantity: number) {
    const newValue = products.map((product) => {
      if (product?.productId === productId) {
        return {
          ...product,
          quantity: quantity
        }
      }
      return product
    })
    try {
      const orderRef = doc(cartsRef, currentUser?.uid)
      console.log('[changeProductQuantity]', orderRef)
      await updateDoc(orderRef, {
        orderList: newValue
    })
    } catch (error) {
      console.log('[changeProductQuantity][error]', error)
    }
    return setProducts(newValue)
  }

  function getProductQuantity (productId: string ) {
    return products?.filter((product) => (product?.productId === productId))[0]?.quantity || 0
  }
  
  async function addToCart (incomingProductId: string) {
    const indexProduct = products.findIndex(({ productId }) => productId === incomingProductId)
    console.log('indexProduct', indexProduct)
    if (indexProduct === -1 && currentUser) {
      const docData = {
        userUid: currentUser?.uid,
        orderList: [
          ...products,
          {
            productId: incomingProductId,
            productData: doc(productsRef, incomingProductId),
            quantity: 1
          }
        ],
      }
      try {
        await setDoc(doc(db, "carts", currentUser?.uid), docData)
        return setProducts((prevState) => ([
          ...prevState,
          {
            productId: incomingProductId,
            productData: doc(productsRef, incomingProductId),
            quantity: 1
          }
        ]))
        
      } catch (error) {
        console.log('error [setDoc][addToCart]', error)
      }
    }
    return changeProductQuantity(incomingProductId, products[indexProduct].quantity + 1)
    // return setProducts(newValue)
  }

  function removeFromCart (removeProduct: string) {  
    const newList = products.filter(function ({ productId }) { 
      return productId !== removeProduct
    })
    return setProducts(newList)
  }

  const updateList = (newValue: CartProductType[] |[]) => {
    setProducts(newValue)
  }

  const value: CartContextProps = {
    products,
    changeProductQuantity,
    getProductQuantity,
    clearCart,
    addToCart,
    removeFromCart,
    updateList
  }
  console.log('context products', products)

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  )
}