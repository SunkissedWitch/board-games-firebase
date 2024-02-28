import { useAuthStore } from "../contexts/AuthStore"
import { useState } from "react"

export const AccountSettings = () => {
  const profileName = useAuthStore((store) => store.currentUser?.displayName || store.currentUser?.email)
  const uid = useAuthStore((store) => store.currentUser?.uid)
  const [newName, setNewName] = useState<string>('')
  const updateUserDisplayName = useAuthStore((store) => store.updateUserDisplayName)

  const setName = async () => {
    if (uid) {
      updateUserDisplayName(newName)
      setNewName('')
    }
  }
  return (
    <div className="flex flex-col grow">
      Account settings
      <p>{profileName}</p>
      <div className='self-center'>
        <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} className='input input-bordered input-primary' />
        <button onClick={setName} className='btn btn-outline btn-primary'>
          set name
        </button>
      </div>
    </div>
  )
}
