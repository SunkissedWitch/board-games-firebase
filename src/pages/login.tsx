import { useForm, type SubmitHandler } from 'react-hook-form'
import { AuthErrorCodes } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { Link, useNavigate, useLocation } from 'react-router'
import { PasswordInput } from '../components/PasswordInput'
import { TextInput } from '../components/TextInput'
import { useEffect } from 'react'
import { emailRule } from '../utils/formRules'
import { useAuthStore } from '../contexts/AuthStore'
import { auth } from '../firebase'

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
    reValidateMode: 'onChange'
  })
  const { login, setUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await login({ email, password })
      setUser(auth.currentUser)
      navigate(location?.state?.from ? location.state.from : '/')
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
        <div className='mx-auto card card-sm card-border shadow-md max-w-sm'>
          <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='fieldset text-sm'>
              <legend className='card-title fieldset-legend'>Login</legend>

              <label htmlFor='email' className='label mt-2'>Email</label>
              <TextInput
                id='email'
                {...register("email", emailRule)}
                autoComplete='email'
                type='email'
                placeholder='Type here your email'
              />
              {errors?.email && <label htmlFor='email' className='label text-error text-xs'>{errors?.email?.message}</label>}

              <label htmlFor='password' className='label mt-2'>Password</label>
              <PasswordInput
                id='password'
                {...register("password", { required: { value: true, message: "Password is required" } })}
                placeholder='Type here your password'
              />
              {errors?.password && <label htmlFor='password' className='label text-error text-xs'>{errors?.password?.message}</label>}

              {errors?.root?.message && <div className='alert alert-error'>{errors?.root?.message}</div>}

              <button className='btn btn-primary mt-3' type='submit'>
                Confirm
              </button>
            </fieldset>
          </form>
          <div className='card-body mb-3'>
            <div className='text-center'>
              Have no account? Create it{" "}
              <Link to='/signup' className='link link-primary' state={{ from: location?.state?.from || "/" }}>
                here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
