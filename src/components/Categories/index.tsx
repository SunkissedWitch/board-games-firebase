import { NavLink } from 'react-router-dom'

export type CategoriesListType = {
  title: string
  categoryId: string
  [key: string]: string
}

interface IPropsList {
  list: CategoriesListType[]
}

export const CategoriesList = ({ list }: IPropsList) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-3 sm:mt-5'>
      <NavLink
        to={'/'}
        className='group min-w-[130px] min-h-[96px] flex gap-3 md:gap-5 items-center p-5 rounded-lg bg-primary text-primary-content text-lg font-semibold cursor-pointer text-start'
      >
        {({ isActive }) => (
          <>
            <div
              className={`${
                isActive ? 'h-full bg-primary-content' : 'h-0'
              } w-[2px] shrink-0 group-hover:bg-primary-content transition-all group-hover:h-full duration-300`}
            />
            All categories
          </>
        )}
      </NavLink>
      {list.map((item: CategoriesListType, index: number) => (
        <NavLink
          key={item.categoryId + index}
          to={item.categoryId}
          className='group min-w-[130px] min-h-[96px] flex gap-3 md:gap-5 items-center p-5 rounded-lg bg-primary text-primary-content text-lg font-semibold cursor-pointer text-start'
        >
          {({ isActive }) => (
            <>
              <div
                className={`${
                  isActive ? 'h-full bg-primary-content' : 'h-0'
                } w-[2px] shrink-0 group-hover:bg-primary-content transition-all group-hover:h-full duration-300`}
              />
              {item.title}
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}
