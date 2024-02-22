import { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from './contexts/AuthStore'
import { useCartStore } from './contexts/CartStore'
import { getCartData } from './firebaseApi/CartApi'

export const RootLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const goToLoginPage = () => navigate('/login')
  const goToSignUpPage = () => navigate('/signup')
  const goToHomePage = () => navigate('/')
  const goToCart = () => navigate('/cart')
  const currentUser = useAuthStore((store) => store.currentUser)
  const logout = useAuthStore((store) => store.logout)
  const totalItems = useCartStore((store) => store.totalItems)
  const { pathname } = useLocation()

  useEffect(() => {
    getCartData()
  }, [currentUser?.uid])

  return (
    <>
      <div className='navbar bg-base-200 px-4 justify-center'>
        <div className='container justify-between gap-5 px-2'>
          <button className='btn btn-square btn-ghost btn-lg' onClick={goToHomePage}>Logo</button>
          {currentUser?.email && (
            <div className='flex flex-row justify-end items-center gap-2.5 px-2 grow'>
              <Link to='/account' className='max-w-[3rem] sm:max-w-full truncate'>{currentUser?.displayName || currentUser?.email}</Link>
              <button className='btn btn-outline btn-primary btn-sm sm:btn-md' onClick={logout}>
                Log Out
              </button>
            </div>
          )}
          {!currentUser && (
            <div className='flex flex-row justify-end items-center gap-2.5 px-2 grow'>
              {pathname !== '/signup' && (
                <button
                  className='btn btn-outline btn-primary btn-sm sm:btn-md'
                  onClick={goToSignUpPage}
                >
                  Sign Up
                </button>
              )}
              {pathname !== '/login' && (
                <button className='btn btn-primary btn-sm sm:btn-md' onClick={goToLoginPage}>
                  Login
                </button>
              )}
            </div>
          )}
          <div className="indicator">
            <span className="indicator-item badge badge-primary rounded-full">{totalItems}</span> 
            <button className="btn btn-square rounded-xl btn-outline btn-sm sm:btn-md" onClick={goToCart}>
              <ShoppingCartIcon className='w-5 h-5 sm:w-7 sm:h-7' />
            </button> 
          </div>
          {/* <CartButton /> */}
        </div>
      </div>
      <main className='flex flex-col grow'>{<Outlet /> || children}</main>
    </>
  )
}
