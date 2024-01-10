import { DocumentData, Timestamp } from 'firebase/firestore'
import { formattedPrice } from '../../utils/helpers'

type OrderProps = {
  order: DocumentData
}

interface IProductData {
  category: string
  price: number
  productId: string
  title: string
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

interface IOrderHeader {
  createdAt?: Timestamp
  username?: string
  totalPrice?: number
  orderNumber?: string
}

export const OrderHeader = ({
  createdAt,
  username,
  totalPrice,
  orderNumber
}: IOrderHeader) => {
  return (
    <div className='flex flex-row items-center gap-2.5 bg-base-300 p-2.5'>
      <div className='flex flex-col gap-2.5'>
        <div className='font-medium'>Order placed:</div>
        <div>{createdAt?.toDate().toLocaleDateString()}</div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <div className='font-medium'>Total:</div>
        <div>{formattedPrice(totalPrice)} uah</div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <div className='font-medium'>Deliver to:</div>
        <div>{username}</div>
      </div>
      <div className='flex flex-col gap-2.5 ms-auto'>
        <div className='font-medium'>Order number: <span className='text-neutral-500'>{orderNumber}</span></div>

      </div>
    </div>
  )
}

export const Order = ({ order }: OrderProps) => {
  const { createdAt, orderData, deliveryData, orderId }: IOrder = order
  console.log('orderData', orderData)
  return (
    <div className='card card-compact card-bordered shadow-sm'>
      <OrderHeader
        username={deliveryData?.username}
        createdAt={createdAt}
        totalPrice={0}
        orderNumber={orderId}
      />
      <div className='card-body'>
        {orderData?.map(({ productId, productData }) => (
          <div key={productId} className='flex flex-row gap-2.5'>
            <div className='font-medium grow'>{productData.title}</div>
            <div className=''>{productData.category}</div>
            <div className=''>{productData.price} uah</div>
          </div>
        ))}
      </div>
    </div>
  )
}
