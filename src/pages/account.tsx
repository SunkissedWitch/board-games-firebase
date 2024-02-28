import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../contexts/AuthStore"

export const AccountPage = () => {
  const currentUser = useAuthStore((store) => store.currentUser)
  const photoURL = useAuthStore((store) => store.currentUser?.photoURL || null)
  const profileName = currentUser?.displayName || currentUser?.email || 'U'
  const navigate = useNavigate()
  const goToSettings = () => navigate('/account/settings')
  console.log('currentUser', currentUser)
  return (
    <div className="flex flex-col grow">
      {/* <h1 className='text-xl md:text-3xl'>Wellcome, <b>{currentUser?.displayName || currentUser?.email}</b></h1> */}
      <div className="card lg:card-side bg-base-100 shadow-xl">
        {photoURL && <figure><img src={photoURL} alt="user_avatar"/></figure>}
        <div className="card-body">
          <h2 className="card-title">Wellcome, <b>{currentUser?.displayName || currentUser?.email}</b></h2>
          <div className="grid grid-cols-3 gap-x-5">
            <div>Email</div>
            <div className="col-span-2">
              <p>{currentUser?.email}</p>
            </div>
            <div>Display Name</div>
            <div className="col-span-2">
              <p>{currentUser?.displayName}</p>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={goToSettings}>Edit profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}
