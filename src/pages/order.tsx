import { useEffect, useState } from 'react'
import { getDocs, query, where, DocumentData, documentId, doc } from 'firebase/firestore'
import { ordersRef, productsRef, usersRef } from '../utils/collectionRefferences'

export const Orders = () => {
  const [orders, setOrders] = useState<DocumentData>([])

  const userId = 'D9SAkw4qIP7QZKas45dq'
  // Todo: use firebase/auth to get currentUser, find method to create order with userCredentials
  const currentUser = doc(usersRef, userId)
  const getOrders = async () => {
    try {
      const q = query(ordersRef, where('user', '==', currentUser))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (orderDoc) => {
        if (orderDoc.data().order) {
          const productsRefDocsArray = orderDoc.data().order
          const productsQuery = query(
            productsRef,
            where(documentId(), 'in', productsRefDocsArray)
          )

          const productsDocsSnap = await getDocs(productsQuery)
          let newOrders: DocumentData[] = []
          productsDocsSnap.forEach((doc) =>
            newOrders.push({ id: doc.id, ...doc.data() })
          )
          setOrders(newOrders)
        }
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  console.log('orders', orders)

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <div className='px-5 container mx-auto'>
        Order:
        <ul className='p-2 border'>
          {orders?.map((order: DocumentData) => (
            <li key={order?.id}>
              {order?.category} / {order?.title} / {order?.description?.price}{' '}
              uah
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
