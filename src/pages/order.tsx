import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ordersRef } from '../utils/collectionRefferences'
import { OrderHeader } from '../components/OrderPage/OrderHeader'
import { IOrder } from '../components/Orders/Order'
import { DeliveryInfo } from '../components/OrderPage/DeliveryInfo'
import { OrderListItem } from '../components/Orders/OrderListItem'
import { IOrderSummary, OrderSummary } from '../components/OrderPage/OrderSummary'
import { getTotalItemPrice, getTotalPrice } from '../utils/helpers'
import { forEach, get, sum } from 'lodash'
import { ContactInfo } from '../components/OrderPage/ContactInfo'
import { useAuth } from '../contexts/AuthContext'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

export const OrderPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<IOrder>()
  const { currentUser } = useAuth()

  const getOrder = async () => {
    try {
      const orderRef = doc(ordersRef, orderId)
      const orderSnapshot = await getDoc(orderRef)
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

  if (!order) return null
  const { deliveryData, createdAt, orderData } = order
  console.log('orderData', orderData)

  function getOrderTotalPrice () {
    let totalArray: number[] = []
    forEach(orderData, (product) => {
      const price = get(product, ['productData', 'price'], 0)
      const quantity = get(product, 'quantity', 0)
      const total = getTotalItemPrice(price, quantity)
      totalArray.push(total)
    })
    return getTotalPrice(totalArray)
  }
  function getTotalItems() {
    const qtyArray = orderData?.map((order) => order.quantity)
    return sum(qtyArray)
  }
  const summaryData: IOrderSummary = {
    totalItems: getTotalItems(),
    totalPrice: getOrderTotalPrice(),
    discount: null,
    shipping: deliveryData?.shippingCoast || 'free'
  }
  const contactInfoData = deliveryData
  ? {
      tel: deliveryData.tel,
      username: deliveryData.username,
      email: currentUser?.email || ''
    }
  : null

  return (
    <section className='container px-5 mx-auto mb-5'>
      <div className='py-2.5'>
        <Link to='/orders' className='link link-primary underline-offset-4 flex gap-1 text-xl'>
          <ChevronLeftIcon width={20} />Orders
        </Link>
      </div>
      <h1 className='text-xl font-bold mb-3 py-2.5'>Details of your order</h1>
      <div className='border rounded-box'>
        <OrderHeader orderId={orderId || ''} placed={createdAt?.toDate().toLocaleDateString() || ''}/>
        <div className='p-2.5 divide-y'>
          {orderData?.map(({ productId, productData, quantity }) => (
            <OrderListItem
              key={productId}
              data={productData}
              quantity={quantity}
              />
          ))}
        </div>
        <div className='flex flex-row flex-wrap-reverse gap-5 border-t bg-base-200 justify-items-stretch px-2.5'>
          <OrderSummary data={summaryData} />
          <div className='flex flex-row gap-5 flex-wrap grow'>
            {deliveryData && <DeliveryInfo data={deliveryData}/>}
            {contactInfoData && <ContactInfo data={contactInfoData} />}
          </div>
        </div>
      </div>
    </section>
  )
}