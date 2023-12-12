import { PropsWithChildren, createContext, useContext, useState } from 'react'

interface CartContextProps {
  products: string[]
  clearCart: () => void
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateList: (props: string[]) => void
}

const cartCtxDefaultValue = {
  products: [],
  clearCart: () => {},
  addToCart: (_productId: string) => {},
  removeFromCart: (_productId: string) => {},
  updateList: (_props: string[]) => {}
}

const CartContext = createContext<CartContextProps>(cartCtxDefaultValue)

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider ({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<string[]>([])

  function clearCart () {
    return setProducts([])
  }
  
  function addToCart (productId: string) {
    if (!products.includes(productId)) {
      return setProducts([
        ...products,
        productId
      ])
    }
  }

  function removeFromCart (removeProduct: string) {  
    const newList = products.filter(function (productId) { 
      console.log('remove productId', productId)
      return productId !== removeProduct
    })
    return newList
  }

  const updateList = (newValue: string[]) => {
    setProducts(newValue)
  }

  const value: CartContextProps = {
    products,
    clearCart,
    addToCart,
    removeFromCart,
    updateList
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}