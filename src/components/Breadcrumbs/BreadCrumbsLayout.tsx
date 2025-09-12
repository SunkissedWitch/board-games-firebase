import { Outlet } from "react-router-dom"
import { Breadcrumbs } from "."

export const BreadcrumbsLayout = () => {
  return (
    <div className='container mx-auto px-5'>
      <div className='flex flex-row w-full text-center'>
        <Breadcrumbs />
      </div>
      <div className='flex flex-col'>
        <Outlet />
      </div>
    </div>
  )
}