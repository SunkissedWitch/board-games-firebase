import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../contexts/AuthStore"
import { OrdersCard } from "../components/AccountCards/OrdersCard"
import { AdressesCard } from "../components/AccountCards/AdressesCard"

export const AccountPage = () => {
  const email = useAuthStore((store) => store.currentUser?.email)
  const displayName = useAuthStore((store) => store.currentUser?.displayName)
  const photoURL = useAuthStore((store) => store.currentUser?.photoURL || null)
  const profileName = displayName || email || 'U'

  const navigate = useNavigate()
  const goToSettings = () => navigate('/account/settings')

  return (
    <div className="flex flex-col grow gap-y-3">
      <h1 className='text-xl md:text-3xl font-semibold'>Account page</h1>
      <div className="card md:card-side bg-base-100 shadow-xl card-compact md:card-normal">
        <div className="avatar placeholder border-b md:border-none">
          {photoURL
          ? <figure className="md:w-64 md:aspect-square mx-auto max-h-64"><img src={photoURL} alt="user_avatar"/></figure>
          : <div className="bg-neutral text-neutral-content max-h-64 w-full md:w-64 mx-auto">
              <span className="text-3xl">{profileName[0].toUpperCase()}</span>
            </div>
            }
        </div>
        <div className="card-body">
          <h2 className="card-title">Hello, <b>{displayName || email}</b></h2>
          <div className="grid grid-cols-[1fr,_2fr] gap-x-5 gap-y-2.5 pt-5 mb-2.5">
            <p>Email</p>
            <p>{email}</p>
            <p>Display Name</p>
            <p>{displayName}</p>
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-primary btn-block sm:btn-wide" onClick={goToSettings}>Edit profile</button>
          </div>
        </div>
      </div>
      <OrdersCard />
      <AdressesCard />
    </div>
  )
}
