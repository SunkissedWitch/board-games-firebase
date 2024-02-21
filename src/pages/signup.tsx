import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthErrorCodes } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PasswordInput } from '../components/PasswordInput'
import { TextInput } from '../components/TextInput'
import { emailRule } from '../utils/formRules'
import { useAuthStore } from '../contexts/AuthStore'
import { auth } from '../firebase'

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
    clearErrors,
    formState: { errors, isValidating },
    setError
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur'
  })
  const password = useRef({})
  password.current = watch('password', '')

  const { signup, setUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await signup({ email, password })
      setUser(auth.currentUser)
      navigate(location?.state ? location.state : '/')
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('error', errorCode, errorMessage)

        if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
          return setError('root', { message: 'Error: email already in use.' })
        }

        return setError('root', { message: errorMessage })
      }
      setError('root', { message: 'Unexpected error'})
    }
  }

  useEffect(() => {
    clearErrors('root')
  }, [isValidating])

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
              <TextInput
                {...register('email', emailRule)}
                autoComplete='email'
                type='email'
                placeholder='Type here your email'
              />
              <div className='label'>
                {errors?.email && <span className='label-text-alt text-error'>{errors?.email?.message}</span>}
              </div>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <PasswordInput
                {...register('password', { required: 'Password is required' })}
                placeholder='Type here new password'
                />
              <div className='label'>
                {errors?.password && <span className='label-text-alt text-error'>{errors?.password?.message}</span>}
              </div>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Confirm your password</span>
              </div>
              <PasswordInput
                {...register('confirmPassword', { required: 'Confirm your password', validate: value =>
                value === password.current || "The passwords do not match" })}
                placeholder='Repeat your password'
              />
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
