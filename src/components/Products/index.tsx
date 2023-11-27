import { DocumentData } from 'firebase/firestore'
import { ProductCard } from './ProductCard'

export const ProductsList = ({ products }: DocumentData) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-3 sm:mt-5'>
      {products.map((product: DocumentData) => (
        <ProductCard product={product} key={product?.productId}/>
      ))}
    </div>
  )
}
