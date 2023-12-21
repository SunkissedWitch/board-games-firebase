import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { formattedPrice } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'

interface CartItemProps {
  product: DocumentData
}

export const CartItem = ({ product }: CartItemProps) => {
  console.log('CartItem [product]', product)

  const { removeFromCart, changeProductQuantity } = useCart()
  const { category, productId, description: { photo, price }, title, quantity } = product
  const [currentPrice, setCurrentPrice] = useState<number>(price)
  const navigate = useNavigate()

  const add = () => changeProductQuantity(productId, quantity + 1)

  const subtract = () => {
    if (quantity > 1) return changeProductQuantity(productId, quantity - 1)
  }

  const remove = () => removeFromCart(productId)

  const showProductPage = () => navigate(`/${category}/${productId}`)

  useEffect(() => {
    setCurrentPrice(price * quantity)
  }, [quantity])

  return (
    <div className='flex flex-row flex-wrap md:flex-nowrap justify-between gap-4 p-3 border border-collapse place-items-center'>
      <div className='flex w-full grow gap-x-2 sm:gap-x-4 place-items-center cursor-pointer hover:bg-base-300 transition-colors'>
        <figure className='shrink-0'>
          <img src={photo} alt={title} className='h-8 sm:h-16'></img>
        </figure>
        <div className='grow px-2' onClick={showProductPage}>{title}</div>
      </div>
      <div className='shrink-0 px-2 ms-auto'>{quantity} pcs</div>
      <div className='shrink-0 px-2'>{formattedPrice(currentPrice)} hrn</div>
      <div className='flex gap-x-2 sm:gap-x-4 place-items-center ms-auto'>
        <div className='flex flex-row gap-x-2 justify-between place-items-center min-w-[7.5rem] shrink-0'>
          <button className='btn btn-square btn-sm shrink-0' onClick={subtract}>
            <MinusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <div className='px-2 grow text-center'>{quantity}</div>
          <button className='btn btn-square btn-sm shrink-0' onClick={add}>
            <PlusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
        <div className='shrink-0 place-center sm:ms-4'>
          <button className='btn btn-square btn-sm' onClick={remove}>
            <TrashIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
      </div>
    </div>
  )
}
