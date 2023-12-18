import { useEffect, useState } from 'react'
import { getDocs, query, where, DocumentData, documentId } from 'firebase/firestore'
import { productsRef } from '../utils/collectionRefferences'
import { CartProductType, useCart } from '../contexts/CartContext'
import { CartView } from '../components/CartView'

export const Cart = () => {
  const [products, setProducts] = useState<DocumentData[]>([])
  console.log('products', products)
  const { products: cartProductsList } = useCart()


  const getProducts = async (orderList: CartProductType[]) => {
    console.log('orderList', orderList)
    if (orderList?.length > 0) {
      const listIDs = orderList.map(product => (product.productId))
      const q = query(productsRef, where(documentId(), "in", listIDs))
      const snapshotProducts = await getDocs(q)
      const prods = snapshotProducts.docs.map(doc => doc.data())
      return setProducts(prods)
    }
    return setProducts([])
  }

  useEffect(() => {
    getProducts(cartProductsList)
  }, [cartProductsList])

  return (
    <CartView products={products} />
  )
}

