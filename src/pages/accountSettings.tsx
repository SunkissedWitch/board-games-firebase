import { UpdateProfileForm } from '../components/UpdateProfileForm'
import { useAuthStore } from '../contexts/AuthStore'

export interface IProfileFormProps {
  displayName?: string
  photoURL?: string
}

export const AccountSettings = () => {
  const profileName = useAuthStore((store) => store.currentUser?.displayName || store.currentUser?.email)
  const uid = useAuthStore((store) => store.currentUser?.uid)

  const updateUserProfile = useAuthStore(
    (store) => store.updateUserProfile
  )

  const setNewData = async (data: IProfileFormProps) => {
    if (uid) {
      updateUserProfile(data)
    }
  }

  return (
    <div className='flex flex-col grow'>
      <h1 className='text-xl md:text-3xl font-semibold mb-2.5 py-2.5'>Account settings</h1>
      <div className='card shadow-xl bg-neutral-200'>
        <div className='card-body'>
        <div className='card-title'>{profileName}</div>
          <UpdateProfileForm setNewData={setNewData} />
        </div>
      </div>
    </div>
  )
}
