import { POST_SERVICES } from "../../utils/constants"
import { DeliveryDataProps } from "../Orders/Order"

export const DeliveryInfo = ({ data }: { data: DeliveryDataProps }) => {
  console.log('DeliveryInfo [data]', data)
  const { address, city, courierServise, postOffice, postCode, username, tel } = data

  return (
    <div className='flex flex-col p-2.5 grow max-w-sm'>
      <h6 className='card-title'>Delivers:</h6>
      <div className='font-medium mb-3'>{POST_SERVICES[courierServise]}</div>
      <div className='flex flex-col gap-1'>
        {postCode && <div>{postCode}</div>}
        <div>{city}</div>
        {postOffice && <div>Department #{postOffice}</div>}
        <div>{address}</div>
        <div className='mt-2.5'>{tel}</div>
        <div>{username}</div>
      </div>
    </div>
  )
}