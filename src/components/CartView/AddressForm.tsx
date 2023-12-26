import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";
import { addressRules } from "../../utils/formRules"

export type AddressInputsProps = {
  city: string
  address: string
  tel: string
  courierServise: string
  postCode?: string
  postOffice?: string
  username: string
}

type onSubmitProp = {
  onSubmit: (_props: AddressInputsProps) => void
}

export const AddressForm = ({ onSubmit }: onSubmitProp) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      address: "",
      tel: "",
      courierServise: 'nova_poshta',
      postCode: "",
      postOffice: "",
      username: "",
    },
  });

  const watchService = watch('courierServise')

  console.log('[errors]', errors)
  return (
    <div className="card card-bordered shadow-lg">
      <div className="card-title p-5">Deliver to:</div>
      <form className="card-body pt-0 grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-10" onSubmit={handleSubmit(onSubmit)}>

        <label className="form-control w-full">
          <div className="label label-text">City</div>
          <TextInput {...register("city", addressRules.city)} placeholder="City" />
          <div className="label">
            {errors?.city && (
              <span className="label-text-alt text-error">
                {errors?.city?.message}
              </span>
            )}
          </div>
        </label>

        <label className="form-control w-full row-span-2">
          <div className="label label-text">Address</div>
          <textarea className='textarea textarea-bordered h-full' {...register("address", addressRules.address)} placeholder="Address" autoComplete="on" />
          <div className="label">
            {errors?.address && (
              <span className="label-text-alt text-error">
                {errors?.address?.message}
              </span>
            )}
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label label-text">Phone number</div>
            <TextInput
              {...register("tel", addressRules.tel)}
              placeholder="Phone number"
              type="tel"
            />
          <div className="label">
            {errors?.tel && (
              <span className="label-text-alt text-error">
                {errors?.tel?.message}
              </span>
            )}
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label label-text">Choose a courier service</div>
          <select {...register('courierServise', addressRules.courierServise)} className='select select-bordered'>
            <option value='nova_poshta'>"Нова пошта"</option>
            <option value='ukr_poshta'>"Укрпошта"</option>
          </select>
          <div className="label">
            {errors?.courierServise && (
              <span className="label-text-alt text-error">
                {errors?.courierServise?.message}
              </span>
            )}
          </div>
        </label>

        { watchService === 'ukr_poshta' && <label className="form-control w-full">
          <div className="label label-text">Post Code</div>
          <TextInput
            {...register('postCode', addressRules.postCode)}
            placeholder="69000"
            autoComplete="postal-code"
          />
          <div className="label">
            {errors?.postCode && (
              <span className="label-text-alt text-error">
                {errors?.postCode?.message}
              </span>
            )}
          </div>
        </label>
        }

        { watchService === 'nova_poshta' && <label className="form-control w-full">
          <div className="label label-text">Post office</div>
          <TextInput
            {...register('postOffice', addressRules.postOffice)}
            placeholder="#20"
            autoComplete="shipping street-address"
          />
          <div className="label">
            {errors?.postOffice && (
              <span className="label-text-alt text-error">
                {errors?.postOffice?.message}
              </span>
            )}
          </div>
        </label>
        }


        <label className="form-control w-full">
          <div className="label label-text">Who will receive it?</div>
          <TextInput
            {...register('username', addressRules.username)}
            placeholder="John Doe"
            autoComplete="name"
          />
          <div className="label">
            {errors?.username && (
              <span className="label-text-alt text-error">
                {errors?.username?.message}
              </span>
            )}
          </div>
        </label>

        <button className='btn btn-primary btn-outline mt-auto mb-4' type='submit'>Next step</button>

      </form>
    </div>
  );
};
