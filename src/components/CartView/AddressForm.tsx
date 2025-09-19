import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";
import { addressRules } from "../../utils/formRules"
import { POST_SERVICES } from "../../utils/constants";
import { entries, head, keys } from "lodash";

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
      courierServise: head(keys(POST_SERVICES)) || 'nova_poshta',
      postCode: "",
      postOffice: "",
      username: "",
    },
  });

  const watchService = watch('courierServise')

  console.log('[errors]', errors)
  return (
    <div className='card card-border shadow-lg'>
      <div className='card-title p-5'>Deliver to:</div>
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-2.5">
        <fieldset className='fieldset'>
          <label htmlFor='city' className='label'>
            City
          </label>
          <TextInput id='city' {...register("city", addressRules.city)} placeholder='City' />
          {errors?.city && (
            <label htmlFor='city' className='label text-xs text-error'>
              {errors?.city?.message}
            </label>
          )}
        </fieldset>

        <fieldset className='fieldset md:row-span-3 flex flex-col'>
          <label htmlFor='address' className='label'>
            Address
          </label>
          <textarea
            id='address'
            rows={1}
            className='textarea min-h-24 w-full textarea-bordered h-full! self-stretch'
            {...register("address", addressRules.address)}
            placeholder='Address'
            autoComplete='on'
          />
          {errors?.address && (
            <label htmlFor='address' className='label text-xs text-error'>
              {errors?.address?.message}
            </label>
          )}
        </fieldset>

        <fieldset className='fieldset'>
          <label htmlFor='tel' className='label'>
            Phone number
          </label>
          <TextInput id='tel' {...register("tel", addressRules.tel)} placeholder='Phone number' type='tel' />
          {errors?.tel && (
            <label htmlFor='tel' className='label text-xs text-error'>
              {errors?.tel?.message}
            </label>
          )}
        </fieldset>

        <fieldset className='fieldset'>
          <label htmlFor='courierServise' className='label'>
            Choose a courier service
          </label>
          <select
            id='courierServise'
            {...register("courierServise", addressRules.courierServise)}
            className='select w-full'
          >
            {entries(POST_SERVICES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {errors?.courierServise && (
            <label htmlFor='courierServise' className='label text-xs text-error'>
              {errors?.courierServise?.message}
            </label>
          )}
        </fieldset>

        {watchService === "ukr_poshta" && (
          <fieldset className='fieldset'>
            <label htmlFor='postCode' className='label'>
              Post Code
            </label>
            <TextInput
              id='postCode'
              {...register("postCode", addressRules.postCode)}
              placeholder='69000'
              autoComplete='postal-code'
            />
            {errors?.postCode && (
              <label htmlFor='postCode' className='label text-xs text-error'>
                {errors?.postCode?.message}
              </label>
            )}
          </fieldset>
        )}

        {watchService === "nova_poshta" && (
          <fieldset className='fieldset'>
            <label htmlFor='postOffice' className='label'>
              Post office
            </label>
            <TextInput
              id='postOffice'
              {...register("postOffice", addressRules.postOffice)}
              placeholder='#20'
              autoComplete='shipping address-level3'
            />

            {errors?.postOffice && (
              <label htmlFor='postOffice' className='label text-xs text-error'>
                {errors?.postOffice?.message}
              </label>
            )}
          </fieldset>
        )}

        <fieldset className='fieldset'>
          <label htmlFor='username' className='label'>
            Who will receive it?
          </label>
          <TextInput
            id='username'
            {...register("username", addressRules.username)}
            placeholder='John Doe'
            autoComplete='name'
          />
          {errors?.username && (
            <label htmlFor='username' className='label text-xs text-error'>
              {errors?.username?.message}
            </label>
          )}
        </fieldset>
        <div className="md:col-span-2 grid grid-cols-subgrid">
          <button className='btn btn-primary btn-outline md:col-start-2' type='submit'>
            Next step
          </button>
        </div>
        </div>

      </form>
    </div>
  )
};
