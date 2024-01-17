import { formattedPrice } from "../../utils/helpers"

export interface IOrderSummary {
  totalItems: number,
  totalPrice: number,
  discount: number | null,
  shipping: 'free'| number
}
// export const DotsLeader = () => <div className='grow border-base-content border-b border-dashed' />
export const DotsLeader = () => (
  <div className='grow overflow-hidden'>
    ...............................................................................................
  </div>
)

export const OrderSummary = ({ data }: { data: IOrderSummary }) => {
  const { totalItems, totalPrice, discount, shipping } = data
  // const discountCalc = Number(totalPrice / 100 * 15)
  const total = (totalPrice + (shipping === 'free' ? 0 : shipping) - Number(discount))
  return (
    <div className='p-2.5 flex flex-col gap-2.5 grow max-w-sm w-full'>
      <h6 className='card-title'>Summary:</h6>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Quantity</div>
        <DotsLeader />
        <div className='font-medium'>{totalItems}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div className='min-w-max'>Order amount</div>
        <DotsLeader />
        <div className='font-medium'>{formattedPrice(totalPrice)}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Shipping</div>
        <DotsLeader />
        <div className='font-medium'>{shipping}{shipping !== 'free' && formattedPrice(shipping)}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5'>
        <div>Discount</div>
        <DotsLeader />
        <div className='font-medium'>{formattedPrice(Number(discount))}</div>
      </div>
      <div className='flex justify-between w-full items-baseline gap-x-0.5 mt-3'>
        <div className='font-bold'>Total price:</div>
        <div className='font-bold'>{formattedPrice(total)}</div>
      </div>
    </div>
  )
}