import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../contexts/AuthStore"
import { useEffect, useState } from "react"
import { ordersRef } from "../utils/collectionRefferences"
import { getCountFromServer, query, where } from "firebase/firestore"
import { PlusIcon } from "@heroicons/react/24/solid"

export const AccountPage = () => {
  const currentUser = useAuthStore((store) => store.currentUser)
  const uid = useAuthStore((store) => store.currentUser?.uid)
  const photoURL = useAuthStore((store) => store.currentUser?.photoURL || null)
  const profileName = currentUser?.displayName || currentUser?.email || 'U'
  const [qtyOrders, setQtyOrders] = useState<number>(0)

  const navigate = useNavigate()
  const goToSettings = () => navigate('/account/settings')
  const goToOrders = () => navigate('/orders')

  console.log('currentUser', currentUser)

  const getOrders = async () => {
    try {
      const q = query(ordersRef, where('userUID', '==', uid))
      const snapshot = await getCountFromServer(q)
      setQtyOrders(snapshot.data().count)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="flex flex-col grow gap-y-3">
      <h1 className='text-xl md:text-3xl font-semibold'>Account page</h1>
      <div className="card md:card-side bg-base-100 shadow-xl card-compact md:card-normal">
        {/* {photoURL && <figure><img src={photoURL} alt="user_avatar"/></figure>} */}
        <div className="avatar placeholder bg-neutral">
          <div className="bg-neutral text-neutral-content w-64 mx-auto">
            <span className="text-3xl">{profileName[0].toUpperCase()}</span>
          </div>
          {photoURL && <figure><img src={photoURL} alt="user_avatar"/></figure>}
        </div>
        <div className="card-body">
          <h2 className="card-title">Hello, <b>{currentUser?.displayName || currentUser?.email}</b></h2>
          <div className="grid grid-cols-[1fr,_2fr] gap-x-5 gap-y-2.5 pt-5">
            <p>Email</p>
            <p>{currentUser?.email}</p>
            <p>Display Name</p>
            <p>{currentUser?.displayName}</p>
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-primary btn-block sm:btn-wide" onClick={goToSettings}>Edit profile</button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl card-compact md:card-normal">
        <div className="card-body">
          <h2 className="card-title">Previous orders</h2>
          <p>You have {qtyOrders} order(s) for now</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-block sm:btn-wide" onClick={goToOrders}>See orders</button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl card-compact md:card-normal">
        <div className="card-body">
          <h2 className="card-title">Addresses</h2>
          <p>Your list</p> {/* -- add new functionality with list of addresses -- */}
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-square" onClick={goToOrders}>
              <PlusIcon className='w-7' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
