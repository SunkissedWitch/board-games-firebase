import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { FirebaseError } from 'firebase/app'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('userCredential', userCredential?.user)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
          return setError('root', { message: 'Error: there is no user with such credentials.' })
        }
        setError('root', { message: errorMessage })
      }
      setError('root', { message: 'Unexpected error'})
    }
  }

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
                placeholder='Type here your email'
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
                placeholder='Type here your password'
                className='input input-bordered w-full'
              />
              <div className='label'>
                {errors?.password && <span className='label-text-alt text-error'>{errors?.password?.message}</span>}
              </div>
            </label>
            {errors?.root?.message && <div className='alert alert-error'>{errors?.root?.message}</div>}
            <button className='btn btn-primary mt-2.5' type='submit'>
              Confirm
            </button>
          </form>
          <div className='card-body mb-5'>
            <div className='text-center'>
              Have no account? Create it <Link to='/signup' className='link link-primary'>here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
