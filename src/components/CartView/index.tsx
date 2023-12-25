import { DocumentData } from "firebase/firestore"
import { CartItem } from "./CartItem"
import { TotalPrice } from "./TotalPrice"
import { useCart } from "../../contexts/CartContext"
import { forEach } from "lodash"
import { Dispatch, SetStateAction } from "react"
import { AddressForm } from "./AddressForm"

interface CartViewProps {
  products: DocumentData[]
  setIsSubmited: Dispatch<SetStateAction<boolean>>
}

export const CartView = ({ products, setIsSubmited }: CartViewProps) => {
  const { clearCart, totalItems, products: cartState } = useCart()

  const getTotalPrice = () => {
    let sum = 0
    forEach(products, (product) => {
      const productTotal = product.quantity * product.description.price
      return sum = productTotal + sum
    })
    return sum
  }
  const createOrder = async () => {
    console.log('order', cartState, products)
    setIsSubmited(true)
  }

  const totalPrice = getTotalPrice()

  if (products?.length === 0) {
    return(
      <div className='p-5 border bg-secondary text-secondary-content text-center'>Cart is empty. Add something {';)'}</div>
    )
  }

  return (
    <div className='px-2.5 sm:px-5 py-5 container mx-auto grid grid-cols-3 gap-5 items-start'>
      <div className='flex flex-col gap-2.5 grow col-span-full lg:col-span-2'>
        <div className='text-xl font-bold px-2.5'>Your order:</div>
        <button type='button' className='btn btn-outline btn-sm w-32 ms-auto' onClick={clearCart}>Clear cart</button>
        {products.map((product: DocumentData) => {
          return <CartItem key={product.productId} product={product} />
        })}
      </div>
      <div className='flex flex-col gap-5 bg-slate-100 border p-5 col-span-full lg:col-span-1 lg:mt-20'>
        <TotalPrice totalPrice={totalPrice} totalItems={totalItems}/>
        <div className='grid grid-cols-2 py-2.5'>
          <button className='btn btn-primary col-span-full sm:col-span-1 lg:col-span-full sm:col-start-2 lg:col-start-0' onClick={createOrder}>Create order</button>
        </div>
      </div>
      <div className='col-span-full'>
        <AddressForm />
      </div>
    </div>
  )
}