import { Link } from 'react-router-dom'
import { IProductData } from './Order'
import { formattedPrice } from '../../utils/helpers'

interface DataProps {
  data: IProductData
  quantity: number
}

export const OrderListItem = ({ data, quantity }: DataProps) => {
  const { title, category, price, photo, productId } = data
  return (
    <div className='flex flex-row gap-2.5 py-2.5'>
      <figure className='shrink-0 h-16 w-16 bg-base-300'>
        <img src={photo} alt={title} className='h-16 place-self-start' />
      </figure>
      <div className='flex flex-col gap-2.5 justify-between grow'>
        <Link
          to={`/${category}/${productId}`}
          className='font-medium hover:underline hover:underline-offset-4 max-w-max'
        >
          {title}
        </Link>
        <div className='grid grid-flow-col'>
          <div className='badge badge-ghost text-xs'>{category}</div>
          <div className='min-w-max'>
            <span className='font-medium'>Qty:</span> {quantity}
          </div>
        </div>
      </div>
      <div className='min-w-max place-self-end font-medium'>{formattedPrice(price)}</div>
    </div>
  )
}
