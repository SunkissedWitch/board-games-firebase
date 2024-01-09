import { DocumentData, Timestamp } from "firebase/firestore"

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

interface IOrder {
  createdAt?: Timestamp
  orderData?: OrderDataProps[]
}

export const Order = ({ order }: OrderProps) => {
  const { createdAt, orderData }: IOrder = order
  console.log('orderData', orderData)
  return (
    <div className='card card-compact card-bordered shadow-sm'>
      <div className='card-title p-2.5'>
        Created: <span className='font-normal'>{createdAt?.toDate().toDateString()}</span>
      </div>
      <div className='card-body'>
        {orderData?.map(({ productId, productData }) => (
          <div key={productId} className='flex flex-row gap-2.5'>
            <div className='font-medium grow'>
              {productData.title}
            </div>
            <div className=''>
              {productData.category}
            </div>
            <div className=''>
              {productData.price} uah
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}