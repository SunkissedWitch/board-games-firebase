import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../../contexts/CartStore'

interface CounterProps {
  quantity: number
  productId: string
}

export const Counter = ({ quantity, productId }: CounterProps) => {
  const changeProductQuantity = useCartStore((state) => state.changeProductQuantity)
  const add = () => changeProductQuantity(productId, quantity + 1)

  const subtract = () => {
    if (quantity > 1) return changeProductQuantity(productId, quantity - 1)
  }
  return (
    <div className='flex place-items-center'>
      <div className='flex flex-row gap-x-2 justify-between items-center w-[7.5rem] shrink-0'>
        <button className='btn btn-square btn-sm btn-ghost shrink-0' onClick={subtract}>
          <MinusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
        </button>
        <div className='px-2 grow text-center'>{quantity}</div>
        <button className='btn btn-square btn-sm btn-ghost shrink-0' onClick={add}>
          <PlusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
        </button>
      </div>
    </div>
  )
}
