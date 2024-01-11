import { formattedPrice } from "../../utils/helpers";

type TotalPriceProps = {
  totalPrice: number;
  totalItems: number;
};

export const TotalPrice = ({ totalPrice, totalItems }: TotalPriceProps) => {
  const formattedTotalPrice = formattedPrice(totalPrice);
  const details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique, mauris eget maximus dapibus, purus ipsum finibus nibh, id ornare urna dui eu sapien. Etiam eu elit justo. '
  const shipmentDetails = 'Morbi pellentesque nulla a lacinia iaculis. Suspendisse egestas imperdiet odio vel sollicitudin. Integer volutpat porttitor tempus.'

  return (
    <div className="flex flex-col gap-5">
      <div className="card-title justify-center underline underline-offset-2">Order summary</div>
      <div className="flex flex-row gap-2.5 items-baseline">
        <div className='text-lg font-medium'>Total products:</div>
        <div className='border-b border-dashed border-primary flex-grow' />
        <div>
          <b>{totalItems}</b> {totalItems === 1 ? 'item' : 'items'}
        </div>
      </div>
      <div className="flex flex-row gap-2.5 items-baseline">
        <div className='text-lg font-medium'>Total price:</div>
        <div className='border-b border-dashed border-primary flex-grow' />
        <div>
          <b>{formattedTotalPrice}</b> ₴
        </div>
      </div>
      <div>
        <div className='text-lg font-medium leading-loose'>Details:</div>
        <div className='px-8 text-justify'>{details}</div>
      </div>
      <div>
        <div className='text-lg font-medium leading-loose'>Shipment Details:</div>
        <div className='px-8 text-justify'>{shipmentDetails}</div>
      </div>
    </div>
  );
};
