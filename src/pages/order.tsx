import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore'

export const Orders = () => {
  const [orders, setOrders] = useState<DocumentData>([])
  // const userId = 'D9SAkw4qIP7QZKas45dq'
  const getOrders = async () => {
    try {
      const colRef = collection(db, 'orders')
      // const snap = await getDocs(colRef)
      // const categories = snap.docs.map((doc) => (doc.id))
      const snap = await getDocs(colRef)
      const ordersDocData = snap.docs.map(doc => doc.data())
      console.log('ordersDoc', ordersDocData)
      // ToDo: look for the _DocumentReference
      setOrders(ordersDocData)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <div className='px-5 container mx-auto'>
        {orders.map((order: DocumentData) => (
          <div>{order?.id}</div>
        ))}
      </div>
    </>
  )
}

