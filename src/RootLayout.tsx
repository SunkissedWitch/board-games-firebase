import { PropsWithChildren } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useCart } from './contexts/CartContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export const RootLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const goToLoginPage = () => navigate('/login')
  const goToSignUpPage = () => navigate('/signup')
  const goToHomePage = () => navigate('/')
  const { currentUser, logout } = useAuth()
  const { products } = useCart()
  const { pathname } = useLocation()

  return (
    <>
      <div className='navbar bg-base-200 px-4 justify-center'>
        <div className='container justify-between gap-5 px-2'>
          <button className='btn btn-square btn-ghost btn-lg' onClick={goToHomePage}>Logo</button>
          {currentUser?.email && (
            <div className='flex flex-row justify-end items-center gap-2.5 px-2 grow'>
              <div>{currentUser?.displayName || currentUser?.email}</div>
              <button className='btn btn-outline btn-primary' onClick={logout}>
                Log Out
              </button>
            </div>
          )}
          {!currentUser && (
            <div className='flex flex-row justify-end items-center gap-2.5 px-2 grow'>
              {pathname !== '/signup' && (
                <button
                  className='btn btn-outline btn-primary'
                  onClick={goToSignUpPage}
                >
                  Sign Up
                </button>
              )}
              {pathname !== '/login' && (
                <button className='btn btn-primary' onClick={goToLoginPage}>
                  Login
                </button>
              )}
            </div>
          )}
          <div className="indicator">
            <span className="indicator-item badge badge-primary rounded-full">{products?.length}</span> 
            <button className="btn btn-square rounded-xl btn-outline">
              <ShoppingCartIcon className='w-7 h-7' />
            </button> 
          </div>
          {/* <CartButton /> */}
        </div>
      </div>
      <main className='flex flex-col'>{<Outlet /> || children}</main>
    </>
  )
}
