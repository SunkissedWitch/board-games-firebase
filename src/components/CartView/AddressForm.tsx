import { Controller, useForm } from "react-hook-form"
import { TextInput } from "../TextInput"
import { addressRules } from "../../utils/formRules"
import { CitySelect } from "./CitySelect"
import { ComboBox } from "../ComboBox"

export type AddressInputsProps = {
  // region: RegionData | null
  city: CityProps | null
  // cityRef: string
  address: string
  tel: string
  postCode?: string
  postOffice?: string
  username: string
}
// export type RegionData = {
//   Ref: string
//   AreasCenter: string
//   DescriptionRu: string
//   Description: string
// }
export type CityProps = {
  Ref: string
  SettlementType: string
  Description: string
  SettlementTypeDescription: string
  Region: string
  RegionsDescription: string
  AreaDescription: string
}

type onSubmitProp = {
  onSubmit: (_props: AddressInputsProps) => void
}

export const AddressForm = ({ onSubmit }: onSubmitProp) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // region: null,
      city: null,
      // cityRef: null,
      address: "",
      tel: "",
      postCode: "",
      postOffice: "",
      username: "",
    },
  })

  // console.log('[errors]', errors)
  return (
    <div className='card card-border shadow-lg'>
      <div className='card-title p-5'>Deliver to:</div>
      <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid md:grid-cols-2 gap-x-10 gap-y-2.5'>
          {/* <fieldset className='fieldset'>
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
          <Controller name='cityRef' control={control} render={({ field }) => <CitySelect {...field} />} /> */}
          <Controller name='city' control={control} render={({ field }) => <CitySelect {...field} />} />
          {/* <fieldset className='fieldset'>
            <label htmlFor='cityRef' className='label'>
              City
            </label>
            <select id='cityRef' {...register("cityRef")}>
              <option key={city}>{city}</option>
            </select>
            {errors?.city && (
              <label htmlFor='cityRef' className='label text-xs text-error'>
                {errors?.city?.message}
              </label>
            )}
          </fieldset> */}

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
          <div className='md:col-span-2 grid grid-cols-subgrid'>
            <button className='btn btn-primary btn-outline md:col-start-2' type='submit'>
              Next step
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
