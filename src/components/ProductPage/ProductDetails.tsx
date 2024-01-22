import { DocumentData } from 'firebase/firestore'
import { ReactNode } from 'react'

interface ChildrenProp {
  children?: ReactNode
}

export const Title = ({ children }: ChildrenProp) => (
  <div className='font-normal text-base'>{children}</div>
)
export const DetailItem = ({ children }: ChildrenProp) => (
  <div className='px-2.5 leading-normal text-sm font-light'>{children}</div>
)

interface IProductDetails {
  product: DocumentData
  category: string
}

export const ProductDetails = ({ product, category }: IProductDetails) => {
  const { description: { components, publisher, language } } = product

  return (
    <div className='grid grid-cols-[1fr,_1.75fr] gap-y-5 gap-x-2.5'>
      <Title>Publisher</Title>
      <div className='px-2.5 leading-normal text-sm font-light'>
        {publisher}
      </div>

      <Title>Language</Title>
      <div className='px-2.5 leading-normal text-sm font-light'>{language}</div>

      <Title>Main category</Title>
      <div className='px-2.5 leading-normal text-sm font-light'>{category}</div>

      <Title>Components</Title>
      <ul className='px-2.5 leading-normal text-sm font-light'>
        {components?.map((component: string) => (
          <li className='list-item' key={component}>
            {component}
          </li>
        ))}
      </ul>
    </div>
  )
}
