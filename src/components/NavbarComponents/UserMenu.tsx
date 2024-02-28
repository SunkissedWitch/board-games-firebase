import { Link } from "react-router-dom"
import { LogOutButton } from "./LogOutButton"
import { useAuthStore } from "../../contexts/AuthStore"

export const UserMenu = () => {
  // const currentUser = useAuthStore((store) => store.currentUser)
  const profileName = useAuthStore((store) => store.currentUser?.displayName || store.currentUser?.email || 'User')
  const photoURL = useAuthStore((store) => store.currentUser?.photoURL || false)
  const handleClick = () => {
    const elem = document.activeElement
    if (elem instanceof HTMLElement) {
      elem?.blur();
    }
  };

  return (
    <div className='flex-none'>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder btn-sm sm:btn-md">
          { photoURL
          ? <div className="w-12 rounded-full">
              <img alt={profileName} src={photoURL} />
            </div>
          : 
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span className="text-lg sm:text-2xl">{profileName[0].toUpperCase()}</span>
            </div>
          }
        </div>
        <ul tabIndex={0} className="menu dropdown-content z-[1] shadow bg-base-100 min-w-[208px] rounded-box mt-4 gap-y-2">
          <li className="menu-title">{profileName}</li>
          <li onClick={handleClick}>
            <Link to='/account'>
              Account page
            </Link>
          </li>
          <LogOutButton />
        </ul>
      </div>
    </div>
  )
}
