import { PropsWithChildren } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export const RootLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const goToLoginPage = () => navigate('/login')
  const goToSignUpPage = () => navigate('/signup')
  const { currentUser } = useAuth()

  return (
    <>
      <div className='navbar bg-base-200 px-4 justify-center'>
        <div className='container justify-between gap-5 px-2'>
          <button className='btn btn-square btn-ghost btn-lg'>Logo</button>
          {currentUser?.email}
          {!currentUser && (
            <div className='join'>
              <button
                className='btn btn-outline btn-primary'
                onClick={goToLoginPage}
              >
                Login
              </button>
              <button
                className='btn btn-outline btn-primary'
                onClick={goToSignUpPage}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <main className='flex flex-col'>{<Outlet /> || children}</main>
    </>
  )
}
