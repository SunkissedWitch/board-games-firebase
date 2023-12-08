import { PropsWithChildren } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export const RootLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const goToLoginPage = () => navigate('/login')
  const goToSignUpPage = () => navigate('/signup')
  const { currentUser, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <>
      <div className='navbar bg-base-200 px-4 justify-center'>
        <div className='container justify-between gap-5 px-2'>
          <button className='btn btn-square btn-ghost btn-lg'>Logo</button>
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
        </div>
      </div>
      <main className='flex flex-col'>{<Outlet /> || children}</main>
    </>
  )
}
