import { DocumentData, Timestamp } from 'firebase/firestore'
import { OrderCardHeader } from './OrderCardHeader'
import { OrderListItem } from './OrderListItem'

type OrderProps = {
  order: DocumentData
}

export interface IProductData {
  category: string
  price: number
  productId: string
  title: string
  photo: string
}

type OrderDataProps = {
  productData: IProductData
  productId: string
}

type DeliveryDataProps = {
  username: string
  address: string
  city: string
  courierServise: string
  postCode?: string
  postOffice?: string
  tel: string
}

interface IOrder {
  createdAt?: Timestamp
  orderData?: OrderDataProps[]
  deliveryData?: DeliveryDataProps
  orderId?: string
}

export const OrderCard = ({ order }: OrderProps) => {
  const { createdAt, orderData, deliveryData, orderId }: IOrder = order
  console.log('orderData', orderData)
  return (
    <div className='card card-bordered shadow-sm'>
      <OrderCardHeader
        username={deliveryData?.username}
        createdAt={createdAt}
        totalPrice={0}
        orderNumber={orderId}
      />
      <div className='card-body divide-y gap-0 p-0 px-2.5'>
        {orderData?.map(({ productId, productData }) => (
          <OrderListItem key={productId} data={productData} />
        ))}
      </div>
    </div>
  )
}
