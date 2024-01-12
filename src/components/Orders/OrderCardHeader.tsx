import { Timestamp } from 'firebase/firestore'
import { formattedPrice } from '../../utils/helpers'
import { ReactNode, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

export interface IOrderHeader {
  createdAt?: Timestamp
  username?: string
  totalPrice?: number
  orderNumber?: string
}

interface IHeaderItemProps {
  header?: string | ReactNode
  subheader?: string | ReactNode
}

const HeaderItem = ({ header, subheader }: IHeaderItemProps) => (
  <div className='flex flex-col gap-2'>
    <div className='font-medium text-sm'>{header}</div>
    <div className='flex text-sm text-base-content text-opacity-70'>{subheader}</div>
  </div>
)
const StyledHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-row flex-wrap-reverse items-center gap-y-2.5 gap-x-8 bg-base-200 p-2.5 text-base text-base-content rounded-t-box'>
      {children}
    </div>
  )
}

export const OrderCardHeader = ({
  createdAt,
  username,
  totalPrice,
  orderNumber,
}: IOrderHeader) => {
  return (
    <StyledHeader>
      <div className='flex flex-row items-stratch gap-8 grow'>
        <HeaderItem
          header='Order placed:'
          subheader={createdAt?.toDate().toLocaleDateString()}
        />
        <HeaderItem
          header='Total:'
          subheader={<span className='min-w-max'>{formattedPrice(totalPrice)} ₴</span>}
        />
        <HeaderItem header='Deliver to:' subheader={<span className='text-accent text-opacity-100'>{username}</span>} />
      </div>
      <div className='flex flex-col gap-2.5 ms-auto'>
        <HeaderItem
          header={
            <>
              Order ID:{' '}
              <span className='text-base-content text-opacity-50'>{orderNumber}</span>
            </>
          }
          subheader={
            <Link to={`/orders/${orderNumber}`} className='ms-auto max-w-max btn btn-xs btn-link'>
              See order
            </Link>
          }
        />
      </div>
    </StyledHeader>
  )
}
