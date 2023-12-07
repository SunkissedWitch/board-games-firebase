import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthErrorCodes } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Inputs = {
  email: string
  password: string,
  confirmPassword: string
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm<Inputs>()
  const password = useRef({});
  password.current = watch("password", "")
  const { signup } = useAuth()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false)
  const togglePasswordVisiblity = () => setPasswordVisible(prevState => !prevState)
  const toggleConfirmPasswordVisiblity = () => setConfirmPasswordVisible(prevState => !prevState)

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    console.log("onSubmit values:", email, password)
    try {
      const userCredential = await signup({ email, password })
      console.log('userCredential', userCredential?.user)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode', errorCode)
        if (errorCode === AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE) {
          console.log('CREDENTIAL_ALREADY_IN_USE', errorMessage)
          // return setError('root', { message: 'Error: there is no user with such credentials.' })
        }
        setError('root', { message: errorMessage })
      }
      setError('root', { message: 'Unexpected error'})
    }
  }
  console.log('errors', errors)

  return (
    <>
      <div className='px-5 container mx-auto py-10'>
        <div className='mx-auto card card-compact card-bordered shadow-md max-w-sm'>
          <form className='card-body gap-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='card-title'>Sign up</div>
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
              <div className='join'>
              <input
                {...register('password', { required: 'Password is required' })}
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Type here new password'
                className='input input-bordered w-full'
                />
                <button className='btn btn-primary' onClick={togglePasswordVisiblity}>show</button>
              </div>
              <div className='label'>
                {errors?.password && <span className='label-text-alt text-error'>{errors?.password?.message}</span>}
              </div>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Confirm your password</span>
              </div>
              <div className='join'>
              <input
                {...register('confirmPassword', { required: 'Confirm your password', validate: value =>
                value === password.current || "The passwords do not match" })}
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder='Repeat your password'
                className='input input-bordered w-full'
              />
              <button className='btn btn-primary' onClick={toggleConfirmPasswordVisiblity}>show</button>
              </div>
              <div className='label'>
                {errors?.confirmPassword && <span className='label-text-alt text-error'>{errors?.confirmPassword?.message}</span>}
              </div>
            </label>
            {errors?.root?.message && <div className='alert alert-error'>{errors?.root?.message}</div>}
            <button className='btn btn-primary mt-2.5' type='submit'>
              Create account
            </button>
          </form>
          <div className='card-body mb-5'>
            <div className='text-center'>
              Already have an account? Login <Link to='/login' className='link link-primary'>here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
