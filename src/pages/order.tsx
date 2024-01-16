import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ordersRef } from '../utils/collectionRefferences'
import { OrderHeader } from '../components/OrderPage/OrderHeader'
import { IOrder } from '../components/Orders/Order'
import { DeliveryInfo } from '../components/OrderPage/DeliveryInfo'
import { OrderListItem } from '../components/Orders/OrderListItem'
import { IOrderSummary, OrderSummary } from '../components/OrderPage/OrderSummary'
import { getTotalItemPrice, getTotalPrice } from '../utils/helpers'
import { forEach, get, sum } from 'lodash'

export const OrderPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<IOrder>()

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
    shipping: 'free'
  }

  return (
    <section className='container px-5 mx-auto'>
      <h1 className='text-lg font-bold mb-3'>Details of your order</h1>
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
        <div className='flex flex-row gap-2.5 border-t'>
          <OrderSummary data={summaryData} />
          {deliveryData && <DeliveryInfo data={deliveryData}/>}
        </div>
      </div>
    </section>
  )
}