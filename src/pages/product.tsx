import { Params, json, useLoaderData } from "react-router-dom"
import { db } from "../firebase"
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { formattedPrice } from "../utils/helpers"
import { useCart } from "../contexts/CartContext"
import { StaticRatingComponent } from "../components/RatingComponent/StaticRating"
import { ProductDetails } from "../components/ProductPage/ProductDetails"

export const getCurrentProduct = async ({ params }: { params: Params }) => {
  const { productId, category } = params
  if (!productId) {
    // -- imposible variant --
    console.log('No productId', productId)
    return
  }

  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  console.log('docRef', docRef.id)

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return { product: docSnap.data(), category: category, docId: docRef.id }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    throw json(
      '',
      { status: 404 }
    )
  }
}

interface IProducts { product: DocumentData, category: string, docId: string }

export const ProductPage = () => {
  const { product, category, docId } = useLoaderData() as IProducts
  const { addToCart } = useCart()
  const addToCartHelper = () => {
    console.log(docId)
    addToCart(docId, product)
  }
  console.log('product', product, category)
  return (
    <div className='px-5 container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-[1fr,_2fr] py-5 gap-x-5 gap-y-10 items-stretch'>
        <div className='w-96 h-96 place-self-center md:w-full md:h-full md:place-self-start overflow-clip'>
          <figure><img src={product?.description?.photo[0]} alt={product?.title} /></figure>
        </div>
        <div className='flex flex-col gap-y-5'>
          <h1 className='text-3xl font-semibold text-center'>{product?.title}</h1>
          <p className='text-lg font-medium text-base-content text-opacity-50'>{product?.description?.subtitle}</p>
          <div className='text-3xl font-semibold'>{formattedPrice(product?.description?.price)}</div>
          <div>
            <StaticRatingComponent rating={3} />
          </div>
          <div className="grid grid-cols-2 gap-5 max-w-xs mt-auto">
            <button className='btn btn-outline' onClick={addToCartHelper}>
              Add to cart
            </button>
          </div>
        </div>
        <aside>
          <ProductDetails product={product} category={category} />
        </aside>
        <div className='px-5 md:border-s border-primary'>
          <p className='text-base font-light'>{product?.description?.mainText}</p>
        </div>
      </div>
    </div>
  )
}
