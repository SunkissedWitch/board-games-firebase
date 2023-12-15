import { DocumentData } from "firebase/firestore"
import { CartItem } from "./CartItem"

interface CartViewProps {
  products: DocumentData[]
}

export const CartView = ({ products }: CartViewProps) => {
  return (
    <div className='px-5 container mx-auto flex flex-col'>
      {products.map((product: DocumentData) => {
        return <CartItem key={product.productId} product={product} />
      })}
    </div>
  )
}