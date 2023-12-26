import { DocumentData, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { CartItem } from "./CartItem"
import { TotalPrice } from "./TotalPrice"
import { useCart } from "../../contexts/CartContext"
import { forEach } from "lodash"
import { useState } from "react"
import { AddressForm, AddressInputsProps } from "./AddressForm"
import { ordersRef } from "../../utils/collectionRefferences"
import { useAuth } from "../../contexts/AuthContext"

interface CartViewProps {
  products: DocumentData[]
}

export const CartView = ({ products }: CartViewProps) => {
  const { clearCart, totalItems, products: cartState } = useCart()
  const { currentUser } = useAuth()
  const [isSubmited, setIsSubmited] = useState(false)
  const [delivery, setDelivery] = useState<AddressInputsProps | null>(null)

  const getTotalPrice = () => {
    let sum = 0
    forEach(products, (product) => {
      const productTotal = product?.quantity * product?.description?.price
      return sum = productTotal + sum
    })
    return sum
  }

  const onSubmitAddress = (values: AddressInputsProps) => {
    setDelivery(values)
    setIsSubmited(true)
  }

  const createOrder = async () => {
    const docData = {
      orderData: cartState,
      deliveryData: delivery,
      userUID: currentUser?.uid,
      createdAt: serverTimestamp()
    }
    console.log('order', docData)
    try {
      const create = await setDoc(doc(ordersRef), docData)
      console.log('create', create)
    } catch (error) {
      console.log('error', error)
    }

  }

  const totalPrice = getTotalPrice()

  if (products?.length === 0) {
    return(
      <div className='p-5 border bg-secondary text-secondary-content text-center'>Cart is empty. Add something {';)'}</div>
    )
  }

  return (
    <div className='px-2.5 sm:px-5 py-5 container mx-auto grid grid-cols-3 gap-5 items-start'>
      <div className='flex flex-col gap-2.5 lg:gap-5 grow col-span-full lg:col-span-2'>
        <div className='text-xl font-bold px-2.5'>Your order:</div>
        <button type='button' className='btn btn-outline btn-sm w-32 ms-auto' onClick={clearCart}>Clear cart</button>
        {products.map((product: DocumentData) => {
          return <CartItem key={product.productId} product={product} />
        })}
        <AddressForm onSubmit={onSubmitAddress} />
      </div>
      <div className='card card-bordered shadow-lg gap-5 p-5 col-span-full lg:col-span-1 lg:mt-12 bg-slate-50'>
        <TotalPrice totalPrice={totalPrice} totalItems={totalItems} />
        <div className='grid grid-cols-2 gap-10 px-5 py-2.5'>
          <button
            className='btn btn-primary col-span-full sm:col-span-1 lg:col-span-full sm:col-start-2 lg:col-start-0'
            onClick={createOrder}
            disabled={!isSubmited}
          >
            Create order
          </button>
        </div>
      </div>
    </div>
  )
}