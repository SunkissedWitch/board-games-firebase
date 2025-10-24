import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ordersRef } from "../utils/collectionRefferences"
import { OrderHeader } from "../components/OrderPage/OrderHeader"
import type { IOrder } from "../components/Orders/Order"
import { DeliveryInfo } from "../components/OrderPage/DeliveryInfo"
import { OrderListItem } from "../components/Orders/OrderListItem"
import { type IOrderSummary, OrderSummary } from "../components/OrderPage/OrderSummary"
import { getTotalItemPrice, getTotalPrice } from "../utils/helpers"
import { forEach, get, sum } from "lodash"
import { ContactInfo } from "../components/OrderPage/ContactInfo"
import { useAuthStore } from "../contexts/AuthStore"
import { doOnlinePayment } from "../components/CartView/doOnlinePayment"

export const OrderPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<IOrder | undefined>()
  const { currentUser } = useAuthStore()
  const orderRef = doc(ordersRef, orderId)

  const getOrder = async () => {
    try {
      // const orderRef = doc(ordersRef, orderId)
      const orderSnapshot = await getDoc(orderRef)
      if (orderSnapshot.exists()) {
        // console.log('[order] Document data:', orderSnapshot.data())
        setOrder(orderSnapshot.data() as IOrder)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!")
        return
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    getOrder()
  }, [])

  if (!order) return null
  const { deliveryData, createdAt, orderData, paymentData } = order

  function getOrderTotalPrice() {
    let totalArray: number[] = []
    forEach(orderData, (product) => {
      const price = get(product, ["productData", "price"], 0)
      const quantity = get(product, "quantity", 0)
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
    shipping: deliveryData?.shippingCoast || "free",
  }
  const contactInfoData = deliveryData
    ? {
        tel: deliveryData.tel,
        username: deliveryData.username,
        email: currentUser?.email || "",
      }
    : null
  console.log("orderData", orderData)

  return (
    <section className='mb-5'>
      <h1 className='text-xl font-bold mb-3 py-2.5'>Details of your order</h1>
      <div className='card card-border rounded-box bg-base-200'>
        {paymentData && (
          <>
            {paymentData.paymentMethod === "online_payment" && paymentData.paymenStatus === "pending" ? (
              <button
                className='btn btn-sm'
                onClick={() =>
                  doOnlinePayment({
                    orderRef: orderRef,
                    orderId: order.orderId,
                    orderData: orderData,
                    amount: summaryData.totalPrice,
                    callback: (result) => {
                      console.log("payment result", result)
                      if (result === "success") {
                        getOrder()
                      }
                    },
                  })
                }
              >
                Pay now
              </button>
            ) : (
              <span className='badge ms-auto'>{paymentData.paymenStatus}</span>
            )}
          </>
        )}
        <OrderHeader orderId={orderId || ""} placed={createdAt?.toDate().toLocaleDateString() || ""} />
        <div className='p-2.5 divide-y bg-base-100'>
          {orderData?.map(({ productId, productData, quantity }) => (
            <OrderListItem key={productId} data={productData} quantity={quantity} />
          ))}
        </div>
        <div className='flex flex-row flex-wrap-reverse gap-5 border-t bg-base-200 justify-items-stretch px-2.5'>
          <OrderSummary data={summaryData} />
          <div className='flex flex-row gap-5 flex-wrap grow'>
            {deliveryData && <DeliveryInfo data={deliveryData} />}
            {contactInfoData && <ContactInfo data={contactInfoData} />}
          </div>
        </div>
      </div>
    </section>
  )
}
