import { useForm } from "react-hook-form"
import { PAYMENT_OPTIONS } from "../../utils/constants"
import { Divider } from "../DIvider"

type SelectPaymentProps = {
  onSelectPayment: (methodType: string) => void
}
type FormProps = {
  paymentMethod: string
}

export const SelectPaymentMethod = ({ onSelectPayment }: SelectPaymentProps) => {
  const defaultValue = Object.keys(PAYMENT_OPTIONS)[0]
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      paymentMethod: defaultValue,
    },
  })

  const onSubmit = (data: FormProps) => {
    onSelectPayment(data.paymentMethod)
  }

  return (
    <div className='card card-border shadow-lg'>
      <h6 className='card-title p-5'>Payment method</h6>
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
                    <span className="peer-checked:text-secondary-content">
                      {label}
                    </span>
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
    </div>
  )
}
