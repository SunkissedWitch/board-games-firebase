import { useEffect, useState } from 'react'
import { getDocs, query, where, DocumentData } from 'firebase/firestore'
import { ordersRef } from '../utils/collectionRefferences'
import { useAuth } from '../contexts/AuthContext'
import { Order } from '../components/Orders/Order'

export const Orders = () => {
  const [orders, setOrders] = useState<DocumentData[]>([])
  const { currentUser } = useAuth()

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
  console.log('orders', orders)

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <div className='px-5 container mx-auto'>
        Orders:
        <div className='flex flex-col gap-5'>
          {orders?.map((order: DocumentData) => (
            <Order key={order?.orderId} order={order} />
          ))}
        </div>
      </div>
    </>
  )
}
