import { DocumentData } from 'firebase/firestore'
import { ReactNode, useState } from 'react'

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
type DescriptionProps = {
  components: string[]
  publisher: string
  language: string
}

export const ProductDetails = ({ product, category }: IProductDetails) => {
  const { components, publisher, language }: DescriptionProps =
    product?.description
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <div className='grid grid-cols-[1fr,_1.75fr] gap-y-5 gap-x-2.5'>
      <Title>Publisher</Title>
      <DetailItem>{publisher}</DetailItem>

      <Title>Language</Title>
      <DetailItem>{language}</DetailItem>

      <Title>Main category</Title>
      <DetailItem>{category}</DetailItem>

      <Title>Components</Title>
      <ul className='px-2.5 leading-normal text-sm font-light'>
        {components?.length < 5 ? (
          components?.map((component: string) => (
            <li key={component}>{component}</li>
          ))
        ) : (
          <>
            {components.slice(0, 5).map((component: string) => (
              <li key={component}>{component}</li>
            ))}
            {!expand && (
              <li>
                <button
                  className='btn btn-link h-auto min-h-fit p-0'
                  onClick={() => setExpand(true)}
                >
                  more...
                </button>
              </li>
            )}
            {expand &&
              components.slice(5).map((component: string) => (
                <li key={component}>{component}</li>
              ))}
            {expand && (
              <li>
                <button
                  className='btn btn-link h-auto min-h-fit p-0'
                  onClick={() => setExpand(false)}
                >
                  ...hide
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  )
}
