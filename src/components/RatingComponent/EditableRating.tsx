import { useState } from "react"
import { StarRating } from "./StarRating"

export const EditableRaitingComponent = ({ rating = 0 }: { rating: number }) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating)
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    return setSelectedRating(Number(e.currentTarget.value) || 0)
  }

  return (
    <form>
      <div className='rating rating-md rating-half'>
        <input
          type='radio'
          name='rating-10'
          value={0}
          className='rating-hidden'
          checked={selectedRating === 0}
          onChange={onChange}
        />
        {[...Array(5).keys()]
          .map((x) => x + 0.5)
          .concat([...Array(5).keys()].map((x) => ++x))
          .sort()
          .map((starRating) => (
            <StarRating
              key={starRating}
              value={starRating}
              onChange={onChange}
              checked={selectedRating === starRating}
              half={starRating % 1 === 0.5}
            />
          ))}
      </div>
    </form>
  )
}