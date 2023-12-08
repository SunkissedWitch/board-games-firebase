import { forwardRef } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        type='text'
        className='input input-bordered w-full'
        ref={ref}
        {...props}
      />
    )
  }
)
