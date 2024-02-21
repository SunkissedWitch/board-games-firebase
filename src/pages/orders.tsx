import { useEffect, useState } from 'react'
import { getDocs, query, where, DocumentData } from 'firebase/firestore'
import { ordersRef } from '../utils/collectionRefferences'
import { OrderCard } from '../components/Orders/Order'
import { useAuthStore } from '../contexts/AuthStore'

export const Orders = () => {
  const [orders, setOrders] = useState<DocumentData[]>([])
  const { currentUser } = useAuthStore()

  const getOrders = async () => {
    try {
      const q = query(ordersRef, where('userUID', '==', currentUser?.uid))
      const querySnapshot = await getDocs(q)
      let ordersData: DocumentData[] = []
      querySnapshot.forEach(async (orderDoc) => {
        ordersData.push({...orderDoc.data(), orderId: orderDoc.id })
      })
      setOrders(ordersData)
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
        <h1 className='text-lg font-medium leading-10'>My Orders:</h1>
        <div className='flex flex-col gap-5 py-2.5 mb-2.5'>
          {orders?.map((order: DocumentData) => (
            <OrderCard key={order?.orderId} order={order} />
          ))}
        </div>
      </div>
    </>
  )
}
