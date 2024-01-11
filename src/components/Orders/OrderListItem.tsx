import { IProductData } from "./Order"

interface DataProps {
  data: IProductData
}

export const OrderListItem = ({ data }: DataProps) => {
  console.log('data', data)
  const { title, category, price, photo } = data
  return (
    <div className='flex flex-row gap-2.5 py-2.5'>
      <figure className='shrink-0'>
        <img src={photo} alt={title} className='h-16 place-self-start' />
      </figure>
      <div className='flex flex-col gap-2.5 justify-between grow'>
        <div className='font-medium'>
          {title}
        </div>
      <div className='badge badge-ghost text-xs'>{category}</div>
      </div>
      <div className='min-w-max'>{price} ₴</div>
    </div>
  )
}