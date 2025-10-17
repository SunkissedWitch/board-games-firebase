import { type DocumentData, Timestamp } from "firebase/firestore"
import { OrderCardHeader } from "./OrderCardHeader"
import { OrderListItem } from "./OrderListItem"
import { getTotalItemPrice, getTotalPrice } from "../../utils/helpers"
import type { DeliveryProps } from "../CartView/AddressForm"
import type { CartProductType } from "../../firebaseApi/CartApi"

type OrderProps = {
  order: DocumentData & IOrder
}

export interface IProductData extends DocumentData {
  category: string
  price: number
  productId: string
  title: string
  photo: string | string[]
  description?: string
}

export interface DeliveryDataProps extends DeliveryProps {
  shippingCoast?: number | "free"
}
export interface IPaymentData {
  paymenStatus: string
  paymentMethod: string
}

export interface IOrder {
  createdAt: Timestamp
  orderData: CartProductType[]
  deliveryData: DeliveryDataProps
  orderId: string
  paymentData?: IPaymentData
  userUID?: string
}

export const OrderCard = ({ order }: OrderProps) => {
  const { createdAt, orderData, deliveryData, orderId, paymentData }: IOrder = order
  console.log("order", paymentData, orderData)
  const pricesArray: number[] = orderData?.map((order: CartProductType) =>
    getTotalItemPrice(order.productData.price, order.quantity)
  ) as number[]
  const totalPrice = getTotalPrice(pricesArray)
  return (
    <div className='card card-border shadow-xs'>
      <OrderCardHeader
        username={deliveryData?.username}
        createdAt={createdAt}
        totalPrice={totalPrice}
        orderNumber={orderId}
        paymentData={paymentData}
      />
      <div className='card-body divide-y gap-0 p-0 px-2.5'>
        {orderData?.map(({ productId, productData, quantity }) => (
          <OrderListItem key={productId} data={productData} quantity={quantity} />
        ))}
      </div>
    </div>
  )
}
