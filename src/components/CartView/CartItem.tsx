import { XMarkIcon } from '@heroicons/react/24/outline'
import { DocumentData } from 'firebase/firestore'
import { useCart } from '../../contexts/CartContext'
import { formattedPrice } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'
import { Counter } from './Counter'

interface CartItemProps {
  product: DocumentData
}

export const CartItem = ({ product }: CartItemProps) => {
  const { removeFromCart } = useCart()
  const { category, productId, description: { photo, price }, title, quantity } = product
  const navigate = useNavigate()
  const remove = () => removeFromCart(productId)
  const showProductPage = () => navigate(`/${category}/${productId}`)

  return (
    <div className='flex flex-row flex-nowrap gap-x-3 p-3 card card-bordered shadow-lg'>
      <figure className='shrink-0'>
        <img src={photo} alt={title} className='h-16'></img>
      </figure>
      <div className='grow flex flex-row w-full justify-between gap-2.5'>
        <div className='flex flex-col md:flex-row gap-2.5 grow'>
          <div
            className='flex flex-col gap-2 grow group transition-colors cursor-pointer'
            onClick={showProductPage}
          >
            <div className='group-hover:underline group-hover:underline-offset-4 text-lg'>
              {title}
            </div>
            <div className='font-bold'>{formattedPrice(price)} hrn</div>
          </div>
          <Counter quantity={quantity} productId={productId} />
        </div>
        <div className='flex flex-col justify-between md:flex-row-reverse md:justify-normal gap-5 min-w-[25%]'>
          <button
            className='btn btn-square btn-ghost btn-sm self-end md:self-start'
            onClick={remove}
          >
            <XMarkIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <div className='font-medium text-end md:place-self-center'>
            {formattedPrice(price * quantity)} hrn
          </div>
        </div>
      </div>
    </div>
  )
}
