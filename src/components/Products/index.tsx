import { DocumentData, getDocs, query, where } from 'firebase/firestore'
import { ProductCard } from './ProductCard'
import { LoaderFunctionArgs, json, useLoaderData } from 'react-router-dom'
import { productsRef } from '../../utils/collectionRefferences'
import { CategoriesListType } from '../Categories'
import { rootLoader } from '../../pages/home'

export const productsListLoader = async ({ params }: LoaderFunctionArgs) => {
  const { category } = params
  const { categories } = await rootLoader() as { categories: CategoriesListType[]}
  const categoriesArray = categories?.map((category) => category.categoryId)
  const isInvalidCategory = category && !categoriesArray.includes(category)

  if (isInvalidCategory) {
    throw json({
      message: "No such category found.",
    },
    { status: 404 })
  }

  if (category && category?.length > 0) {
    const q = query(productsRef, where('category', '==', category))
    const snapshotProducts = await getDocs(q)
    const prods = snapshotProducts?.docs?.map((doc) => doc.data())
    return { products: prods }
  }
}

export const allProductsLoader = async () => {
  const snapshotAllProducts = await getDocs(productsRef)
  const mappedProducts =
    snapshotAllProducts?.docs?.map((doc) => doc.data()) || []
  return { products: mappedProducts }
}

export const ProductsList = () => {
  const { products } = useLoaderData() as DocumentData

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-3 sm:mt-5'>
      {products?.map((product: DocumentData) => (
        <ProductCard product={product} key={product?.productId} />
      ))}
    </div>
  )
}
