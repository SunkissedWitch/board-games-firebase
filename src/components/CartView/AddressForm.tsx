import { Controller, useForm, useWatch } from "react-hook-form"
import { TextInput } from "../TextInput"
import { addressRules } from "../../utils/formRules"
import { CitySelect } from "./CitySelect"
import { WarehouseTypeSelect } from "./WarehouseTypeSelect"
import { WarehouseSelect } from "./WarehouseSelect"

export type AddressInputsProps = {
  city: {
    Ref: CityProps['Ref']
    Description: CityProps['Description']
  } | null
  warehouse: Omit<WarehouseProps, 'ShortAddress'>
  tel: string
  username: string
}
export type CityProps = {
  Ref: string
  SettlementType: string
  Description: string
  SettlementTypeDescription: string
  Region: string
  RegionsDescription: string
  AreaDescription: string
}
export type WarehouseProps = {
  Description: string
  ShortAddress: string
  Ref: string
  CityDescription: string
  CityRef: string
}

export type WarehouseTypeProps = {
  Ref: string
  Description: string
}

type onSubmitProp = {
  onSubmit: (_props: AddressInputsProps) => void
}

type FormProps = {
  city: CityProps | null
  warehouseType: WarehouseTypeProps["Ref"] | null
  warehouseRef: WarehouseProps | null
  address: string
  tel: string
  postCode: string
  postOffice: string
  username: string
}

export const AddressForm = ({ onSubmit }: onSubmitProp) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      city: null,
      warehouseType: null,
      warehouseRef: null,
      tel: "",
      postCode: "",
      postOffice: "",
      username: "",
    },
  })

  const watchCity = useWatch({
    name: "city",
    control,
  })

  const watchWarehouseType = useWatch({
    name: "warehouseType",
    control,
  })
  const handleSubmitValues = (values: FormProps) => {
    if (!values.warehouseRef || !values.city) {
      return
    }

    const deliveryDetails = {
      city: {
        Ref: values.city.Ref,
        Description: values.city.Description
      },
      warehouse: {
        Description: values.warehouseRef.Description,
        Ref: values.warehouseRef.Ref,
        CityDescription: values.warehouseRef.CityDescription,
        CityRef: values.warehouseRef.CityRef,
      },
      tel: values.tel,
      username: values.username
    }
    onSubmit(deliveryDetails)
  }

  // console.log('[errors]', errors)
  return (
    <div className='card card-border shadow-lg'>
      <div className='card-title p-5'>Deliver to:</div>
      <form className='card-body' onSubmit={handleSubmit(handleSubmitValues)}>
        <div className='grid md:grid-cols-2 gap-x-10 gap-y-2.5'>
          <div className='grid grid-flow-row-dense gap-y-2.5 auto-rows-max'>
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
          </div>
          <div className='grid grid-flow-row-dense gap-y-2.5 auto-rows-max'>
            <fieldset className='fieldset'>
              <label htmlFor='warehouseType' className='label'>
                Warehouse Type
              </label>
              <Controller
                name='warehouseType'
                control={control}
                render={({ field }) => <WarehouseTypeSelect id='warehouseType' {...field} />}
              />
            </fieldset>
            <Controller name='city' control={control} render={({ field }) => <CitySelect {...field} />} />
            {watchCity && watchCity.Ref && watchWarehouseType && (
              <Controller
                name='warehouseRef'
                control={control}
                render={({ field }) => (
                  <WarehouseSelect {...field} typeOfWarehouseRef={watchWarehouseType} cityRef={watchCity.Ref} />
                )}
              />
            )}
          </div>
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
