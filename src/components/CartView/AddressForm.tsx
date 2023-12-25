import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";

export const AddressForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      district: "",
      street: "",
      building: "",
      appartment: "",
      tel: "",
      courierServise: "",
      recieverName: "",
    },
  });
  return (
    <div className="card card-bordered">
      <div className="card-title p-5">Deliver to:</div>
      <form className="card-body pt-0 grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-10">
        <label className="form-control w-full">
          <div className="label label-text">City</div>
          <TextInput {...register("city")} placeholder="City" />
          <div className="label">
            {errors?.city && (
              <span className="label-text-alt text-error">
                {errors?.city?.message}
              </span>
            )}
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label label-text">District</div>
          <TextInput {...register("district")} placeholder="District" />
          <div className="label">
            {errors?.district && (
              <span className="label-text-alt text-error">
                {errors?.district?.message}
              </span>
            )}
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label label-text">Street</div>
          <TextInput {...register("street")} placeholder="Street" />
          <div className="label">
            {errors?.street && (
              <span className="label-text-alt text-error">
                {errors?.street?.message}
              </span>
            )}
          </div>
        </label>

        <div className="flex gap-10 justify-between">
          <label className="form-control w-full">
            <div className="label label-text">Building</div>
            <TextInput {...register("building")} placeholder="0" />
            <div className="label">
              {errors?.building && (
                <span className="label-text-alt text-error">
                  {errors?.building?.message}
                </span>
              )}
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label label-text">Appartment</div>
            <TextInput {...register("appartment")} placeholder="0" />
            <div className="label">
              {errors?.appartment && (
                <span className="label-text-alt text-error">
                  {errors?.appartment?.message}
                </span>
              )}
            </div>
          </label>
        </div>

        <label className="form-control w-full">
          <div className="label label-text">Phone number</div>
          <TextInput
            {...register("tel")}
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
          <div className="label label-text">Choose courier servise</div>
          <select className='select select-bordered'>
            <option>first option</option>
            <option>second option</option>
          </select>
          <div className="label">
            {errors?.courierServise && (
              <span className="label-text-alt text-error">
                {errors?.courierServise?.message}
              </span>
            )}
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label label-text">Who will recieve?</div>
          <TextInput
            {...register('recieverName')}
            placeholder="John Doe"
          />
          <div className="label">
            {errors?.recieverName && (
              <span className="label-text-alt text-error">
                {errors?.recieverName?.message}
              </span>
            )}
          </div>
        </label>

        <button className='btn btn-primary mt-auto mb-4' type='submit'>Confirm</button>

      </form>
    </div>
  );
};
