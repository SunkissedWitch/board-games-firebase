import { useForm } from 'react-hook-form'
import { useAuthStore } from '../contexts/AuthStore'

export const AccountSettings = () => {
  const profileName = useAuthStore((store) => store.currentUser?.displayName || store.currentUser?.email)
  const uid = useAuthStore((store) => store.currentUser?.uid)
  const updateUserDisplayName = useAuthStore(
    (store) => store.updateUserDisplayName
  )

  const setName = async (newName: string) => {
    if (uid) {
      updateUserDisplayName(newName)
    }
  }
  return (
    <div className='flex flex-col grow'>
      <h1 className='text-xl md:text-3xl font-semibold'>Account settings</h1>
      <div className='card shadow-xl'>
        <div className='card-body'>
        <div className='card-title'>{profileName}</div>
          <DisplayNameForm onSubmit={setName} />
        </div>
      </div>
    </div>
  )
}

type InputValues = {
  displayName: string,
  // photoURL: string
}

const DisplayNameForm = ({ onSubmit: update }: {onSubmit: (param: string) => Promise<void>}) => {
  const { register, handleSubmit, formState: { errors }, resetField } = useForm({
    defaultValues: {
      displayName: '',
      // photoURL: ''
    },
  })

  const onSubmit = async (data: InputValues) => {
    console.log(data)
    const { displayName } = data
    await update(displayName)
    resetField('displayName')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-flow-row gap-5'>

      <label className="form-control w-full">
        <span className="label label-text">Display Name</span>
        <input
          {...register('displayName', { required: 'is required' })}
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered w-full max-w-sm"
          />
        {errors?.displayName && <div className="label label-text-alt text-error">{errors?.displayName.message}</div>}
      </label>
{/* 
      <label className="form-control w-full">
        <span className="label label-text">Photo URL</span>
        <input
          {...register('photoURL', { required: false })}
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered w-full"
          />
        {errors?.photoURL && <div className="label label-text-alt text-error">{errors?.photoURL.message}</div>}
      </label> */}

      <button type='submit' className='btn btn-primary btn-wide justify-self-end'>
        Confirm
      </button>
    </form>
  )
}
