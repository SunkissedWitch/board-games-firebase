import { formattedPrice } from "../../utils/helpers"

export interface IOrderSummary {
  totalItems: number,
  totalPrice: number,
  discount: number | null,
  shipping: 'free'| number
}
export const DotsLeader = () => <div className='grow border-base-content border-b border-dashed' />

export const OrderSummary = ({ data }: { data: IOrderSummary }) => {
  const { totalItems, totalPrice, discount, shipping } = data
  console.log('OrderSummary [data]:', data)
  return (
    <div className='w-full max-w-xs p-2.5 border bg-blue-500 bg-opacity-10 flex flex-col gap-2.5'>
      <h6 className='card-title'>Summary:</h6>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Quantity:</div>
        <DotsLeader />
        <div>{totalItems}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Order amount:</div>
        <DotsLeader />
        <div>{formattedPrice(totalPrice)}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Shipping:</div>
        <DotsLeader />
        <div>{shipping}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Discount:</div>
        <DotsLeader />
        <div>{discount || 0}</div>
      </div>
    </div>
  )
}