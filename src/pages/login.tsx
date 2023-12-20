import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthErrorCodes } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PasswordInput } from '../components/PasswordInput'
import { TextInput } from '../components/TextInput'
import { useEffect } from 'react'
import { emailRule } from '../utils/formRules'

type Inputs = {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
    clearErrors,
    setError
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  })
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await login({ email, password })
      navigate(location?.state ? location.state : '/')
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
          return setError('root', { message: 'Error: there is no user with such credentials.' })
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
            <div className='card-title'>Login</div>
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
                {...register('password', { required: { value: true, message: 'Password is required' } })}
                placeholder='Type here your password'
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
