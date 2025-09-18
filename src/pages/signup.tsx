import { useForm, type SubmitHandler } from 'react-hook-form'
import { AuthErrorCodes } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
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
  console.log('location?.state?.from', location?.state?.from)

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await signup({ email, password })
      setUser(auth.currentUser)
      navigate(location?.state?.from ? location.state.from : '/')
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
        <div className='mx-auto card card-sm card-border shadow-md max-w-sm'>
          <form className='card-body gap-3' onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='fieldset'>
              <legend className='card-title fieldset-legend'>Sign up</legend>

              <label className='label mt-2 fiel' htmlFor='email'>Email</label>
              <TextInput
                {...register('email', emailRule)}
                autoComplete='email'
                type='email'
                id='email'
                placeholder='Type here your email'
              />              
              {errors?.email && <label htmlFor='email' className='label text-error text-xs'>{errors?.email?.message}</label>}
              
              <label htmlFor='password' className='label mt-2'>Password</label>
              <PasswordInput
                id='password'
                {...register('password', { required: 'Password is required' })}
                placeholder='Type here new password'
                />                
              {errors?.password && <label htmlFor='password' className='label text-error text-xs'>{errors?.password?.message}</label>}
              
              <label htmlFor='confirmPassword' className='label mt-2'>Confirm your password</label>
              <PasswordInput
                id='confirmPassword'
                {...register('confirmPassword', { required: 'Confirm your password', validate: value =>
                value === password.current || "The passwords do not match" })}
                placeholder='Repeat your password'
              />
              {errors?.confirmPassword && (
                <label htmlFor='confirmPassword' className='label text-error text-xs'>{errors?.confirmPassword?.message}</label>
              )}

              {errors?.root?.message && <div className='alert alert-error'>{errors?.root?.message}</div>}
              <button className='btn btn-primary mt-3' type='submit'>
                Create account
              </button>
            </fieldset>
          </form>
          <div className='card-body mb-3'>
            <div className='text-center'>
              Already have an account? Login <Link to='/login' className='link link-primary'>here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
