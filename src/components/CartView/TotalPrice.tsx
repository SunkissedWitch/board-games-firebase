import { formattedPrice } from "../../utils/helpers"

type TotalPriceProps = {
  totalPrice: number
  totalItems: number
}

export const TotalPrice = ({ totalPrice, totalItems }: TotalPriceProps) => {
  const formattedTotalPrice = formattedPrice(totalPrice)

  return (
    <div className='flex flex-row justify-between items-baseline gap-5 p-2 w-full max-w-xs ms-auto border bg-neutral-50'>
      <div className='font-semibold'>Total:</div>
      <div>{totalItems} items</div>
      <div><b>{formattedTotalPrice}</b> hrn</div>
    </div>
  )
}
