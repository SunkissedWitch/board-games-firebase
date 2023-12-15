import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { DocumentData } from "firebase/firestore"
import { useState } from "react"

interface CartItemProps {
  product: DocumentData
}

export const CartItem = ({ product }: CartItemProps) => {
  const [amount, setAmount] = useState<number>(1)
  const add = () => setAmount((prevState) => prevState + 1)
  const subtract = () => {
    if (amount > 1) {
      return setAmount(amount - 1)
    }
  }
  return (
    // <div className='grid grid-flow-row grid-cols-6 gap-4 p-3 border-b-2'>
    <div className='flex flex-row flex-wrap sm:flex-nowrap justify-between gap-4 p-3 border-b-2 place-items-center'>
      <div className='flex grow gap-x-2 sm:gap-x-4 place-items-center'>
        <figure className='shrink-0'>
          <img src={product.description.photo} alt={product.title} className='h-8 sm:h-16'>
          </img>
        </figure>
        <div className='grow px-2 truncate'>
          {product.title}
        </div>
      </div>
      <div className='shrink-0 place-center px-2'>
        {product.description.price} hrn
      </div>
      <div className='flex gap-x-2 sm:gap-x-4 place-items-center'>  
        <div className='flex flex-row gap-x-2 justify-between place-items-center min-w-[7.5rem] shrink-0'>
        {/* <div className='grid grid-flow-col gap-x-2 justify-between'> */}
          <button className='btn btn-square btn-sm shrink-0' onClick={subtract}>
            <MinusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <div className='px-2 grow text-center'>{amount}</div>
          <button className='btn btn-square btn-sm shrink-0' onClick={add}>
            <PlusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
        <div className='shrink-0 place-center sm:ms-4'>
          <button className='btn btn-square btn-sm'>
            <TrashIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
      </div>
    </div> 
  )
}