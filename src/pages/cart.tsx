import { useEffect, useState } from 'react'
import { getDocs, query, where, DocumentData, documentId } from 'firebase/firestore'
import { productsRef } from '../utils/collectionRefferences'
import { useCart } from '../contexts/CartContext'
import { CartView } from '../components/CartView'

export const Cart = () => {
  const [products, setProducts] = useState<DocumentData[]>([])
  console.log('products', products)
  const { products: cartProductsList } = useCart()


  const getProducts = async (orderList: string[]) => {
    console.log('orderList', orderList)
    if (orderList?.length > 0) {
      const q = query(productsRef, where(documentId(), "in", orderList))
      const snapshotProducts = await getDocs(q)
      const prods = snapshotProducts.docs.map(doc => doc.data())
      return setProducts(prods)
    }
  }

  useEffect(() => {
    getProducts(cartProductsList)
  }, [cartProductsList])

  return (
    <CartView products={products} />
  )
}

