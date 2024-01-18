import { ReactEventHandler } from 'react'

type StarRatingProps = {
  value: number
  checked: boolean
  half: boolean
  onChange?: ReactEventHandler
}

export const StarRating = ({
  value,
  checked,
  onChange,
  half,
}: StarRatingProps) => {
  return (
    <input
      name='rating-10'
      className={`bg-warning mask mask-star-2 ${
        half ? 'mask-half-1' : 'mask-half-2'
      }`}
      type='radio'
      value={value}
      checked={checked}
      readOnly={onChange === undefined}
      {...onChange}
    />
  )
}
