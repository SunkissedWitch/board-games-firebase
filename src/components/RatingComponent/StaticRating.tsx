import { StarRating } from "./StarRating"

export const StaticRatingComponent = ({ rating }: { rating: number }) => {
  return (
    <>
    <div className='rating rating-md rating-half'>
        <input
          type='radio'
          name='rating-10'
          value={0}
          readOnly
          checked={rating === 0}
          className='rating-hidden'
        />
        {[...Array(5).keys()]
          .map((x) => x + 0.5)
          .concat([...Array(5).keys()].map((x) => ++x))
          .sort()
          .map((starRating) => (
            <StarRating
              key={starRating}
              value={starRating}
              checked={rating === starRating}
              half={starRating % 1 === 0.5}
            />
          ))}
      </div>
    </>
  )
}