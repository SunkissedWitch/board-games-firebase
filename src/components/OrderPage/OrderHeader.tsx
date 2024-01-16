interface IOrderHeader {
  orderId: string
  placed: string
}

export const OrderHeader = ({ orderId, placed }: IOrderHeader) => {
  return (
    <div className='flex flex-col sm:items-end gap-2.5 rounded-t-box bg-base-200 p-2.5'>
      <div className='font-medium text-lg text-primary'>
        Order ID:{' '}
        <span className='text-base text-accent font-normal'>{orderId}</span>
      </div>
      <div className='font-medium text-lg text-primary'>
        Order placed:{' '}
        <span className='text-base text-accent font-normal'>{placed}</span>
      </div>
    </div>
  )
}
