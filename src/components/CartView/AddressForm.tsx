import { Controller, useForm, useWatch } from "react-hook-form"
import { TextInput } from "../TextInput"
import { addressRules } from "../../utils/formRules"
import { CitySelect } from "./CitySelect"
import { WarehouseTypeSelect } from "./WarehouseTypeSelect"
import { WarehouseSelect } from "./WarehouseSelect"
import { useEffect } from "react"

export type AddressInputsProps = {
  city: {
    Ref: CityProps["Ref"]
    Description: CityProps["Description"]
  } | null
  warehouse: Omit<WarehouseProps, "ShortAddress">
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
    resetField
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
        Description: values.city.Description,
      },
      warehouse: {
        Description: values.warehouseRef.Description,
        Ref: values.warehouseRef.Ref,
        CityDescription: values.warehouseRef.CityDescription,
        CityRef: values.warehouseRef.CityRef,
      },
      tel: values.tel,
      username: values.username,
    }
    onSubmit(deliveryDetails)
  }

  useEffect(() => {
    if (!watchCity || !watchWarehouseType) return
    resetField('warehouseRef')
  }, [watchCity?.Ref, watchWarehouseType])

  return (
    <div className='card card-border shadow-lg @container/form-body'>
      <div className='card-title p-5'>Deliver to:</div>
      <form className='card-body' onSubmit={handleSubmit(handleSubmitValues)}>
        <div className='grid @min-lg/form-body:grid-cols-2 gap-x-5 gap-y-2.5'>
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

          <fieldset className='fieldset'>
            <label htmlFor='warehouseType' className='label'>
              Warehouse Type
            </label>
            <Controller
              name='warehouseType'
              rules={{
                required: "Select warehouse type",
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <WarehouseTypeSelect id='warehouseType' {...field} />
                  {error && error.message && (
                    <label htmlFor='warehouseType' className='label text-xs text-error'>
                      {error?.message}
                    </label>
                  )}
                </>
              )}
            />
          </fieldset>
          <Controller
            name='city'
            control={control}
            rules={{
              required: "Select city",
            }}
            render={({ field, fieldState: { error } }) => <CitySelect {...field} error={error} />}
          />
          {watchCity && watchCity.Ref && watchWarehouseType && (
            <Controller
              name='warehouseRef'
              control={control}
              rules={{
                required: "Select warehouse",
              }}
              render={({ field, fieldState: { error } }) => (
                <WarehouseSelect
                  {...field}
                  key={watchWarehouseType + watchCity.Ref}
                  typeOfWarehouseRef={watchWarehouseType}
                  cityRef={watchCity.Ref}
                  error={error}
                />
              )}
            />
          )}
        </div>
        <div className='w-full h-px bg-current/10 my-4 flex-none' />
        <div className='grid @min-lg/form-body:grid-cols-2 gap-x-5 place-items-end'>
          <button
            className='btn btn-primary btn-outline w-full @min-lg/form-body:col-start-2 @min-3xl/form-body:btn-wide'
            type='submit'
          >
            Next step
          </button>
        </div>
      </form>
    </div>
  )
}
