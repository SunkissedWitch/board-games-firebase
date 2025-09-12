import { getCountFromServer, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ordersRef } from "../../utils/collectionRefferences"
import { useAuthStore } from "../../contexts/AuthStore"

export const OrdersCard = () => {
  const uid = useAuthStore((store) => store.currentUser?.uid)
  const [qtyOrders, setQtyOrders] = useState<number>(0)
  const navigate = useNavigate()
  const goToOrders = () => navigate('/orders')

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
    <div className="card bg-base-100 shadow-xl card-compact md:card-normal">
      <div className="card-body">
        <h2 className="card-title">Previous orders</h2>
        <p>You have {qtyOrders} order(s) for now</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-block sm:btn-wide" onClick={goToOrders}>See orders</button>
        </div>
      </div>
    </div>
  )
}