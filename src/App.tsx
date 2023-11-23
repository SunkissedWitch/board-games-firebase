import { useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { CategoriesList } from './components/Categories'

function App() {
  const [productCategories, setProductCategories] = useState<string[]>([])

  const getCategories = async () => {
    try {
      const colRef = collection(db, 'categories')
      // const snap = await getDocs(colRef)
      // const categories = snap.docs.map((doc) => (doc.id))
      const snap = await getDocs(colRef)
      const categories = snap.docs.map(doc => doc.get('title'))
      setProductCategories(categories)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div className='navbar bg-base-200 px-4'>
        <button className="btn btn-square btn-ghost btn-lg">
          Logo
        </button>
      </div>
      <main className='flex flex-col'>
        <CategoriesList list={productCategories} />
      </main>
    </>
  )
}

export default App
