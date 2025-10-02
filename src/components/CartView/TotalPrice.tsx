import { formattedPrice } from "../../utils/helpers";
import type { DeliveryProps } from "./AddressForm";

type TotalPriceProps = {
  totalPrice: number;
  totalItems: number;
  delivery: DeliveryProps | null
  paymentMethod: string
};

export const TotalPrice = ({ totalPrice, totalItems, delivery, paymentMethod }: TotalPriceProps) => {
  const formattedTotalPrice = formattedPrice(totalPrice);

  return (
    <div className="flex flex-col gap-5">
      <div className="card-title justify-center underline underline-offset-2">Order summary</div>
      <div className="flex flex-row gap-2.5 items-baseline">
        <div className='text-lg font-medium'>Total products:</div>
        <div className='border-b border-dashed border-primary grow' />
        <div>
          <b>{totalItems}</b> {totalItems === 1 ? 'item' : 'items'}
        </div>
      </div>
      <div className="flex flex-row gap-2.5 items-baseline">
        <div className='text-lg font-medium'>Total price:</div>
        <div className='border-b border-dashed border-primary grow' />
        <div>
          <b>{formattedTotalPrice}</b>
        </div>
      </div>
      <div className="*:not-first:px-3">
        <div className='text-lg font-medium leading-loose'>Details:</div>
        {/* TODO: handle payment methods */}
        <div>payment - {paymentMethod}</div>
      </div>
      <div className="*:not-first:px-3">
        <div className='text-lg font-medium leading-loose'>Shipment Details:</div>
        {delivery && (
          <>
            <div>
              {delivery.username}
            </div>
            <div className='tabular-nums'>
              tel: {delivery.tel}
            </div>
          <div className='text-balance'>
            {delivery.warehouse.CityDescription}, <br /> {delivery.warehouse.Description}
          </div>
          </>
        )}
      </div>
    </div>
  );
};
