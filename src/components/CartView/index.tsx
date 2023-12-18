import { DocumentData } from "firebase/firestore"
import { CartItem } from "./CartItem"
import { useCart } from "../../contexts/CartContext"

interface CartViewProps {
  products: DocumentData[]
}

export const CartView = ({ products }: CartViewProps) => {
  const { clearCart } = useCart()
  // ToDo: find the right way to set total price
  // const totalPrice = 10000
  if (products?.length === 0) {
    return(
      <div className='p-5 border bg-secondary text-secondary-content text-center'>Cart is empty. Add something {';)'}</div>
    )
  }

  return (
    <div className='px-2.5 sm:px-5 py-5 container mx-auto flex flex-col gap-2.5'>
      <div className='text-xl font-bold px-2.5'>Your order:</div>
      <button type='button' className='btn btn-outline btn-sm w-32 ms-auto' onClick={clearCart}>Clear cart</button>
      {products.map((product: DocumentData) => {
        return <CartItem key={product.productId} product={product} />
      })}
      {/* <div className='flex flex-row justify-between items-baseline gap-5'>
        <div>Total:</div>
        <div>{totalPrice}</div>
      </div> */}
    </div>
  )
}