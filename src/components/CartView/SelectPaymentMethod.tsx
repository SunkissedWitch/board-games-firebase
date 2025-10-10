import { useForm } from "react-hook-form"
import { PAYMENT_OPTIONS } from "../../utils/constants"
import { Divider } from "../Divider"
import type { PaymentMethodType } from "."
import { PencilSquareIcon } from "@heroicons/react/24/outline"

type SelectPaymentProps = {
  onSelectPayment: (methodType: PaymentMethodType) => void
  paymentMethod: PaymentMethodType
  isCurrentStep: boolean
  onEdit: () => void
}
type FormProps = {
  paymentMethod: PaymentMethodType
}

export const SelectPaymentMethod = ({ onSelectPayment, paymentMethod, isCurrentStep, onEdit }: SelectPaymentProps) => {
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      paymentMethod: paymentMethod,
    },
  })

  const onSubmit = (data: FormProps) => {
    onSelectPayment(data.paymentMethod)
  }

  return (
    <div className='card card-border shadow-lg'>
      <h6 className='card-title justify-between p-5'>
        Payment method
        {!isCurrentStep && (
          <button className='btn btn-ghost btn-square' onClick={onEdit} title='Edit'>
            <PencilSquareIcon className='w-5 h-5' />
          </button>
        )}
      </h6>
      {isCurrentStep ? (
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend font-normal'>Please select your preferred payment method:</legend>
            <ul className='grid grid-flow-row-dense max-w-max p-2 gap-2'>
              {Object.entries(PAYMENT_OPTIONS).map((option) => {
                const [value, label] = option
                return (
                  <li
                    key={value}
                    className='flex flex-row items-center bg-transparent has-checked:bg-secondary rounded-field transition-colors hover:bg-base-content/10'
                  >
                    <label htmlFor={value} className='label px-2 py-2'>
                      <input
                        type='radio'
                        id={value}
                        className='radio radio-xs checked:radio-secondary peer'
                        value={value}
                        {...register("paymentMethod", { required: true })}
                      />
                      <span className='peer-checked:text-secondary-content'>{label}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>
          <Divider />
          <div className='card-actions justify-end'>
            <button type='submit' className='btn btn-outline btn-wide'>
              Next step
            </button>
          </div>
        </form>
      ) : (
        <div className='card-body'>
          <p>{PAYMENT_OPTIONS?.[paymentMethod]}</p>
        </div>
      )}
    </div>
  )
}
