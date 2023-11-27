import { useLoaderData } from "react-router-dom"
import { db } from "../firebase"
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { formattedPrice } from "../utils/helpers"

export const getCurrentProduct = async ({ params }: any) => {
  const { productId, category } = params
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return { product: docSnap.data(), category: category }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return { product: {} , category: category || '' }
  }

}

interface IProducts { product: DocumentData, category: string }

export const ProductPage = () => {
  const { product, category } = useLoaderData() as IProducts
  console.log('product', product)
  return (
    <div className='px-5 container mx-auto'>
      {/* category {category}, product {product?.title} */}
      <div className='grid grid-cols-1 md:grid-cols-3 py-5 gap-x-5 gap-y-10 items-stretch'>
        <div className='w-96 h-96 place-self-center md:w-full md:h-full md:place-self-start'>
          <figure><img src={product?.description?.photo[0]} alt={product?.title} /></figure>
        </div>
        <div className='md:col-span-2 flex flex-col gap-y-5'>
          <h1 className='text-3xl font-semibold text-center'>{product?.title}</h1>
          <p className='text-lg font-medium text-base-content text-opacity-50'>{product?.description?.subtitle}</p>
          <div className='text-3xl font-semibold'>{formattedPrice(product?.description?.price.toString())} грн</div>
          <div>Raiting 5 stars</div>
          <div className="grid grid-cols-2 gap-5 max-w-xs mt-auto">
            <button className='btn btn-outline'>
              Add to cart
            </button>
            <button className='btn btn-primary'>
              Buy now!
            </button>
          </div>
        </div>
        <div>Components:</div>
        <div className='px-5 border-s border-primary md:col-span-2'>
          <p className='text-base font-light'>{product?.description?.mainText}</p>
        </div>
      </div>
    </div>
  )
}
