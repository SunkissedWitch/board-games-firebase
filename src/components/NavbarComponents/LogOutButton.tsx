import { useAuthStore } from "../../contexts/AuthStore"

export const LogOutButton = () => {
  const logout = useAuthStore((store) => store.logout)
  return (
    <button role='button' className='btn btn-outline btn-primary' onClick={logout}>
      Log Out
    </button>
  )
}
