import { getDocs } from 'firebase/firestore'
import { CategoriesList, CategoriesListType } from '../components/Categories'
import { categoriesRef } from '../utils/collectionRefferences'
import { Outlet, useLoaderData } from 'react-router-dom'

export const rootLoader = async () => {
  try {
    const snap = await getDocs(categoriesRef)
    const categories = snap.docs.map(doc => doc.data() as CategoriesListType)
    return { categories }
  } catch (error) {
    console.log('error', error)
  }
}

export const Root = () => {
  const { categories } = useLoaderData() as { categories: CategoriesListType[] }

  return (
    <>
      <div className='px-5 container mx-auto'>
        <CategoriesList list={categories} />
        <Outlet />
      </div>
    </>
  )
}

