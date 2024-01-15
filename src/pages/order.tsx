import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ordersRef } from '../utils/collectionRefferences'
import { OrderHeader } from '../components/OrderPage/OrderHeader'
import { IOrder } from '../components/Orders/Order'

export const OrderPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<IOrder>()

  const getOrder = async () => {
    try {
      const orderRef = doc(ordersRef, orderId)
      const orderSnapshot = await getDoc(orderRef)
      console.log(orderSnapshot)
      if (orderSnapshot.exists()) {
        // console.log('[order] Document data:', orderSnapshot.data())
        setOrder(orderSnapshot.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
        return
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getOrder()
  }, [])
  console.log('order', order)

  return (
    <section className='container px-5 mx-auto'>
      <h1 className='text-lg font-bold mb-3'>Details of your order</h1>
      <div>
        <OrderHeader orderId={orderId || ''} placed={order?.createdAt?.toDate().toLocaleDateString() || ''}/>
      </div>
    </section>
  )
}