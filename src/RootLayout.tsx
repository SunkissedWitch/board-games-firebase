import { PropsWithChildren } from 'react'

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className='navbar bg-base-200 px-4'>
        <button className="btn btn-square btn-ghost btn-lg">
          Logo
        </button>
      </div>
      <main className='flex flex-col'>
        {children}
      </main>
    </>
  )
}

