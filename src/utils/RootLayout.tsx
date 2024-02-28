import { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../contexts/AuthStore'
import { useCartStore } from '../contexts/CartStore'
import { getCartData } from '../firebaseApi/CartApi'
import { CartButton } from '../components/NavbarComponents/CartButton'
import { SignUpButton } from '../components/NavbarComponents/SignUpButton'
import { LoginButton } from '../components/NavbarComponents/LoginButton'
import { UserMenu } from '../components/NavbarComponents/UserMenu'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export const RootLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const goToHomePage = () => navigate('/')
  const currentUser = useAuthStore((store) => store.currentUser)
  const uid = useAuthStore((store) => store.currentUser?.uid)
  const totalItems = useCartStore((store) => store.totalItems)
  const { pathname } = useLocation()

  useEffect(() => {
    getCartData()
  }, [uid])

  return (
    <>
      <div className='navbar bg-base-200 px-4 justify-center'>
        <div className='container justify-between gap-5 px-2'>
          <div className='flex-1'>
            <button className='btn btn-square btn-ghost sm:btn-lg' onClick={goToHomePage}>Logo</button>
          </div>
          <div className='flex-none flex flex-row justify-end items-center gap-2.5 px-2'>
            {!currentUser && (
              <>
                { pathname !== '/signup' && <SignUpButton /> }
                { pathname !== '/login' && <LoginButton /> }
              </>
            )}
            { currentUser?.email && <UserMenu /> }
            <CartButton totalItems={totalItems} />
          </div>
        </div>
      </div>
      <main className='flex flex-col grow'>{<Outlet /> || children}</main>
    </>
  )
}
