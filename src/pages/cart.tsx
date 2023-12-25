import { useEffect, useState } from 'react'
import { getDocs, query, where, DocumentData, documentId } from 'firebase/firestore'
import { productsRef } from '../utils/collectionRefferences'
import { CartProductType, useCart } from '../contexts/CartContext'
import { CartView } from '../components/CartView'
import _ from 'lodash'
import { AddressForm } from '../components/CartView/AddressForm'

export const Cart = () => {
  const [products, setProducts] = useState<DocumentData[]>([])
  const [isSubmited, setIsSubmited] = useState(false)
  console.log('Cart [products]', products)
  const { products: cartProductsList } = useCart()


  const getProducts = async (orderList: CartProductType[]) => {
    if (orderList?.length > 0) {
      const listIDs = orderList.map(product => (product.productId))
      const q = query(productsRef, where(documentId(), "in", listIDs))
      const snapshotProducts = await getDocs(q)
      const productData = snapshotProducts.docs.map(doc => doc.data())
      // -- adds quantity attribute from cart order list context to product data --
      const merged = _.merge(_.keyBy(productData, 'productId'), _.keyBy(orderList, 'productId'))
      const values = _.values(merged)
      return setProducts(values)
    }
    return setProducts([])
  }

  useEffect(() => {
    getProducts(cartProductsList)
  }, [cartProductsList])

  return (
    <CartView products={products} setIsSubmited={setIsSubmited} />
  )
}

