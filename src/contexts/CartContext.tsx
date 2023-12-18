import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type CartProductType = {
  productId: string,
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

  function clearCart () {
    return setProducts([])
  }

  function changeProductQuantity (productId: string, quantity: number) {
    const newValue = products.map((product) => {
      if (product?.productId === productId) {
        return {
          ...product,
          quantity: quantity
        }
      }
      return product
    })
    return setProducts(newValue)
  }

  function getProductQuantity (productId: string ) {
    return products?.filter((product) => (product?.productId === productId))[0]?.quantity || 0
  }
  
  function addToCart (incomingProductId: string) {
    const indexProduct = products.findIndex(({ productId }) => productId === incomingProductId)
    if (indexProduct === -1) {
      return setProducts((prevState) => ([
        ...prevState,
        {
          productId: incomingProductId,
          quantity: 1
        }
      ]))
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
      {children}
    </CartContext.Provider>
  )
}