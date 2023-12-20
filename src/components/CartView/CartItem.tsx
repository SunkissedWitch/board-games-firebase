import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCart } from "../../contexts/CartContext"

interface CartItemProps {
  product: DocumentData
}

export const CartItem = ({ product }: CartItemProps) => {
  const { removeFromCart, changeProductQuantity, getProductQuantity } = useCart()
  const amount = getProductQuantity(product?.productId)
  // const [amount, setAmount] = useState<number>(getProductQuantity(product?.productId))
  const price = product?.description?.price || 0
  const [currentPrice, setCurrentPrice] = useState<number>(price)
  console.log('CartItem [product]', product)

  const add = () => {
    // setAmount((prevState) => prevState + 1)
    return changeProductQuantity(product.productId, amount + 1)
  }
  const subtract = () => {
    if (amount > 1) {
      // setAmount(amount - 1)
      return changeProductQuantity(product.productId, amount - 1)
    }
  }
  const remove = () => {
    console.log(product?.productId)
    removeFromCart(product?.productId)
  }

  useEffect(() => {
    setCurrentPrice(product.description.price * amount)
  }, [amount])

  return (
    <div className='flex flex-row flex-wrap md:flex-nowrap justify-between gap-4 p-3 border border-collapse place-items-center'>
      <div className='flex w-full grow gap-x-2 sm:gap-x-4 place-items-center'>
        <figure className='shrink-0'>
          <img src={product.description.photo} alt={product.title} className='h-8 sm:h-16'>
          </img>
        </figure>
        <div className='grow px-2'>
          {product.title}
        </div>
      </div>
      <div className='shrink-0 px-2 ms-auto'>
        {currentPrice} hrn
      </div>
      <div className='flex gap-x-2 sm:gap-x-4 place-items-center'>  
        <div className='flex flex-row gap-x-2 justify-between place-items-center min-w-[7.5rem] shrink-0'>
          <button className='btn btn-square btn-sm shrink-0' onClick={subtract}>
            <MinusIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
          <div className='px-2 grow text-center'>{amount}</div>
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