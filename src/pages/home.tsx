import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore'
import { CategoriesList } from '../components/Categories'
import { ProductsList } from '../components/Products'

export const Home = () => {
  const [productCategories, setProductCategories] = useState<DocumentData>([])
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [products, setProducts] = useState<DocumentData>([])
  console.log('products', products)
  const chooseCategory = (category: string) => {
    return setCurrentCategory(category)
  }

  const getCategories = async () => {
    try {
      const colRef = collection(db, 'categories')
      // const snap = await getDocs(colRef)
      // const categories = snap.docs.map((doc) => (doc.id))
      const snap = await getDocs(colRef)
      const categories = snap.docs.map(doc => doc.data())
      console.log('categories', categories)
      setProductCategories(categories)
    } catch (error) {
      console.log('error', error)
    }
  }
  const getProducts = async (currentCategory: string) => {
    const productsRef = collection(db, 'products')
    if (currentCategory?.length > 0) {
      const q = query(productsRef, where("category", "==", currentCategory))
      const snapshotProducts = await getDocs(q)
      const prods = snapshotProducts.docs.map(doc => doc.data())
      return setProducts(prods)
    }

    // Todo: add all products rendering
    const snapshotAllProducts = await getDocs(productsRef)
    const mappedProducts = snapshotAllProducts.docs.map(doc => doc.data())
    return setProducts(mappedProducts)
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getProducts(currentCategory)
  }, [currentCategory])

  return (
    <>
      <div className='px-5 container mx-auto'>
        <CategoriesList list={productCategories} chooseCategory={chooseCategory} active={currentCategory} />
        <ProductsList products={products} />
      </div>
    </>
  )
}

