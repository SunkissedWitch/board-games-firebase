import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { forwardRef, useState } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [visible, setVisible] = useState<boolean>(false)
    const toggleVisibility = () => setVisible(!visible)

    return (
      <div className='join'>
        <input
          ref={ref}
          {...props}
          className='input input-bordered w-full'
          type={visible ? 'text' : 'password'}
        />
        <button type='button' className='btn btn-primary' onClick={toggleVisibility}>
          { visible
            ? <EyeSlashIcon className='h-5 w-5 text-primary-content' />
            : <EyeIcon className='h-5 w-5 text-primary-content' />
          }
        </button>
      </div>
    )
  }
)
