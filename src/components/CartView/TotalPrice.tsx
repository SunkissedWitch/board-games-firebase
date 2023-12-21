import { formattedPrice } from "../../utils/helpers"

type TotalPriceProps = {
  totalPrice: number
  totalItems: number
}

export const TotalPrice = ({ totalPrice }: TotalPriceProps) => {
  const formattedTotalPrice = formattedPrice(totalPrice)

  return (
    <div className='flex flex-row justify-between items-baseline gap-5 p-2 w-full max-w-xs ms-auto border bg-neutral-50'>
      <div>Total:</div>
      <div>{formattedTotalPrice}</div>
    </div>
  )
}
