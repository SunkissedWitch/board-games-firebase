import { POST_SERVICES } from "../../utils/constants"
import { DeliveryDataProps } from "../Orders/Order"

export const DeliveryInfo = ({ data }: { data: DeliveryDataProps }) => {
  console.log('DeliveryInfo [data]', data)
  const { username, address, city, courierServise, tel} = data

  return (
    <div className='flex flex-col p-2.5'>
      <h6 className='card-title'>Delivers:</h6>
      <div className='font-medium mb-3'>{POST_SERVICES[courierServise]}</div>
      <div className='flex flex-col gap-1'>
        <div className=''>{username}</div>
        <div>{city}</div>
        <div>{address}</div>
        <div>tel: {tel}</div>
      </div>
    </div>
  )
}