import { POST_SERVICES } from "../../utils/constants"
import type { DeliveryDataProps } from "../Orders/Order"

export const DeliveryInfo = ({ data }: { data: DeliveryDataProps }) => {
  const { username, tel, warehouse } = data

  return (
    <div className='flex flex-col p-2.5 grow max-w-sm'>
      <h6 className='card-title'>Delivers:</h6>
      <div className='font-medium mb-3'>{POST_SERVICES['nova_poshta']}</div>
      <div className='flex flex-col gap-1'>
        <div>{warehouse.CityDescription}</div>
        <div>{warehouse.Description}</div>
        <div className='mt-2.5'>{tel}</div>
        <div>{username}</div>
      </div>
    </div>
  )
}