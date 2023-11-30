import { useForm, SubmitHandler } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

type Inputs = {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('userCredential', userCredential?.user)
    } catch (error) {
      // ToDo: update firebase to use this handler:
      // const iNeedThisErrorSomewhere = AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
      console.log(error)
    }
  }

  console.log('errors', errors)

  return (
    <>
      <div className='px-5 container mx-auto py-10'>
        <div className='mx-auto card card-compact card-bordered shadow-md max-w-sm'>
          <form className='card-body gap-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='card-title'>Login</div>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Email</span>
              </div>
              <input
                {...register('email', { required: { value: true, message: 'Email is required' } })}
                type='text'
                autoComplete='email'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <div className='label'>
                {errors?.email && <span className='label-text-alt text-error'>{errors?.email?.message}</span>}
              </div>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <input
                {...register('password', { required: { value: true, message: 'Password is required' } })}
                type='password'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <div className='label'>
                {errors?.password && <span className='label-text-alt text-error'>{errors?.password?.message}</span>}
              </div>
            </label>
            <button className='btn btn-primary mt-2.5' type='submit'>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
