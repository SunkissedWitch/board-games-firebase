export type CategoriesListType = {
  title: string,
  categoryId: string,
  [key: string]: string
}

import { DocumentData } from 'firebase/firestore'

interface IPropsList {
  list: DocumentData,
  active: string | undefined,
  chooseCategory: (prop: string) => void
}

export const CategoriesList = ({ list, chooseCategory, active }: IPropsList) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
      {list.map((item: CategoriesListType, index: number) => (
        <button
          type='button'
          key={item.categoryId + index}
          onClick={() => chooseCategory(item.categoryId)}
          className='group min-w-[130px] min-h-[120px] flex gap-3 md:gap-5 items-center p-5 rounded-lg bg-primary text-primary-content text-lg font-semibold cursor-pointer'
          disabled={active === item.categoryId}
        >
          <div className={`${active === item.categoryId ? 'h-full bg-primary-content' : 'h-0'} w-[2px] group-hover:bg-primary-content transition-all group-hover:h-full duration-300`} />
          {item.title}
        </button>
      ))}
    </div>
  )
}
